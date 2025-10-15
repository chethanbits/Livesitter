"""
Overlay Model Schema

This file defines the structure of overlay documents in MongoDB
"""

overlay_schema = {
    "name": {
        "type": "string",
        "required": True,
        "unique": True,
        "description": "Unique identifier for the overlay"
    },
    "text": {
        "type": "string",
        "required": False,
        "default": "",
        "description": "Text content to display in the overlay"
    },
    "x": {
        "type": "number",
        "required": False,
        "default": 0,
        "description": "X-coordinate position (in pixels)"
    },
    "y": {
        "type": "number",
        "required": False,
        "default": 0,
        "description": "Y-coordinate position (in pixels)"
    },
    "fontSize": {
        "type": "number",
        "required": False,
        "default": 24,
        "description": "Font size in pixels"
    },
    "color": {
        "type": "string",
        "required": False,
        "default": "#ffffff",
        "description": "Text color in hex format"
    },
    "enabled": {
        "type": "boolean",
        "required": False,
        "default": True,
        "description": "Whether the overlay is currently active"
    }
}

def validate_overlay(overlay_data):
    """
    Validate overlay data against schema
    
    Args:
        overlay_data (dict): Overlay data to validate
        
    Returns:
        tuple: (is_valid, error_message)
    """
    if not overlay_data.get("name"):
        return False, "Name is required"
    
    if "x" in overlay_data and not isinstance(overlay_data["x"], (int, float)):
        return False, "X coordinate must be a number"
    
    if "y" in overlay_data and not isinstance(overlay_data["y"], (int, float)):
        return False, "Y coordinate must be a number"
    
    if "fontSize" in overlay_data and not isinstance(overlay_data["fontSize"], (int, float)):
        return False, "Font size must be a number"
    
    if "enabled" in overlay_data and not isinstance(overlay_data["enabled"], bool):
        return False, "Enabled must be a boolean"
    
    return True, None





