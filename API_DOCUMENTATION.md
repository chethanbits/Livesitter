# 📡 API Documentation - RTSP Livestream App

Complete API reference for the RTSP Livestream application backend.

**Base URL**: `http://localhost:5000`

---

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Overlay Management](#overlay-management)
  - [Stream Control](#stream-control)
- [Data Models](#data-models)
- [Response Codes](#response-codes)
- [Examples](#examples)

---

## 🌐 Overview

The API follows REST principles and uses JSON for request/response payloads.

### Base Information

- **Protocol**: HTTP/HTTPS
- **Data Format**: JSON
- **Encoding**: UTF-8
- **CORS**: Enabled for all origins (development)

---

## 🔐 Authentication

Currently, no authentication is required (development mode).

**Production Note**: Implement authentication before deploying to production.

---

## ⚠️ Error Handling

### Error Response Format

All errors return a JSON object with an `error` field:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Error Responses

| Status Code | Meaning | Example |
|-------------|---------|---------|
| `400` | Bad Request | Missing required fields |
| `404` | Not Found | Overlay doesn't exist |
| `500` | Internal Server Error | Database connection failed |

---

## 🔌 Endpoints

### Health Check

#### `GET /api/health`

Check API and database connectivity.

**Response**

```json
{
  "status": "healthy",
  "database": "connected"
}
```

**Status Codes**
- `200` - System is healthy
- `500` - System is unhealthy

**Example**

```bash
curl http://localhost:5000/api/health
```

---

### Overlay Management

#### `POST /api/overlays`

Create a new overlay.

**Request Body**

```json
{
  "name": "string (required, unique)",
  "text": "string (required)",
  "x": "number (optional, default: 0)",
  "y": "number (optional, default: 0)",
  "fontSize": "number (optional, default: 24)",
  "color": "string (optional, default: '#ffffff')",
  "enabled": "boolean (optional, default: true)"
}
```

**Response** (201 Created)

```json
{
  "message": "Overlay created successfully",
  "overlay": {
    "name": "watermark",
    "text": "LIVE",
    "x": 50,
    "y": 50,
    "fontSize": 32,
    "color": "#FF0000",
    "enabled": true
  }
}
```

**Error Responses**

```json
// 400 - Name is missing
{
  "error": "Name is required"
}

// 400 - Name already exists
{
  "error": "Overlay with this name already exists"
}
```

**Example**

```bash
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "name": "logo",
    "text": "My Company",
    "x": 100,
    "y": 50,
    "fontSize": 28,
    "color": "#00FF00",
    "enabled": true
  }'
```

---

#### `GET /api/overlays`

Get all overlays.

**Response** (200 OK)

```json
{
  "overlays": [
    {
      "name": "watermark",
      "text": "LIVE",
      "x": 50,
      "y": 50,
      "fontSize": 32,
      "color": "#FF0000",
      "enabled": true
    },
    {
      "name": "timestamp",
      "text": "2024-01-15",
      "x": 200,
      "y": 100,
      "fontSize": 24,
      "color": "#FFFFFF",
      "enabled": false
    }
  ]
}
```

**Example**

```bash
curl http://localhost:5000/api/overlays
```

---

#### `GET /api/overlays/<name>`

Get a specific overlay by name.

**URL Parameters**
- `name` - Overlay name (string)

**Response** (200 OK)

```json
{
  "overlay": {
    "name": "watermark",
    "text": "LIVE",
    "x": 50,
    "y": 50,
    "fontSize": 32,
    "color": "#FF0000",
    "enabled": true
  }
}
```

**Error Response** (404 Not Found)

```json
{
  "error": "Overlay not found"
}
```

**Example**

```bash
curl http://localhost:5000/api/overlays/watermark
```

---

#### `PUT /api/overlays/<name>`

Update an existing overlay.

**URL Parameters**
- `name` - Overlay name (string)

**Request Body**

All fields are optional. Only send fields you want to update:

```json
{
  "text": "string",
  "x": "number",
  "y": "number",
  "fontSize": "number",
  "color": "string",
  "enabled": "boolean"
}
```

**Response** (200 OK)

```json
{
  "message": "Overlay updated successfully",
  "overlay": {
    "name": "watermark",
    "text": "UPDATED TEXT",
    "x": 50,
    "y": 50,
    "fontSize": 32,
    "color": "#FF0000",
    "enabled": true
  }
}
```

**Error Response** (404 Not Found)

```json
{
  "error": "Overlay not found"
}
```

**Example**

```bash
curl -X PUT http://localhost:5000/api/overlays/watermark \
  -H "Content-Type: application/json" \
  -d '{
    "text": "NOW LIVE",
    "enabled": true
  }'
```

---

#### `DELETE /api/overlays/<name>`

Delete an overlay.

**URL Parameters**
- `name` - Overlay name (string)

**Response** (200 OK)

```json
{
  "message": "Overlay deleted successfully"
}
```

**Error Response** (404 Not Found)

```json
{
  "error": "Overlay not found"
}
```

**Example**

```bash
curl -X DELETE http://localhost:5000/api/overlays/watermark
```

---

### Stream Control

#### `POST /api/stream/start`

Start RTSP to HLS conversion.

**Request Body**

```json
{
  "rtsp_url": "string (required)"
}
```

**Response** (200 OK)

```json
{
  "message": "Stream conversion started",
  "hls_url": "/static/stream.m3u8",
  "details": {
    "status": "started",
    "rtsp_url": "rtsp://example.com/stream",
    "hls_url": "static/stream.m3u8",
    "pid": 12345
  }
}
```

**Error Responses**

```json
// 400 - Missing URL
{
  "error": "RTSP URL is required"
}

// 500 - FFmpeg not found
{
  "error": {
    "status": "error",
    "message": "FFmpeg not found. Please install FFmpeg to use streaming functionality."
  }
}
```

**Example**

```bash
curl -X POST http://localhost:5000/api/stream/start \
  -H "Content-Type: application/json" \
  -d '{
    "rtsp_url": "rtsp://rtsp.stream/pattern"
  }'
```

---

#### `POST /api/stream/stop`

Stop RTSP to HLS conversion.

**Response** (200 OK)

```json
{
  "message": "Stream conversion stopped"
}
```

**Example**

```bash
curl -X POST http://localhost:5000/api/stream/stop
```

---

## 📊 Data Models

### Overlay Model

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | String | Yes | - | Unique identifier |
| `text` | String | No | `""` | Display text |
| `x` | Number | No | `0` | X-coordinate (pixels) |
| `y` | Number | No | `0` | Y-coordinate (pixels) |
| `fontSize` | Number | No | `24` | Font size (pixels) |
| `color` | String | No | `"#ffffff"` | Hex color code |
| `enabled` | Boolean | No | `true` | Overlay visibility |

**Validation Rules**
- `name`: Must be unique, non-empty string
- `x`, `y`, `fontSize`: Must be numbers
- `color`: Must be valid hex color (e.g., `#RRGGBB`)
- `enabled`: Must be boolean

---

## 📈 Response Codes

### Success Codes

| Code | Status | Usage |
|------|--------|-------|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST (resource created) |

### Error Codes

| Code | Status | Usage |
|------|--------|-------|
| `400` | Bad Request | Invalid input data |
| `404` | Not Found | Resource doesn't exist |
| `500` | Internal Server Error | Server/database error |

---

## 💡 Examples

### Complete Workflow Example

```bash
# 1. Check system health
curl http://localhost:5000/api/health

# 2. Create an overlay
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "name": "channel_logo",
    "text": "ABC News",
    "x": 20,
    "y": 20,
    "fontSize": 24,
    "color": "#FFFFFF",
    "enabled": true
  }'

# 3. Get all overlays
curl http://localhost:5000/api/overlays

# 4. Update the overlay
curl -X PUT http://localhost:5000/api/overlays/channel_logo \
  -H "Content-Type: application/json" \
  -d '{
    "text": "ABC News HD",
    "fontSize": 28
  }'

# 5. Start stream
curl -X POST http://localhost:5000/api/stream/start \
  -H "Content-Type: application/json" \
  -d '{
    "rtsp_url": "rtsp://rtsp.stream/pattern"
  }'

# 6. Disable overlay
curl -X PUT http://localhost:5000/api/overlays/channel_logo \
  -H "Content-Type: application/json" \
  -d '{"enabled": false}'

# 7. Stop stream
curl -X POST http://localhost:5000/api/stream/stop

# 8. Delete overlay
curl -X DELETE http://localhost:5000/api/overlays/channel_logo
```

### Python Example

```python
import requests

BASE_URL = "http://localhost:5000"

# Create overlay
overlay_data = {
    "name": "test_overlay",
    "text": "Hello World",
    "x": 100,
    "y": 50,
    "fontSize": 32,
    "color": "#FF0000"
}

response = requests.post(
    f"{BASE_URL}/api/overlays",
    json=overlay_data
)

print(response.json())

# Get all overlays
response = requests.get(f"{BASE_URL}/api/overlays")
overlays = response.json()["overlays"]

for overlay in overlays:
    print(f"Overlay: {overlay['name']} - {overlay['text']}")

# Update overlay
response = requests.put(
    f"{BASE_URL}/api/overlays/test_overlay",
    json={"text": "Updated Text"}
)

print(response.json())

# Delete overlay
response = requests.delete(f"{BASE_URL}/api/overlays/test_overlay")
print(response.json())
```

### JavaScript Example

```javascript
const BASE_URL = 'http://localhost:5000';

// Create overlay
async function createOverlay() {
  const response = await fetch(`${BASE_URL}/api/overlays`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'js_overlay',
      text: 'JavaScript Overlay',
      x: 150,
      y: 75,
      fontSize: 30,
      color: '#00FF00'
    })
  });
  
  const data = await response.json();
  console.log(data);
}

// Get all overlays
async function getOverlays() {
  const response = await fetch(`${BASE_URL}/api/overlays`);
  const data = await response.json();
  console.log(data.overlays);
}

// Update overlay
async function updateOverlay(name) {
  const response = await fetch(`${BASE_URL}/api/overlays/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      enabled: false
    })
  });
  
  const data = await response.json();
  console.log(data);
}

// Delete overlay
async function deleteOverlay(name) {
  const response = await fetch(`${BASE_URL}/api/overlays/${name}`, {
    method: 'DELETE'
  });
  
  const data = await response.json();
  console.log(data);
}
```

---

## 🔗 Additional Resources

- [Main README](README.md) - Setup and usage guide
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

---

**Last Updated**: 2024
**API Version**: 1.0.0





