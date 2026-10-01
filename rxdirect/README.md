# RxDirect — rxdirect.pk

Website for **RxDirect**, a healthcare & pharmacy staffing agency. Built with Next.js 14,
Tailwind CSS and lucide-react. It is fully separate from the Pine Travel site in the repo root.

## Pages

| Route        | What it is                                                         |
|--------------|--------------------------------------------------------------------|
| `/`          | Home: hero, services, how it works, why us, latest jobs, testimonials |
| `/services`  | Staffing services and hiring models                                |
| `/jobs`      | Open positions, each with an **Apply now** button                  |
| `/apply`     | Candidate application with CV upload (PDF/DOC/DOCX, 5 MB max)     |
| `/employers` | Staff request form for hospitals, pharmacies and clinics           |
| `/about`     | Company story and values                                           |
| `/contact`   | Contact details and message form                                   |
| `/admin`     | All form submissions, with CV downloads (password protected)      |

## Editing content

**Everything is in `lib/site.js`**: phone, WhatsApp, email, address, services, jobs,
testimonials, stats. Change it, push, and run the update command below.

> The phone number and WhatsApp in `lib/site.js` are placeholders (`+92 300 0000000`).
> Replace them before you share the site.

## Put it on the VPS (Hostinger, Ubuntu)

### 1. Point the domain at the server

At your domain registrar (PKNIC or whoever sells you `rxdirect.pk`), add two DNS records:

| Type | Name  | Value           |
|------|-------|-----------------|
| A    | `@`   | `72.62.193.221` |
| A    | `www` | `72.62.193.221` |

DNS can take from a few minutes up to a few hours to update.

### 2. Run the setup script

Open the VPS terminal (Hostinger hPanel → VPS → **Web console**, or `ssh root@72.62.193.221`)
and paste:

```bash
curl -fsSL https://raw.githubusercontent.com/pinetravelpk-bit/pinetravels/main/rxdirect/deploy/setup.sh -o setup.sh && bash setup.sh
```

It installs Node.js, nginx, the firewall and a free HTTPS certificate, builds the site and
starts it as a service that restarts automatically. At the end it prints:

- the website address
- the admin address and **admin password** — copy it somewhere safe; it's only shown once.

If DNS hasn't updated yet, the site still works at `http://72.62.193.221`. Run the same
command again once the domain points at the server, and it will add HTTPS.

### 3. Updating the site later

Push your changes to GitHub, then on the VPS run:

```bash
bash setup.sh
```

The script is safe to re-run: it pulls the latest code, rebuilds and restarts. Submissions
and CVs are kept.

### Useful commands on the VPS

```bash
systemctl status rxdirect           # is the site running?
journalctl -u rxdirect -n 100       # recent logs
cat /etc/rxdirect.env               # admin password
ls /var/lib/rxdirect/data           # submissions.jsonl + uploaded CVs
```

To change the admin password: edit `ADMIN_PASSWORD` in `/etc/rxdirect.env`, then
`systemctl restart rxdirect`.

**Back up** `/var/lib/rxdirect/data` regularly — it holds every application and CV.

## Running locally

```bash
cd rxdirect
npm install
ADMIN_PASSWORD=test npm run dev     # http://localhost:3100, admin login: admin / test
```
