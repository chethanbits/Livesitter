# Frontend - React Application

React frontend for RTSP Livestream application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Application runs at: **http://localhost:3000**

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── App.jsx              # Main application
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   ├── components/
│   │   ├── Player.jsx       # Video player
│   │   ├── OverlayEditor.jsx # Create overlays
│   │   └── OverlayList.jsx  # Manage overlays
│   └── api/
│       └── overlayApi.js    # API client
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite config
├── tailwind.config.js       # TailwindCSS config
└── postcss.config.js        # PostCSS config
```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 Components

### Player.jsx
Video player with RTSP stream controls.

**Features**:
- Start/stop stream
- Real-time playback
- Error handling
- Stream status display

### OverlayEditor.jsx
Form to create new overlays.

**Features**:
- Name and text input
- Position controls (x, y)
- Font size selector
- Color picker
- Enable/disable toggle

### OverlayList.jsx
List and manage existing overlays.

**Features**:
- Display all overlays
- Edit inline
- Toggle enable/disable
- Delete with confirmation
- Auto-refresh

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-player** - Video player component
- **axios** - HTTP client
- **vite** - Build tool
- **tailwindcss** - CSS framework

## 🎨 Styling

Uses **TailwindCSS** for styling with custom gradient backgrounds and modern UI components.

Colors:
- Primary: Purple/Pink gradient
- Success: Green
- Danger: Red
- Info: Blue

## 🔌 API Integration

All API calls are centralized in `src/api/overlayApi.js`.

Vite proxy configuration handles routing `/api` requests to backend at `http://localhost:5000`.

## 🏗️ Building for Production

```bash
npm run build
```

Output in `dist/` directory. Serve with any static file server.





