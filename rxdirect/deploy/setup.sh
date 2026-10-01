#!/usr/bin/env bash
# One-command install / update of rxdirect.pk on an Ubuntu VPS. Run as root:
#
#   curl -fsSL https://raw.githubusercontent.com/pinetravelpk-bit/pinetravels/main/rxdirect/deploy/setup.sh -o setup.sh && bash setup.sh
#
# Safe to re-run: it pulls the latest code, rebuilds and swaps the new site in.
# Override any setting below with an env var, e.g.  BRANCH=dev bash setup.sh
#
# How it runs:
#   - The site is a static export (Next.js `out/`), served by nginx from $WEB_ROOT.
#   - server/api.mjs (systemd service "rxdirect-api") handles the contact form,
#     blog comments and /admin at the same /.netlify/functions/* URLs the
#     site used on Netlify.
set -euo pipefail

DOMAIN="${DOMAIN:-rxdirect.pk}"
REPO="${REPO:-https://github.com/pinetravelpk-bit/pinetravels.git}"
BRANCH="${BRANCH:-main}"
EMAIL="${EMAIL:-}"            # for Let's Encrypt expiry notices (optional)
API_PORT="${API_PORT:-3101}"
APP_USER=rxdirect
HOME_DIR=/var/lib/rxdirect
DATA_DIR="$HOME_DIR/data"
SRC_DIR=/opt/rxdirect-src
APP_DIR="$SRC_DIR/rxdirect"
WEB_ROOT=/var/www/rxdirect
ENV_FILE=/etc/rxdirect.env

say() { printf '\n\033[1;32m==> %s\033[0m\n' "$*"; }
[ "$(id -u)" -eq 0 ] || { echo "Run this script as root."; exit 1; }
export DEBIAN_FRONTEND=noninteractive

say "Installing system packages"
apt-get update -y
apt-get install -y ca-certificates curl git openssl rsync nginx certbot python3-certbot-nginx ufw

node_major() { local v; v="$(node -v 2>/dev/null || true)"; v="${v#v}"; echo "${v%%.*}" | grep -E '^[0-9]+$' || echo 0; }
if [ "$(node_major)" -lt 20 ]; then
  say "Installing Node.js 22"
  if ! (curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs); then
    apt-get install -y nodejs npm
  fi
fi
[ "$(node_major)" -ge 20 ] || { echo "Node.js 20+ is required, got $(node -v 2>/dev/null || echo none)."; exit 1; }
echo "Node $(node -v), npm $(npm -v)"

# Building ~2,100 pages needs memory; small VPS plans get a swap file.
if [ "$(free -m | awk '/^Mem:/{print $2}')" -lt 3500 ] && ! swapon --show | grep -q .; then
  say "Adding 2 GB swap for the build"
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

say "Creating app user and folders"
id "$APP_USER" >/dev/null 2>&1 || useradd --system --home-dir "$HOME_DIR" --create-home --shell /usr/sbin/nologin "$APP_USER"
install -d -o "$APP_USER" -g "$APP_USER" -m 750 "$HOME_DIR" "$DATA_DIR"
install -d -o "$APP_USER" -g "$APP_USER" "$SRC_DIR"
install -d -m 755 "$WEB_ROOT"

if [ ! -f "$ENV_FILE" ]; then
  ADMIN_PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-16)"
  cat > "$ENV_FILE" <<ENV
ADMIN_PASSWORD=$ADMIN_PASSWORD
DATA_DIR=$DATA_DIR
PORT=$API_PORT
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

say "Preparing the web folder"
if [ ! -f "$WEB_ROOT/index.html" ]; then
  cat > "$WEB_ROOT/index.html" <<'HTML'
<!doctype html><meta charset="utf-8"><title>RX Direct</title><p style="font-family:sans-serif;text-align:center;margin-top:20vh">RX Direct website is being updated. Please check back in a few minutes.</p>
HTML
fi

say "Setting up the API service (contact form, comments, admin)"
cat > /etc/systemd/system/rxdirect-api.service <<UNIT
[Unit]
Description=RX Direct API ($DOMAIN)
After=network.target

[Service]
User=$APP_USER
WorkingDirectory=$APP_DIR
EnvironmentFile=$ENV_FILE
Environment=HOST=127.0.0.1
ExecStart=$(command -v node) $APP_DIR/server/api.mjs
Restart=always
RestartSec=3
NoNewPrivileges=true
ProtectSystem=full
PrivateTmp=true

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable rxdirect-api >/dev/null
systemctl restart rxdirect-api

say "Configuring nginx"
if [ -s /proc/net/if_inet6 ]; then V6=""; else V6="# "; fi
# Shared rules for both the domain and the bare-IP server blocks.
cat > /etc/nginx/snippets/rxdirect.conf <<NGINX
root $WEB_ROOT;
index index.html;
client_max_body_size 1m;

