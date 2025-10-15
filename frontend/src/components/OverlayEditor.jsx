import React, { useState } from "react";
import { createOverlay } from "../api/overlayApi";

export default function OverlayEditor({ onOverlayCreated }) {
  const [overlay, setOverlay] = useState({
    name: "",
    text: "",
    x: 0,
    y: 0,
    fontSize: 24,
    color: "#ffffff",
    enabled: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field, value) => {
    setOverlay((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!overlay.name.trim()) {
      setError("Overlay name is required");
      return;
    }

    if (!overlay.text.trim()) {
      setError("Overlay text is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createOverlay(overlay);
      setSuccess("✅ Overlay created successfully!");
      // Reset form
      setOverlay({
        name: "",
        text: "",
        x: 0,
        y: 0,
        fontSize: 24,
        color: "#ffffff",
        enabled: true,
      });
      // Notify parent to refresh overlay list
      if (onOverlayCreated) {
        onOverlayCreated();
      }
    } catch (err) {
      setError(err.error || "Failed to create overlay");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="mr-2">✏️</span>
        Create Overlay
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Overlay Name *
          </label>
          <input
            type="text"
            placeholder="e.g., logo, timestamp"
            value={overlay.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Content *
          </label>
          <input
            type="text"
            placeholder="e.g., LIVE, Company Name"
            value={overlay.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        {/* Position Controls */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              X Position (px)
            </label>
            <input
              type="number"
              value={overlay.x}
              onChange={(e) => handleChange("x", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y Position (px)
            </label>
            <input
              type="number"
              value={overlay.y}
              onChange={(e) => handleChange("y", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Font Size and Color */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Size (px)
            </label>
            <input
              type="number"
              value={overlay.fontSize}
              onChange={(e) => handleChange("fontSize", parseInt(e.target.value) || 24)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="color"
              value={overlay.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Enabled Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enabled"
            checked={overlay.enabled}
            onChange={(e) => handleChange("enabled", e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="enabled" className="ml-2 text-sm text-gray-700">
            Enable overlay
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95"
          }`}
        >
          {loading ? "⏳ Creating..." : "💾 Save Overlay"}
        </button>
      </form>
    </div>
  );
}





