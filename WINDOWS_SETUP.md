# 🪟 Windows Setup Guide - RTSP Livestream App

**Quick setup for Windows users**

---

## 📋 Prerequisites Check

Let's verify what you have installed:

```powershell
# Check Python
python --version
# Should show: Python 3.8+

# Check Node.js
node --version
# Should show: v18+

# Check FFmpeg
ffmpeg -version
# Should show: FFmpeg version info
```

---

## 🚀 Quick Start (Without MongoDB Initially)

### Step 1: Install Python Dependencies

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

If you get an execution policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 2: Start Backend (Simplified Mode)

```powershell
# Still in backend folder with venv activated
python app.py
```

**Expected**: Server starts at http://localhost:5000

### Step 3: Install Frontend Dependencies

**Open a NEW PowerShell window:**

```powershell
cd C:\Users\91866\Desktop\Livesitter\frontend
npm install
```

### Step 4: Start Frontend

```powershell
npm run dev
```

**Expected**: App opens at http://localhost:3000

---

## 🔧 MongoDB Setup (When Ready)

### Option A: MongoDB Community Edition

1. **Download**: https://www.mongodb.com/try/download/community
   - Select: Windows
   - Version: Latest
   - Package: MSI

2. **Install**:
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass" (optional GUI)

3. **Start MongoDB**:
   ```powershell
   # Method 1: Via Services
   services.msc
   # Find "MongoDB Server" → Right-click → Start
   
   # Method 2: Via Command
   net start MongoDB
   ```

4. **Verify**:
   ```powershell
   mongosh
   # Should connect successfully
   ```

### Option B: MongoDB Atlas (Cloud - Easier!)

If MongoDB installation is tricky, use the **FREE cloud version**:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a FREE cluster (M0)
4. Get connection string
5. Update `backend\.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

---

## ⚡ Install FFmpeg on Windows

### Method 1: Chocolatey (Easiest)

```powershell
# Install Chocolatey first (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install FFmpeg
choco install ffmpeg
```

### Method 2: Manual Download

1. Download from: https://www.gyan.dev/ffmpeg/builds/
2. Extract to `C:\ffmpeg`
3. Add to PATH:
   ```powershell
   # Add to System Environment Variables:
   # C:\ffmpeg\bin
   ```

### Verify FFmpeg

```powershell
ffmpeg -version
```

---

## 🎯 Complete Windows Workflow

### Terminal 1: Backend
```powershell
cd C:\Users\91866\Desktop\Livesitter\backend
.\venv\Scripts\Activate.ps1
python app.py
```

### Terminal 2: Frontend
```powershell
cd C:\Users\91866\Desktop\Livesitter\frontend
npm run dev
```

### Browser
- Open: http://localhost:3000
- Test with: `rtsp://rtsp.stream/pattern`

---

## ❌ Common Windows Issues

### Issue 1: Python venv won't activate

**Error**: "cannot be loaded because running scripts is disabled"

**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue 2: MongoDB won't start

**Solutions**:
1. Check if installed: `mongod --version`
2. Try: `"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --version`
3. Use MongoDB Atlas (cloud) instead

### Issue 3: Port 5000 already in use

**Solution**:
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Issue 4: npm install fails

**Solution**:
```powershell
# Clear cache
npm cache clean --force

# Try again
npm install
```

---

## 🧪 Testing on Windows

### Test Backend
```powershell
# Open browser or use curl (if installed)
Start-Process "http://localhost:5000/api/health"
```

### Test MongoDB Connection
```powershell
mongosh
use livestream_db
db.overlays.find()
```

---

## 📝 Quick Checklist

- [ ] Python installed and in PATH
- [ ] Node.js installed and in PATH
- [ ] MongoDB installed/running OR using Atlas
- [ ] FFmpeg installed and in PATH
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] Can access http://localhost:3000

---

## 🆘 Still Having Issues?

### Check Installations
```powershell
python --version
node --version
mongod --version
ffmpeg -version
```

### Check Services
```powershell
# Open services
services.msc
# Look for: MongoDB Server
```

### Use MongoDB Atlas
If local MongoDB is problematic, use the cloud version (free):
- Sign up: https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `.env` file

---

**Ready to submit?** See [SUBMISSION.md](SUBMISSION.md)



