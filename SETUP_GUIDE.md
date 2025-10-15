# 🚀 Quick Setup Guide - RTSP Livestream App

**Get your application running in 5 minutes!**

---

## ⚡ Fast Track Setup

### Step 1: Install Prerequisites (One-time)

#### Install MongoDB
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb-org

# Windows
# Download installer from: https://www.mongodb.com/try/download/community
```

#### Install FFmpeg
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# Windows
# Download from: https://ffmpeg.org/download.html
# Add to system PATH
```

#### Verify Installations
```bash
node --version   # Should show v18+
python --version # Should show v3.8+
mongod --version # Should show MongoDB
ffmpeg -version  # Should show FFmpeg
```

---

### Step 2: Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Ubuntu/Debian
sudo systemctl start mongod
sudo systemctl enable mongod

# Windows
# Start "MongoDB Server" from Services
# OR run: "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"

# Verify MongoDB is running
mongosh
# Should connect successfully
```

---

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat
# macOS/Linux:
source venv/bin/activate

# Install Python packages
pip install -r requirements.txt

# Create .env file (optional - uses defaults if not present)
# Copy env.example to .env if you need custom settings
# Default MongoDB: mongodb://localhost:27017/

# Start Flask server
python app.py
```

**Expected Output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://0.0.0.0:5000
```

✅ **Backend is ready at: http://localhost:5000**

---

### Step 4: Frontend Setup

**Open a NEW terminal window**

```bash
# Navigate to frontend directory
cd frontend

# Install Node packages
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

✅ **Frontend is ready at: http://localhost:3000**

---

### Step 5: Test the Application

1. **Open Browser**: Go to http://localhost:3000

2. **Test RTSP Streaming**:
   - Enter URL: `rtsp://rtsp.stream/pattern`
   - Click "▶️ Start Stream"
   - Wait 5-10 seconds for initialization
   - Video should start playing

3. **Create Test Overlay**:
   - Name: `test_overlay`
   - Text: `LIVE`
   - X: `50`
   - Y: `50`
   - Font Size: `32`
   - Color: Red (`#FF0000`)
   - Click "💾 Save Overlay"

4. **Verify Overlay**:
   - Check overlay appears in the list
   - Toggle ON/OFF
   - Edit and delete as needed

---

## 🎯 Test RTSP URLs

Use these free RTSP streams for testing:

```
rtsp://rtsp.stream/pattern
rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4
```

---

## 🔍 Verify Everything is Working

### 1. Check Backend
```bash
curl http://localhost:5000/api/health
```
**Expected**: `{"status":"healthy","database":"connected"}`

### 2. Check MongoDB
```bash
mongosh
use livestream_db
db.overlays.find()
```
**Expected**: List of overlays you created

### 3. Check Frontend
- Visit: http://localhost:3000
- Should see beautiful gradient UI
- No console errors

---

## ❌ Common Issues & Fixes

### Issue 1: "Module not found" (Python)
```bash
# Make sure virtual environment is activated
# You should see (venv) in terminal prompt

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue 2: "Cannot find module" (Node)
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue 3: MongoDB Connection Failed
```bash
# Check if MongoDB is running
ps aux | grep mongod  # macOS/Linux
tasklist | findstr mongod  # Windows

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

### Issue 4: Port 5000 Already in Use
```bash
# Find what's using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change Flask port in app.py:
# app.run(debug=True, host="0.0.0.0", port=5001)
```

### Issue 5: FFmpeg Not Working
```bash
# Verify FFmpeg is installed
ffmpeg -version

# If not found, install:
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg
# Windows: Download and add to PATH
```

---

## 🎨 Customization

### Change Backend Port

Edit `backend/app.py`:
```python
app.run(debug=True, host="0.0.0.0", port=5001)
```

And update `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',
    ...
  }
}
```

### Change Frontend Port

Edit `frontend/vite.config.js`:
```javascript
server: {
  port: 3001,
  ...
}
```

### Change MongoDB Database

Edit `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/your_custom_db_name
```

---

## 📊 Development Workflow

### Recommended Workflow

1. **Start MongoDB** (keep running)
2. **Terminal 1**: Run backend (`python app.py`)
3. **Terminal 2**: Run frontend (`npm run dev`)
4. **Browser**: Access http://localhost:3000
5. **Make Changes**: Edit code - hot reload enabled!

### Hot Reload

- **Frontend**: Vite auto-reloads on file changes
- **Backend**: Flask debug mode auto-reloads on file changes

---

## 🧹 Cleanup

### Stop Services

```bash
# Stop Flask: Press Ctrl+C in backend terminal
# Stop Vite: Press Ctrl+C in frontend terminal

# Stop MongoDB (optional)
brew services stop mongodb-community  # macOS
sudo systemctl stop mongod           # Linux
```

### Clean Build Files

```bash
# Backend
rm -rf backend/venv
rm -rf backend/static/*
rm -rf backend/__pycache__

# Frontend
rm -rf frontend/node_modules
rm -rf frontend/dist
```

---

## 🎓 Next Steps

1. ✅ Complete this setup
2. 📝 Test all features
3. 🎨 Customize the UI if desired
4. 📤 Push to GitHub
5. 📧 Submit repository link to: safiyarukan3@gmail.com

---

## 💬 Need Help?

- Check [README.md](README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
- Check [Troubleshooting](#common-issues--fixes) above

---

**Happy Coding! 🚀**





