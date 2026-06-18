# 🕌 Taj Mahal 3D Explorer

An interactive 3D visualization of the Taj Mahal with immersive zoom, pan, and interior exploration features.

## ✨ Features

### 🏛️ Exterior Exploration
- Full 3D model of Taj Mahal with detailed architecture
- Main dome with golden spire
- Four beautiful minarets with intricate details
- Marble base with decorative steps
- Ornate front door with golden handle
- Geometric gem decorations on the door
- Surrounding garden with flowers and decorative elements

### 🔍 Interactive Controls
- **Zoom In/Out**: Scroll mouse wheel to zoom smoothly  
- **Rotate Camera**: Click and drag to rotate around the structure
- **Pan Camera**: Use WASD keys to move around
- **Auto Rotation**: Camera automatically rotates when idle

### 🚪 Interior Exploration
- Click the front door or press ENTER when near it to enter
- Beautiful interior palace chamber with high ceilings
- Ornate pillars and decorative capitals
- Intricate floor patterns with checkerboard design
- Golden ceiling with ambient lighting
- Central monument chamber
- Scattered jewels and gemstones
- Professional interior lighting with spotlights

### 📍 HUD Information
- Current location (Exterior/Interior)
- Exploration mode
- Zoom level
- Distance from structure
- Real-time FPS counter
- Camera position coordinates
- Object count

## 🎮 How to Use

### Starting the Application
- Open `index.html` in your web browser
- The Taj Mahal will load with auto-rotating camera

### Exploring the Exterior
```
Mouse Drag      → Rotate camera around the monument
Scroll Wheel    → Zoom in/out for detailed views
W/A/S/D Keys    → Move camera in any direction
Arrow Keys      → Alternative movement controls
R Key           → Reset camera to default position
```

### Entering the Palace
```
Click the Door  → Directly click on the wooden door
Press ENTER     → Enter when within proximity to door
Door Prompt     → Yellow message appears when close enough
```

### Interior Exploration
```
Mouse Drag      → Rotate camera inside
Scroll Wheel    → Zoom in/out to see details
W/A/S/D Keys    → Walk around the chamber
R Key           → Reset camera position inside
ESC Key         → Exit and return to exterior
```

### Exiting the Palace
```
Press ESC       → Instantly exit to exterior view
```

## 🛠️ Technical Details

### Architecture
- **3D Engine**: Three.js (WebGL)
- **Interaction**: Custom camera controls
- **Lighting**: Directional sun light + point lights
- **Materials**: PBR (Physically Based Rendering)
- **Shadows**: Real-time shadow mapping
- **Performance**: Optimized for 60 FPS

### Key Components

#### Exterior Elements
- Main dome (icosphere)
- Four minarets (cylinders with conical tops)
- Platform base with 5-level steps
- Four walls with window openings
- Decorative gems and jewels
- Flower garden surrounding the base

#### Interior Elements
- Large chamber with textured walls
- Checkerboard floor pattern
- Golden ceiling
- 8 ornate pillars with capitals
- Central monument pedestal
- 100+ scattered gemstones
- Advanced lighting system

#### Interactive Features
- Raycasting for door detection
- Smooth camera animations
- Keyboard input handling
- Mouse-based rotation and zoom
- Auto-rotation when idle
- Real-time HUD updates

## 🌐 Browser Compatibility

✅ Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Opera

## ⚡ Performance Considerations

- **Optimized mesh geometry** for smooth performance
- **Level of Detail (LOD)** with proper material settings
- **Efficient lighting** with shadow mapping
- **Culling** of interior objects when viewing exterior
- **Real-time FPS counter** for performance monitoring

## 💡 Tips for Best Experience

1. **Start with exterior view** - Use smooth zoom and rotation to appreciate the details
2. **Get closer to the door** - Yellow prompt will appear when within range
3. **Explore interior thoroughly** - Walk around to see all the beautiful details
4. **Use zoom feature** - Both exterior and interior have beautiful details at various scales
5. **Let it auto-rotate** - Don't touch the mouse for a few seconds to see the automatic rotation

## 📁 File Structure

```
Taj-mahal/
├── index.html           # Main HTML structure and styling
├── taj-mahal.js         # 3D model generation and controls
└── README.md            # This file
```

## 🎨 Features Breakdown

### Visual Effects
- ✨ Shiny golden spire
- 💎 Decorative gemstones with emission
- 🎨 Marble and sandstone textures
- 🌟 Real-time shadow mapping
- 🎯 Fog effect for depth perception

### Interaction Features
- 🖱️ Smooth mouse-based camera control
- ⌨️ Keyboard navigation
- 🎮 Raycasting for object selection
- 📊 Live performance metrics
- 🎬 Smooth camera animations

### Architectural Details
- 4 functional minarets
- 1 main dome with spire
- Ornate wooden front door
- Golden decorative elements
- Indoor monument chamber
- Professional interior lighting

## 🎨 Customization

You can easily customize:
- Camera speed: Modify `cameraSpeed` in taj-mahal.js
- Auto-rotate speed: Adjust `autoRotateSpeed`
- Colors: Change material colors (0xRRGGBB hex values)
- Lighting: Modify light positions and intensities
- Structure size: Scale geometry dimensions

## 📚 Credits

Built with **Three.js** - A JavaScript 3D library

Inspired by the architectural beauty of the Taj Mahal, Agra, India

---

**Enjoy exploring the Taj Mahal! 🕌✨**

For issues or suggestions, feel free to create an issue in the repository.

## 🚀 Getting Started Quickly

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring!

No installation or build process required - it runs directly in your browser!
