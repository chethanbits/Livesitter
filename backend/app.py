from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["livestream_db"]
overlays_collection = db["overlays"]

# Ensure static directory exists for HLS files
os.makedirs("static", exist_ok=True)

@app.route("/")
def index():
    return jsonify({
        "message": "RTSP Livestream API",
        "version": "1.0.0",
        "endpoints": {
            "overlays": "/api/overlays",
            "stream": "/api/stream",
            "health": "/api/health"
        }
    })

@app.route("/api/health", methods=["GET"])
def health_check():
    try:
        # Check MongoDB connection
        client.admin.command('ping')
        return jsonify({"status": "healthy", "database": "connected"}), 200
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

# OVERLAY CRUD ENDPOINTS

@app.route("/api/overlays", methods=["POST"])
def create_overlay():
    """
    Create a new overlay
    Expected JSON: {
        "name": "overlay1",
        "text": "Sample Text",
        "x": 100,
        "y": 50,
        "fontSize": 24,
        "color": "#ffffff",
        "enabled": true
    }
    """
    try:
        data = request.json
        
        # Validate required fields
        if not data.get("name"):
            return jsonify({"error": "Name is required"}), 400
        
        # Check if overlay with same name exists
        if overlays_collection.find_one({"name": data["name"]}):
            return jsonify({"error": "Overlay with this name already exists"}), 400
        
        # Set defaults
        overlay = {
            "name": data["name"],
            "text": data.get("text", ""),
            "x": data.get("x", 0),
            "y": data.get("y", 0),
            "fontSize": data.get("fontSize", 24),
            "color": data.get("color", "#ffffff"),
            "enabled": data.get("enabled", True)
        }
        
        overlays_collection.insert_one(overlay)
        overlay.pop("_id")  # Remove MongoDB _id from response
        
        return jsonify({
            "message": "Overlay created successfully",
            "overlay": overlay
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/overlays", methods=["GET"])
def get_overlays():
    """
    Get all overlays
    """
    try:
        overlays = list(overlays_collection.find({}, {"_id": 0}))
        return jsonify({"overlays": overlays}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/overlays/<string:name>", methods=["GET"])
def get_overlay(name):
    """
    Get a specific overlay by name
    """
    try:
        overlay = overlays_collection.find_one({"name": name}, {"_id": 0})
        if not overlay:
            return jsonify({"error": "Overlay not found"}), 404
        return jsonify({"overlay": overlay}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/overlays/<string:name>", methods=["PUT"])
def update_overlay(name):
    """
    Update an existing overlay
    """
    try:
        updates = request.json
        
        # Remove name from updates if present
        updates.pop("name", None)
        updates.pop("_id", None)
        
        result = overlays_collection.update_one(
            {"name": name},
            {"$set": updates}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        
        updated_overlay = overlays_collection.find_one({"name": name}, {"_id": 0})
        
        return jsonify({
            "message": "Overlay updated successfully",
            "overlay": updated_overlay
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/overlays/<string:name>", methods=["DELETE"])
def delete_overlay(name):
    """
    Delete an overlay
    """
    try:
        result = overlays_collection.delete_one({"name": name})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        
        return jsonify({"message": "Overlay deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# STREAM ENDPOINTS

@app.route("/api/stream/start", methods=["POST"])
def start_stream():
    """
    Start RTSP to HLS conversion
    Expected JSON: {
        "rtsp_url": "rtsp://example.com/stream"
    }
    """
    try:
        from utils.stream_converter import start_rtsp_conversion
        
        data = request.json
        rtsp_url = data.get("rtsp_url")
        
        if not rtsp_url:
            return jsonify({"error": "RTSP URL is required"}), 400
        
        result = start_rtsp_conversion(rtsp_url)
        
        return jsonify({
            "message": "Stream conversion started",
            "hls_url": "/static/stream.m3u8",
            "details": result
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/stream/stop", methods=["POST"])
def stop_stream():
    """
    Stop RTSP to HLS conversion
    """
    try:
        from utils.stream_converter import stop_rtsp_conversion
        
        result = stop_rtsp_conversion()
        
        return jsonify({"message": "Stream conversion stopped", "details": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/stream/status", methods=["GET"])
def stream_status():
    """
    Check stream conversion status
    """
    try:
        from utils.stream_converter import get_stream_status
        
        status = get_stream_status()
        
        return jsonify({"status": status}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/stream/test", methods=["POST"])
def test_stream():
    """
    Start a test pattern stream
    """
    try:
        from utils.stream_converter import start_test_pattern_conversion
        
        result = start_test_pattern_conversion()
        
        return jsonify({
            "message": "Test stream started",
            "hls_url": "/static/stream.m3u8",
            "details": result
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve HLS files
@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("static", filename)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000, use_reloader=False)





