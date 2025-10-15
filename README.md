# 🎥 RTSP Livestream App with Overlay Controls

A full-stack web application for streaming RTSP video feeds with real-time dynamic text overlays. Built for **Livesitter** as part of the AI Full Stack Developer assignment.

[![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Flask%20%2B%20MongoDB-blue)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [User Guide](#user-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality
- ✅ **RTSP to HLS Conversion**: Stream RTSP feeds in web browsers
- ✅ **Real-time Overlays**: Add dynamic text overlays on video streams
- ✅ **Full CRUD Operations**: Create, Read, Update, Delete overlays
- ✅ **Live Controls**: Enable/disable overlays in real-time
- ✅ **Customizable Overlays**: Control position, size, color, and content

### Technical Features
- 🔄 RESTful API architecture
- 📊 MongoDB for persistent storage
- 🎨 Modern, responsive UI with TailwindCSS
- ⚡ Real-time video streaming with HLS
- 🛡️ Error handling and validation
- 📱 Mobile-responsive design

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Player** - Video playback component
- **Axios** - HTTP client

### Backend
- **Flask** - Python web framework
- **MongoDB** - NoSQL database
- **PyMongo** - MongoDB driver for Python
- **Flask-CORS** - Cross-Origin Resource Sharing

### Streaming
- **FFmpeg** - RTSP to HLS conversion
- **HLS (HTTP Live Streaming)** - Browser-compatible streaming protocol

---

## 📁 Project Structure

```
livestream-app/
│
├── backend/                    # Flask backend
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── env.example            # Environment variables template
│   │
│   ├── models/                # Data models
│   │   └── overlay_model.py   # Overlay schema and validation
│   │
│   ├── utils/                 # Utility functions
│   │   └── stream_converter.py # RTSP to HLS conversion
│   │
│   └── static/                # HLS output directory (auto-created)
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── main.jsx          # Application entry point
│   │   ├── index.css         # Global styles
│   │   │
│   │   ├── components/       # React components
│   │   │   ├── Player.jsx           # Video player with controls
│   │   │   ├── OverlayEditor.jsx    # Create overlays
│   │   │   └── OverlayList.jsx      # Manage overlays
│   │   │
│   │   └── api/              # API integration
│   │       └── overlayApi.js        # API client functions
│   │
│   ├── index.html            # HTML template
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # TailwindCSS configuration
│   └── postcss.config.js     # PostCSS configuration
│
├── API_DOCUMENTATION.md       # Detailed API documentation
└── README.md                  # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18+ recommended) - [Download](https://nodejs.org/)
- **Python** (v3.8+ recommended) - [Download](https://www.python.org/)
- **MongoDB** (v5.0+ recommended) - [Download](https://www.mongodb.com/try/download/community)
- **FFmpeg** - Required for RTSP streaming

### Installing FFmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
1. Download from [ffmpeg.org](https://ffmpeg.org/download.html)
2. Extract and add to system PATH

**Verify Installation:**
```bash
ffmpeg -version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/livestream-app.git
cd livestream-app
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp env.example .env

# Edit .env with your MongoDB URI if needed
# Default: mongodb://localhost:27017/
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. Database Setup

Ensure MongoDB is running:

```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB service
# macOS:
brew services start mongodb-community

# Ubuntu/Debian:
sudo systemctl start mongod

# Windows:
# Start MongoDB from Services or:
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
```

---

## 🎯 Usage

### Starting the Application

#### Terminal 1 - Backend Server

```bash
cd backend
python app.py
```

The Flask server will start at: **http://localhost:5000**

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

#### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm run dev
```

The React app will start at: **http://localhost:3000**

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Accessing the Application

Open your browser and navigate to: **http://localhost:3000**

---

## 📖 User Guide

### Getting Started

1. **Enter RTSP URL**
   - Paste your RTSP stream URL in the input field
   - Example test URLs:
     - `rtsp://rtsp.stream/pattern`
     - `rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4`

2. **Start Streaming**
   - Click "▶️ Start Stream" button
   - Wait for stream initialization (may take a few seconds)
   - Video will appear in the player

3. **Create Overlays**
   - Fill in the overlay form:
     - **Name**: Unique identifier (e.g., "logo", "timestamp")
     - **Text**: Content to display (e.g., "LIVE", "Company Name")
     - **X Position**: Horizontal position in pixels
     - **Y Position**: Vertical position in pixels
     - **Font Size**: Text size in pixels
     - **Color**: Text color (use color picker)
   - Click "💾 Save Overlay"

4. **Manage Overlays**
   - View all overlays in the list on the right
   - **Toggle**: Click ON/OFF to enable/disable
   - **Edit**: Modify overlay properties
   - **Delete**: Remove overlay permanently

5. **Stop Streaming**
   - Click "⏹️ Stop Stream" when done

---

## 📚 API Documentation

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

### Quick Reference

#### Overlay Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/overlays` | Create new overlay |
| `GET` | `/api/overlays` | Get all overlays |
| `GET` | `/api/overlays/<name>` | Get specific overlay |
| `PUT` | `/api/overlays/<name>` | Update overlay |
| `DELETE` | `/api/overlays/<name>` | Delete overlay |

#### Stream Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/stream/start` | Start RTSP conversion |
| `POST` | `/api/stream/stop` | Stop RTSP conversion |
| `GET` | `/api/health` | Health check |

### Example: Create Overlay

```bash
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "name": "watermark",
    "text": "LIVE",
    "x": 50,
    "y": 50,
    "fontSize": 32,
    "color": "#FF0000",
    "enabled": true
  }'
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Stream Not Playing

**Problem**: Video doesn't load after clicking "Start Stream"

**Solutions**:
- Verify FFmpeg is installed: `ffmpeg -version`
- Check RTSP URL is valid and accessible
- Wait 5-10 seconds for HLS initialization
- Check browser console for errors
- Ensure MongoDB is running

#### 2. MongoDB Connection Error

**Problem**: `pymongo.errors.ServerSelectionTimeoutError`

**Solutions**:
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

#### 3. Port Already in Use

**Problem**: `Address already in use`

**Solutions**:
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### 4. CORS Errors

**Problem**: `CORS policy blocked`

**Solution**: Ensure Flask-CORS is installed and backend is running

#### 5. FFmpeg Not Found

**Problem**: `FFmpeg not found` error when starting stream

**Solution**:
```bash
# Install FFmpeg (see Prerequisites section)
# Verify installation
ffmpeg -version

# Check if FFmpeg is in PATH
which ffmpeg  # macOS/Linux
where ffmpeg  # Windows
```

---

## 🧪 Testing

### Test RTSP URLs

Use these public RTSP streams for testing:

1. **Test Pattern**: `rtsp://rtsp.stream/pattern`
2. **Big Buck Bunny**: `rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4`
3. **Sample Video**: `rtsp://rtsp.me/test`

### Manual API Testing

```bash
# Health Check
curl http://localhost:5000/api/health

# Create Overlay
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{"name":"test","text":"Hello World","x":100,"y":50}'

# Get All Overlays
curl http://localhost:5000/api/overlays

# Update Overlay
curl -X PUT http://localhost:5000/api/overlays/test \
  -H "Content-Type: application/json" \
  -d '{"text":"Updated Text"}'

# Delete Overlay
curl -X DELETE http://localhost:5000/api/overlays/test
```

---

## 🚢 Deployment

### Production Build

#### Frontend

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

#### Backend

```bash
# Use production WSGI server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables

Create `.env` file in backend:

```env
MONGO_URI=mongodb://your-production-db-uri
FLASK_ENV=production
FLASK_DEBUG=False
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Built for **Livesitter** Full Stack Developer Assignment
- React Player library for video playback
- FFmpeg for stream conversion
- MongoDB for data persistence
- TailwindCSS for beautiful UI

---

## 📞 Support

For issues and questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Open an issue on GitHub
3. Contact: safiyarukan3@gmail.com

---

**Made with ❤️ for Livesitter**





