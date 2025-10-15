# 🚀 Deployment Guide

Guide for deploying the RTSP Livestream App to production.

---

## 🌐 Deployment Options

### Option 1: Traditional VPS (DigitalOcean, AWS EC2, etc.)

#### Server Requirements
- Ubuntu 20.04+ or similar Linux distribution
- 2GB+ RAM
- 2+ CPU cores
- 20GB+ storage

#### Setup Steps

**1. Install Prerequisites**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install python3 python3-pip python3-venv -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install FFmpeg
sudo apt install ffmpeg -y

# Install Nginx
sudo apt install nginx -y
```

**2. Deploy Backend**
```bash
# Clone repository
git clone https://github.com/yourusername/livestream-app.git
cd livestream-app/backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn

# Create production .env
nano .env
```

`.env` file:
```env
MONGO_URI=mongodb://localhost:27017/
FLASK_ENV=production
FLASK_DEBUG=False
```

**3. Setup Systemd Service**

Create `/etc/systemd/system/livestream-api.service`:

```ini
[Unit]
Description=Livestream API Server
After=network.target mongodb.service

[Service]
User=www-data
WorkingDirectory=/path/to/livestream-app/backend
Environment="PATH=/path/to/livestream-app/backend/venv/bin"
ExecStart=/path/to/livestream-app/backend/venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable livestream-api
sudo systemctl start livestream-api
sudo systemctl status livestream-api
```

**4. Build Frontend**
```bash
cd ../frontend
npm install
npm run build
```

**5. Configure Nginx**

Create `/etc/nginx/sites-available/livestream-app`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/livestream-app/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static files (HLS segments)
    location /static {
        proxy_pass http://localhost:5000;
        add_header Cache-Control no-cache;
        add_header Access-Control-Allow-Origin *;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/livestream-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**6. SSL with Let's Encrypt (Optional but Recommended)**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 2: Docker Deployment

**Coming Soon**: Docker Compose configuration for easy containerized deployment.

---

### Option 3: Cloud Platform (Heroku, Railway, etc.)

#### Heroku Deployment

**Backend**:
```bash
# Add Procfile
echo "web: gunicorn app:app" > backend/Procfile

# Deploy
heroku create livestream-api
heroku addons:create mongolab
git subtree push --prefix backend heroku master
```

**Frontend**:
```bash
# Build
npm run build

# Deploy to Netlify/Vercel
# Update API URLs in production
```

---

## 🔒 Production Checklist

### Security
- [ ] Disable debug mode
- [ ] Add authentication
- [ ] Restrict CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Sanitize user inputs

### Performance
- [ ] Use production WSGI server (Gunicorn)
- [ ] Enable gzip compression
- [ ] Add caching headers
- [ ] Optimize database queries
- [ ] Use CDN for static files
- [ ] Enable HTTP/2

### Monitoring
- [ ] Setup error logging
- [ ] Add health check monitoring
- [ ] Setup alerts for downtime
- [ ] Monitor resource usage
- [ ] Track API metrics

### Database
- [ ] Setup MongoDB replica set
- [ ] Enable authentication
- [ ] Configure backups
- [ ] Add indexes for performance

---

## 📊 Monitoring

### Application Logs

```bash
# Backend logs
sudo journalctl -u livestream-api -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Health Checks

Setup monitoring service to ping:
```
https://your-domain.com/api/health
```

Expected response:
```json
{"status":"healthy","database":"connected"}
```

---

## 🔄 Updates & Maintenance

### Update Application

```bash
# Pull latest changes
git pull origin main

# Update backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart livestream-api

# Update frontend
cd ../frontend
npm install
npm run build
sudo systemctl reload nginx
```

### Database Backup

```bash
# Backup MongoDB
mongodump --db livestream_db --out /backup/$(date +%Y%m%d)

# Restore MongoDB
mongorestore --db livestream_db /backup/20240115/livestream_db
```

---

## 🆘 Production Troubleshooting

### Check Service Status
```bash
sudo systemctl status livestream-api
sudo systemctl status nginx
sudo systemctl status mongod
```

### View Logs
```bash
sudo journalctl -u livestream-api -n 100 --no-pager
```

### Restart Services
```bash
sudo systemctl restart livestream-api
sudo systemctl restart nginx
```

---

**For development deployment, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**





