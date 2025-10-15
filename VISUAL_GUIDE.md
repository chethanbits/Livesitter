# 🎨 Visual Guide - UI Components & Workflow

Visual overview of the RTSP Livestream App interface and workflow.

---

## 🏠 Application Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                  🎥 RTSP Livestream App                        │
│           Real-time Streaming with Dynamic Overlays             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬────────────────────────────────┐
│                              │                                │
│    📡 Stream Input            │   ✏️ Create Overlay           │
│                              │                                │
│  RTSP URL                     │   Overlay Name: [_______]     │
│  [rtsp://example.com/...]    │   Text Content: [_______]     │
│                              │   X Position: [50]            │
│  ▶️ Start Stream  ⏹️ Stop    │   Y Position: [50]            │
│                              │   Font Size: [24]             │
│  ┌─────────────────────┐    │   Color: [🎨 #ffffff]         │
│  │                     │    │   ☑ Enable overlay            │
│  │   VIDEO PLAYER      │    │                                │
│  │    (HLS Stream)     │    │   💾 Save Overlay             │
│  │                     │    │                                │
│  │     [Controls]      │    ├────────────────────────────────│
│  └─────────────────────┘    │                                │
│                              │   📋 Overlays (3)         🔄  │
│  🔴 Stream is Live            │                                │
│  Stream: rtsp://...          │   ┌──────────────────────┐   │
│  HLS: /static/stream.m3u8    │   │ 🟢 watermark    [ON] │   │
│                              │   │ Text: "LIVE"         │   │
│                              │   │ Position: (50, 50)   │   │
│                              │   │ ✏️ Edit  🗑️ Delete    │   │
│                              │   └──────────────────────┘   │
│                              │                                │
│                              │   ┌──────────────────────┐   │
│                              │   │ ⚪ timestamp   [OFF] │   │
│                              │   │ Text: "12:30 PM"     │   │
│                              │   │ Position: (200, 100) │   │
│                              │   │ ✏️ Edit  🗑️ Delete    │   │
│                              │   └──────────────────────┘   │
└──────────────────────────────┴────────────────────────────────┘
```

---

## 🎯 User Workflow

### Step 1: Enter RTSP URL
```
┌────────────────────────────┐
│ RTSP URL                   │
│ [rtsp://rtsp.stream/pat...] │
│                            │
│ 💡 Try: rtsp://rtsp.stream │
│        /pattern            │
└────────────────────────────┘
```

### Step 2: Start Stream
```
┌────────────────────────────┐
│  ▶️ Start Stream           │
└────────────────────────────┘
           ↓
┌────────────────────────────┐
│  ⏳ Starting...             │
└────────────────────────────┘
           ↓
┌────────────────────────────┐
│  🔴 Stream is Live         │
│  ┌──────────────────┐     │
│  │                  │     │
│  │  VIDEO PLAYING   │     │
│  │                  │     │
│  └──────────────────┘     │
└────────────────────────────┘
```

### Step 3: Create Overlay
```
Create Overlay Form
──────────────────
Overlay Name: [watermark]
Text Content: [LIVE]
X Position:   [50]
Y Position:   [50]
Font Size:    [32]
Color:        [🎨 #FF0000]
☑ Enable overlay

         ↓
    💾 Save Overlay
         ↓
✅ Overlay created successfully!
```

### Step 4: Manage Overlays
```
┌─────────────────────────────┐
│ 📋 Overlays (1)        🔄   │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ 🟢 watermark      [ON]  │ │
│ │ Text: "LIVE"            │ │
│ │ Position: (50, 50)      │ │
│ │ Font: 32px 🔴           │ │
│ │                         │ │
│ │ ✏️ Edit  🗑️ Delete      │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘

Actions Available:
- 🟢/⚪ Toggle ON/OFF
- ✏️ Edit properties
- 🗑️ Delete overlay
```

---

## 🎨 Color Scheme

### Primary Colors
```
Purple Gradient:  #667eea → #764ba2
Green (Success):  #10B981
Red (Danger):     #EF4444
Blue (Info):      #3B82F6
Gray (Neutral):   #6B7280
```

### UI Elements
```
┌─────────────────┐
│  ▶️ Start       │  Green Button
└─────────────────┘

┌─────────────────┐
│  ⏹️ Stop        │  Red Button
└─────────────────┘

┌─────────────────┐
│  💾 Save        │  Purple Gradient
└─────────────────┘

┌─────────────────┐
│  ✏️ Edit        │  Blue Button
└─────────────────┘

┌─────────────────┐
│  🗑️ Delete      │  Red Button
└─────────────────┘
```

---

## 📱 Responsive Design

### Desktop View (1920px)
```
┌──────────────────────────────────────────────────────┐
│         Header                                       │
├────────────────────────────┬────────────────────────┤
│                            │                        │
│    Video Player            │   Overlay Controls     │
│    (66% width)             │   (33% width)          │
│                            │                        │
└────────────────────────────┴────────────────────────┘
```

### Tablet View (768px)
```
┌──────────────────────────────────┐
│         Header                   │
├──────────────────────────────────┤
│    Video Player (Full Width)     │
├──────────────────────────────────┤
│    Overlay Controls (Full Width) │
└──────────────────────────────────┘
```

### Mobile View (375px)
```
┌─────────────┐
│   Header    │
├─────────────┤
│   Video     │
│   Player    │
├─────────────┤
│   Overlay   │
│   Controls  │
└─────────────┘
```

---

## 🔄 State Transitions

### Stream States
```
[Not Started]
      ↓ Click "Start Stream"
  [Loading]
      ↓ Stream initialized
   [Playing]
      ↓ Click "Stop Stream"
[Not Started]
```

### Overlay States
```
[Form Empty]
      ↓ Fill form
 [Form Valid]
      ↓ Click "Save"
  [Saving...]
      ↓ Success
  [In List]
      ↓ Click "Edit"
[Editing Mode]
      ↓ Click "Save"
  [Updated]
```

---

## 💡 Interactive Elements

### Buttons
```
Normal:    [▶️ Start Stream]
Hover:     [▶️ Start Stream]  (darker)
Active:    [▶️ Start Stream]  (scale 0.95)
Disabled:  [▶️ Start Stream]  (gray, cursor-not-allowed)
```

### Input Fields
```
Normal:    [____________]  (gray border)
Focus:     [____________]  (purple border + ring)
Error:     [____________]  (red border)
Success:   [____________]  (green border)
```

### Toggles
```
ON:   [🟢]  Green background
OFF:  [⚪]  Gray background
```

---

## 🎬 Animation Effects

### Loading States
```
⏳  Rotating spinner (360° infinite)
```

### Transitions
```
Button hover:     0.3s ease
Modal appear:     0.2s fade-in
List item add:    0.3s slide-in
```

### Live Indicator
```
🔴  Pulsing animation (1s infinite)
```

---

## 📊 Data Flow Visualization

```
┌──────────────┐
│   User UI    │
└──────┬───────┘
       │
       │ HTTP Request (Axios)
       ↓
┌──────────────┐
│  React API   │
│   Client     │
└──────┬───────┘
       │
       │ /api/overlays
       ↓
┌──────────────┐
│ Flask Backend│
└──────┬───────┘
       │
       │ PyMongo
       ↓
┌──────────────┐
│   MongoDB    │
└──────────────┘

Stream Flow:
RTSP Input → FFmpeg → HLS → Browser
```

---

## 🧩 Component Hierarchy

```
App.jsx
│
├── Player.jsx
│   ├── Stream controls
│   ├── ReactPlayer
│   └── Status display
│
├── OverlayEditor.jsx
│   ├── Form inputs
│   ├── Color picker
│   └── Submit button
│
└── OverlayList.jsx
    └── OverlayItem
        ├── Display mode
        └── Edit mode
```

---

## 🎯 Feature States

### Success Messages
```
┌────────────────────────────────┐
│ ✅ Overlay created successfully!│
└────────────────────────────────┘
```

### Error Messages
```
┌────────────────────────────────┐
│ ⚠️ Failed to start stream      │
│ Make sure FFmpeg is installed  │
└────────────────────────────────┘
```

### Info Messages
```
┌────────────────────────────────┐
│ 💡 Try: rtsp://rtsp.stream    │
│        /pattern                │
└────────────────────────────────┘
```

---

## 🎨 Typography

```
Headings:
  H1: 3rem (48px) - Bold
  H2: 1.5rem (24px) - Semibold
  H3: 1.25rem (20px) - Medium

Body:
  Normal: 1rem (16px)
  Small: 0.875rem (14px)
  Tiny: 0.75rem (12px)

Font Family:
  System: -apple-system, BlinkMacSystemFont, 'Segoe UI'
```

---

## 🖼️ Screenshots Representation

### Landing Page
```
╔════════════════════════════════════════╗
║  🎥 RTSP Livestream App                ║
║  Real-time Streaming with Overlays     ║
╠════════════════════════════════════════╣
║  RTSP URL: [________________]          ║
║  ▶️ Start Stream  ⏹️ Stop Stream      ║
║  ┌──────────────────────────┐         ║
║  │                          │         ║
║  │    Video Player Area     │         ║
║  │                          │         ║
║  └──────────────────────────┘         ║
╚════════════════════════════════════════╝
```

---

This visual guide helps understand the UI/UX design and user interaction flow of the RTSP Livestream App.

**For detailed technical documentation, see:**
- [README.md](README.md)
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- [SETUP_GUIDE.md](SETUP_GUIDE.md)





