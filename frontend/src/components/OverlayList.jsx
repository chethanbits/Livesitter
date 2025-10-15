import React, { useState, useEffect } from "react";
import { getOverlays, updateOverlay, deleteOverlay } from "../api/overlayApi";

export default function OverlayList({ refreshKey, onOverlayUpdated }) {
  const [overlays, setOverlays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingOverlay, setEditingOverlay] = useState(null);

  useEffect(() => {
    fetchOverlays();
  }, [refreshKey]);

  const fetchOverlays = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getOverlays();
      setOverlays(response.overlays || []);
    } catch (err) {
      setError(err.error || "Failed to fetch overlays");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEnabled = async (overlay) => {
    try {
      await updateOverlay(overlay.name, {
        enabled: !overlay.enabled,
      });
      fetchOverlays();
      if (onOverlayUpdated) {
        onOverlayUpdated();
      }
    } catch (err) {
      setError(err.error || "Failed to update overlay");
    }
  };

  const handleDelete = async (name) => {
    if (!window.confirm(`Delete overlay "${name}"?`)) {
      return;
    }

    try {
      await deleteOverlay(name);
      fetchOverlays();
      if (onOverlayUpdated) {
        onOverlayUpdated();
      }
    } catch (err) {
      setError(err.error || "Failed to delete overlay");
    }
  };

  const handleEdit = (overlay) => {
    setEditingOverlay({ ...overlay });
  };

  const handleSaveEdit = async () => {
    if (!editingOverlay) return;

    try {
      await updateOverlay(editingOverlay.name, {
        text: editingOverlay.text,
        x: editingOverlay.x,
        y: editingOverlay.y,
        fontSize: editingOverlay.fontSize,
        color: editingOverlay.color,
        enabled: editingOverlay.enabled,
      });
      setEditingOverlay(null);
      fetchOverlays();
      if (onOverlayUpdated) {
        onOverlayUpdated();
      }
    } catch (err) {
      setError(err.error || "Failed to update overlay");
    }
  };

  const handleCancelEdit = () => {
    setEditingOverlay(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📋</span>
          Overlays ({overlays.length})
        </h2>
        <button
          onClick={fetchOverlays}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-all"
        >
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-500">
          <div className="animate-spin text-4xl mb-2">⏳</div>
          <p>Loading overlays...</p>
        </div>
      ) : overlays.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📭</div>
          <p>No overlays yet. Create one above!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {overlays.map((overlay) => (
            <div
              key={overlay.name}
              className={`border-2 rounded-lg p-4 transition-all ${
                overlay.enabled
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              {editingOverlay?.name === overlay.name ? (
                // Edit Mode
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingOverlay.text}
                    onChange={(e) =>
                      setEditingOverlay({ ...editingOverlay, text: e.target.value })
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Text"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={editingOverlay.x}
                      onChange={(e) =>
                        setEditingOverlay({
                          ...editingOverlay,
                          x: parseInt(e.target.value) || 0,
                        })
                      }
                      className="px-2 py-1 border rounded"
                      placeholder="X"
                    />
                    <input
                      type="number"
                      value={editingOverlay.y}
                      onChange={(e) =>
                        setEditingOverlay({
                          ...editingOverlay,
                          y: parseInt(e.target.value) || 0,
                        })
                      }
                      className="px-2 py-1 border rounded"
                      placeholder="Y"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={editingOverlay.fontSize}
                      onChange={(e) =>
                        setEditingOverlay({
                          ...editingOverlay,
                          fontSize: parseInt(e.target.value) || 24,
                        })
                      }
                      className="px-2 py-1 border rounded"
                      placeholder="Font Size"
                    />
                    <input
                      type="color"
                      value={editingOverlay.color}
                      onChange={(e) =>
                        setEditingOverlay({ ...editingOverlay, color: e.target.value })
                      }
                      className="h-8 border rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      ✅ Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{overlay.name}</h3>
                      <p
                        className="text-sm mt-1"
                        style={{
                          color: overlay.color,
                          fontSize: `${Math.min(overlay.fontSize, 16)}px`,
                        }}
                      >
                        {overlay.text}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleEnabled(overlay)}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          overlay.enabled
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {overlay.enabled ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <p>
                      📍 Position: ({overlay.x}, {overlay.y})
                    </p>
                    <p>
                      🔤 Font: {overlay.fontSize}px{" "}
                      <span
                        className="inline-block w-4 h-4 rounded border"
                        style={{ backgroundColor: overlay.color }}
                      ></span>
                    </p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(overlay)}
                      className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(overlay.name)}
                      className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}





