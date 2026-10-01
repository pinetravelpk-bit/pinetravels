#!/usr/bin/env bash
# One-command install of rxdirect.pk on a fresh Ubuntu VPS. Run as root:
#
#   curl -fsSL https://raw.githubusercontent.com/pinetravelpk-bit/pinetravels/main/rxdirect/deploy/setup.sh -o setup.sh && bash setup.sh
#
# Safe to re-run: it pulls the latest code, rebuilds and restarts.
# Override any setting below with an env var, e.g.  BRANCH=dev bash setup.sh
set -euo pipefail

DOMAIN="${DOMAIN:-rxdirect.pk}"
REPO="${REPO:-https://github.com/pinetravelpk-bit/pinetravels.git}"
BRANCH="${BRANCH:-main}"
EMAIL="${EMAIL:-}"            # for Let's Encrypt expiry notices (optional)
PORT="${PORT:-3100}"
APP_USER=rxdirect
HOME_DIR=/var/lib/rxdirect
SRC_DIR=/opt/rxdirect-src
APP_DIR="$SRC_DIR/rxdirect"
ENV_FILE=/etc/rxdirect.env

say() { printf '\n\033[1;32m==> %s\033[0m\n' "$*"; }
[ "$(id -u)" -eq 0 ] || { echo "Run this script as root."; exit 1; }
export DEBIAN_FRONTEND=noninteractive

say "Installing system packages"
apt-get update -y
apt-get install -y ca-certificates curl git openssl nginx certbot python3-certbot-nginx ufw

node_major() { local v; v="$(node -v 2>/dev/null || true)"; v="${v#v}"; echo "${v%%.*}" | grep -E '^[0-9]+$' || echo 0; }
if [ "$(node_major)" -lt 20 ]; then
  say "Installing Node.js 22"
  if ! (curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs); then
    apt-get install -y nodejs npm
  fi
fi
[ "$(node_major)" -ge 20 ] || { echo "Node.js 20+ is required, got $(node -v 2>/dev/null || echo none)."; exit 1; }
echo "Node $(node -v), npm $(npm -v)"

say "Creating app user and folders"
id "$APP_USER" >/dev/null 2>&1 || useradd --system --home-dir "$HOME_DIR" --create-home --shell /usr/sbin/nologin "$APP_USER"
install -d -o "$APP_USER" -g "$APP_USER" -m 750 "$HOME_DIR" "$HOME_DIR/data"
install -d -o "$APP_USER" -g "$APP_USER" "$SRC_DIR"

if [ ! -f "$ENV_FILE" ]; then
  ADMIN_PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-20)"
  cat > "$ENV_FILE" <<ENV
NODE_ENV=production
ADMIN_PASSWORD=$ADMIN_PASSWORD
DATA_DIR=$HOME_DIR/data
ENV
  chmod 600 "$ENV_FILE"
  NEW_PASSWORD=1
fi

say "Fetching code ($BRANCH)"
as_app() { runuser -u "$APP_USER" -- env HOME="$HOME_DIR" bash -c "$1"; }
if [ -d "$SRC_DIR/.git" ]; then
  as_app "cd '$SRC_DIR' && git fetch --depth 1 origin '$BRANCH' && git checkout -f -B '$BRANCH' FETCH_HEAD"
else
  as_app "git clone --depth 1 --branch '$BRANCH' '$REPO' '$SRC_DIR'"
fi

say "Building the site (takes a minute or two)"
as_app "cd '$APP_DIR' && npm ci --no-audit --no-fund && npm run build"

say "Setting up the rxdirect service"
cat > /etc/systemd/system/rxdirect.service <<UNIT
[Unit]
Description=RxDirect website ($DOMAIN)
After=network.target

[Service]
User=$APP_USER
WorkingDirectory=$APP_DIR
EnvironmentFile=$ENV_FILE
ExecStart=$APP_DIR/node_modules/.bin/next start -H 127.0.0.1 -p $PORT
Restart=always
RestartSec=3
NoNewPrivileges=true
ProtectSystem=full
PrivateTmp=true

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable rxdirect >/dev/null
systemctl restart rxdirect

say "Configuring nginx"
# certbot adds its own SSL settings to this file, so only write it the first time.
if [ ! -f /etc/nginx/sites-available/rxdirect ]; then
  # Skip IPv6 listeners on servers without IPv6, or nginx refuses to start.
  if [ -s /proc/net/if_inet6 ]; then V6=""; else V6="# "; fi
  cat > /etc/nginx/sites-available/rxdirect <<NGINX
server {
    listen 80;
    ${V6}listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Visiting the bare IP address also shows the site (handy before DNS is set up).
server {
    listen 80 default_server;
    ${V6}listen [::]:80 default_server;
    server_name _;

    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
NGINX
fi
ln -sf /etc/nginx/sites-available/rxdirect /etc/nginx/sites-enabled/rxdirect
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx >/dev/null
systemctl reload nginx || systemctl restart nginx

say "Firewall"
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null

say "Checking the site responds"
for _ in $(seq 1 30); do curl -fs -o /dev/null "http://127.0.0.1:$PORT" && break; sleep 1; done
curl -fs -o /dev/null "http://127.0.0.1:$PORT" && echo "App is up." || { echo "App did not start. See: journalctl -u rxdirect -n 50"; exit 1; }

say "HTTPS certificate"
SERVER_IP="$(curl -fs4 --max-time 10 https://api.ipify.org || hostname -I | awk '{print $1}')"
resolve() { getent ahostsv4 "$1" | awk 'NR==1{print $1}'; }
DNS_IP="$(resolve "$DOMAIN" || true)"
if [ -n "$DNS_IP" ] && [ "$DNS_IP" = "$SERVER_IP" ]; then
  DOMAINS=(-d "$DOMAIN")
  [ "$(resolve "www.$DOMAIN" || true)" = "$SERVER_IP" ] && DOMAINS+=(-d "www.$DOMAIN")
  if [ -n "$EMAIL" ]; then MAIL=(-m "$EMAIL"); else MAIL=(--register-unsafely-without-email); fi
  certbot --nginx --non-interactive --agree-tos --redirect --keep-until-expiring "${MAIL[@]}" "${DOMAINS[@]}"
  URL="https://$DOMAIN"
else
  echo "Skipped: $DOMAIN points to '${DNS_IP:-nothing}', but this server is $SERVER_IP."
  echo "Add DNS A records for $DOMAIN and www.$DOMAIN -> $SERVER_IP, wait for them to update, then run this script again."
  URL="http://$SERVER_IP"
fi

say "Done"
echo "Website:  $URL"
echo "Admin:    $URL/admin   (username: admin)"
if [ "${NEW_PASSWORD:-}" = 1 ]; then
  echo "Password: $ADMIN_PASSWORD   <-- save this now"
else
  echo "Password: unchanged (see $ENV_FILE)"
fi