# Old Netlify function URLs, now served by server/api.mjs.
location ^~ /.netlify/functions/ {
    proxy_pass http://127.0.0.1:$API_PORT;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
}

# Jobs, staff verification (document uploads), team and the admin panel API.
location ^~ /api/ {
    client_max_body_size 32m;
    proxy_pass http://127.0.0.1:$API_PORT;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_read_timeout 120s;
}

# Next.js build assets never change name, so cache them for a year.
location ^~ /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ^~ /admin/ {
    add_header X-Robots-Tag "noindex" always;
    try_files \$uri \$uri.html \${uri}index.html =404;
}

# Same URL rules Netlify used: /about serves about.html, and /about/ redirects
# to /about. Directory pages such as /admin/ fall through to index.html.
location ~ ^(?<rx_path>/.+)/\$ {
    if (-f \$document_root\$rx_path.html) {
        return 301 \$rx_path\$is_args\$args;
    }
    try_files \${uri}index.html =404;
}

location / {
    try_files \$uri \$uri.html \$uri/index.html =404;
}

error_page 404 /404.html;
gzip on;
gzip_types text/plain text/css application/javascript application/json image/svg+xml application/xml;
NGINX

# certbot adds its own SSL settings to this file, so only write it the first time.
if [ ! -f /etc/nginx/sites-available/rxdirect ]; then
  cat > /etc/nginx/sites-available/rxdirect <<NGINX
server {
    listen 80;
    ${V6}listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    include snippets/rxdirect.conf;
}

# Visiting the bare IP address also shows the site (handy before DNS is set up).
server {
    listen 80 default_server;
    ${V6}listen [::]:80 default_server;
    server_name _;
    include snippets/rxdirect.conf;
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

say "HTTPS certificate"
SERVER_IP="$(curl -fs4 --max-time 10 https://api.ipify.org || hostname -I | awk '{print $1}')"
resolve() { getent ahostsv4 "$1" | awk 'NR==1{print $1}'; }
DNS_IP="$(resolve "$DOMAIN" || true)"
if [ -n "$DNS_IP" ] && [ "$DNS_IP" = "$SERVER_IP" ]; then
  DOMAINS=(-d "$DOMAIN")
  [ "$(resolve "www.$DOMAIN" || true)" = "$SERVER_IP" ] && DOMAINS+=(-d "www.$DOMAIN")
  if [ -n "$EMAIL" ]; then MAIL=(-m "$EMAIL"); else MAIL=(--register-unsafely-without-email); fi
  if certbot --nginx --non-interactive --agree-tos --redirect --keep-until-expiring "${MAIL[@]}" "${DOMAINS[@]}"; then
    URL="https://$DOMAIN"
  else
    echo "!! HTTPS certificate failed (see the certbot message above). The site still works on http://."
    echo "   Check that ports 80 and 443 are open in Hostinger hPanel > VPS > Security > Firewall, then run this script again."
    URL="http://$DOMAIN"
  fi
else
  echo "Skipped: $DOMAIN points to '${DNS_IP:-nothing}', but this server is $SERVER_IP."
  echo "Add DNS A records for $DOMAIN and www.$DOMAIN -> $SERVER_IP, wait for them to update, then run this script again."
  URL="http://$SERVER_IP"
fi

say "Building the site (about 2,100 pages — this can take 10-20 minutes)"
as_app "cd '$APP_DIR' && npm ci --no-audit --no-fund && NODE_OPTIONS=--max-old-space-size=3072 npm run build"
[ -f "$APP_DIR/out/index.html" ] || { echo "Build did not produce out/index.html"; exit 1; }

say "Publishing the new build"
# --delay-updates swaps files in at the end, so visitors never see a half-copied site.
rsync -a --delete --delay-updates "$APP_DIR/out/" "$WEB_ROOT/"

say "Checking the site responds"
code() { curl -s -o /dev/null -w '%{http_code}' -H "Host: $DOMAIN" "http://127.0.0.1$1"; }
for p in / /about /services/cooks /blog; do echo "  $p -> $(code "$p")"; done
for _ in $(seq 1 10); do curl -fs -o /dev/null "http://127.0.0.1:$API_PORT/.netlify/functions/list-comments?pageId=x" && break; sleep 1; done
echo "  API -> $(code '/.netlify/functions/list-comments?pageId=x')"

say "Done"
echo "Website:  $URL"
echo "Admin:    $URL/admin/   (staff verification, jobs, applications, team, leads, comments)"
if [ "${NEW_PASSWORD:-}" = 1 ]; then
  echo "Password: $ADMIN_PASSWORD   <-- save this now"
else
  echo "Password: unchanged (see $ENV_FILE)"
fi
