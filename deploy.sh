#!/usr/bin/env bash
# InventiveClicks — one-command VPS deploy for Ubuntu.
# Usage (as root):
#   curl -fsSL https://raw.githubusercontent.com/pinetravelpk-bit/pinetravels/refs/heads/claude/modest-dirac-bho65g/deploy.sh | bash
set -e

DOMAIN="inventiveclicks.com"
BRANCH="claude/modest-dirac-bho65g"

echo ">> [1/5] Installing Node.js 20, git, nginx..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git nginx

echo ">> [2/5] Fetching the code..."
mkdir -p /var/www && cd /var/www
if [ -d pinetravels/.git ]; then
  cd pinetravels && git fetch origin && git checkout "$BRANCH" && git pull
else
  git clone https://github.com/pinetravelpk-bit/pinetravels.git
  cd pinetravels && git checkout "$BRANCH"
fi

echo ">> [3/5] Building the site (2-4 minutes)..."
npm install
npm run build

echo ">> [4/5] Starting app with PM2..."
npm install -g pm2
pm2 delete inventiveclicks 2>/dev/null || true
pm2 start npm --name inventiveclicks -- start
pm2 save
pm2 startup systemd -u root --hp /root | tail -n1 | bash || true

echo ">> [5/5] Configuring Nginx..."
cat > /etc/nginx/sites-available/inventiveclicks <<'NGINX'
server {
    listen 80;
    server_name inventiveclicks.com www.inventiveclicks.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/inventiveclicks /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==================================================="
echo " DONE!  Test now:  http://$DOMAIN"
echo " (HTTPS/SSL is the next, separate step)"
echo "==================================================="
