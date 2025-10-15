import React, { useState } from "react";
import Player from "./components/Player";
import OverlayEditor from "./components/OverlayEditor";
import OverlayList from "./components/OverlayList";

function App() {
  const [rtspUrl, setRtspUrl] = useState("");
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [refreshOverlays, setRefreshOverlays] = useState(0);

  const handleOverlayUpdate = () => {
    setRefreshOverlays((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🎥 RTSP Livestream App
          </h1>
          <p className="text-white/90 text-lg">
            Real-time Streaming with Dynamic Overlays
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                📡 Stream Input
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RTSP URL
                </label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="rtsp://example.com/stream or use test URL"
                  value={rtspUrl}
                  onChange={(e) => setRtspUrl(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Try: rtsp://rtsp.stream/pattern or wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4
                </p>
              </div>

              <Player
                rtspUrl={rtspUrl}
                isStreamActive={isStreamActive}
                setIsStreamActive={setIsStreamActive}
              />
            </div>
          </div>

          {/* Right Column - Overlay Controls */}
          <div className="space-y-6">
            <OverlayEditor onOverlayCreated={handleOverlayUpdate} />
            <OverlayList
              refreshKey={refreshOverlays}
              onOverlayUpdated={handleOverlayUpdate}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/80">
          <p className="text-sm">
            Built with ❤️ for Livesitter | React + Flask + MongoDB
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;





