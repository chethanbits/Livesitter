# Backend - Flask API Server

Flask backend for RTSP Livestream application.

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
```

Server runs at: **http://localhost:5000**

## 📁 Directory Structure

```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── env.example            # Environment variables template
├── models/
│   └── overlay_model.py   # Overlay data model
└── utils/
    └── stream_converter.py # RTSP to HLS conversion
```

## 🔧 Configuration

Create `.env` file (optional):

```env
MONGO_URI=mongodb://localhost:27017/
FLASK_ENV=development
FLASK_DEBUG=True
```

## 📡 API Endpoints

- `GET /` - API info
- `GET /api/health` - Health check
- `POST /api/overlays` - Create overlay
- `GET /api/overlays` - Get all overlays
- `GET /api/overlays/<name>` - Get overlay
- `PUT /api/overlays/<name>` - Update overlay
- `DELETE /api/overlays/<name>` - Delete overlay
- `POST /api/stream/start` - Start RTSP stream
- `POST /api/stream/stop` - Stop RTSP stream

See [../API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for details.

## 🧪 Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Create overlay
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{"name":"test","text":"LIVE","x":50,"y":50}'
```

## 📦 Dependencies

- **Flask** - Web framework
- **flask-cors** - CORS support
- **pymongo** - MongoDB driver
- **python-dotenv** - Environment variables

## 🔒 Security Notes

**Development Mode**: Debug enabled, CORS open

**Production**: 
- Disable debug mode
- Restrict CORS origins
- Add authentication
- Use environment variables for secrets





