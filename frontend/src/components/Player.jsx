import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { startStream, stopStream } from "../api/overlayApi";

export default function Player({ rtspUrl, isStreamActive, setIsStreamActive }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hlsUrl, setHlsUrl] = useState("");

  const handleStartStream = async () => {
    if (!rtspUrl.trim()) {
      setError("Please enter an RTSP URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await startStream(rtspUrl);
      setHlsUrl(response.hls_url);
      setIsStreamActive(true);
      setError("");
    } catch (err) {
      setError(err.error || "Failed to start stream. Make sure FFmpeg is installed.");
      setIsStreamActive(false);
    } finally {
      setLoading(false);
    }
  };

  const handleStopStream = async () => {
    setLoading(true);
    try {
      await stopStream();
      setIsStreamActive(false);
      setHlsUrl("");
    } catch (err) {
      setError(err.error || "Failed to stop stream");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Control Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleStartStream}
          disabled={loading || isStreamActive}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
            isStreamActive
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
          }`}
        >
          {loading ? "⏳ Starting..." : "▶️ Start Stream"}
        </button>
        <button
          onClick={handleStopStream}
          disabled={loading || !isStreamActive}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
            !isStreamActive
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:scale-95"
          }`}
        >
          {loading ? "⏳ Stopping..." : "⏹️ Stop Stream"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <span className="text-red-700">⚠️ {error}</span>
          </div>
          {error.includes("FFmpeg") && (
            <p className="text-sm text-red-600 mt-2">
              Install FFmpeg: <code className="bg-red-100 px-2 py-1 rounded">sudo apt install ffmpeg</code> (Linux) or{" "}
              <code className="bg-red-100 px-2 py-1 rounded">brew install ffmpeg</code> (Mac)
            </p>
          )}
        </div>
      )}

      {/* Stream Status */}
      {isStreamActive && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-center">
            <span className="animate-pulse mr-2">🔴</span>
            <span className="text-green-700 font-medium">Stream is Live</span>
          </div>
        </div>
      )}

      {/* Video Player */}
      <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video">
        {isStreamActive && hlsUrl ? (
          <ReactPlayer
            url={hlsUrl}
            controls
            playing
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
              },
            }}
            onError={(e) => {
              console.error("Player error:", e);
              setError("Stream playback error. The stream may still be initializing...");
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/60">
            <div className="text-center">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-lg">
                {rtspUrl
                  ? "Click 'Start Stream' to begin playback"
                  : "Enter an RTSP URL to get started"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stream Info */}
      {isStreamActive && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <p>
            <strong>Stream URL:</strong>{" "}
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">{rtspUrl}</code>
          </p>
          <p className="mt-1">
            <strong>HLS Playlist:</strong>{" "}
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">{hlsUrl}</code>
          </p>
        </div>
      )}
    </div>
  );
}





