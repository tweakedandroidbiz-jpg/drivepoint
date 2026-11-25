# Changelog

## 0.2.0 — OEM map and navigation foundation
- Replaced the crowded map dashboard with a minimal Kia UVO-inspired map-first screen.
- Added a single destination search bar for addresses and points of interest, with selectable geocoding results.
- Added real driving-route requests and route drawing using OSRM-compatible routing.
- Added a compact next-maneuver panel and route summary while a route is active.
- Added lane guidance when the routing response includes lane-level intersection data; valid lanes are highlighted.
- Added nearby mapped speed-limit and school-zone restriction notices from OpenStreetMap road tags.
- Moved vehicle marker and map behavior preferences into a separate settings drawer.
- Removed the permanent trip meter, position/road dashboard, media panel, and excess home-screen controls.
- Preserved the custom top-down sedan marker, GPS location, follow mode, heading-up, and 2D/3D map controls.
- Added explicit caveats for incomplete community road data and unavailable lane/speed-limit information.

## 0.1.2
- Full-screen MapLibre map with floating OEM-style controls.
- Original top-down sedan marker is the default; optional arrow marker preference persists.
- Capacitor-native GPS permission, one-shot location and continuous watch.
- Follow mode, heading-up option, zoom controls and 2D/3D perspective.
- Device GPS speed, estimated session distance, elapsed time and maximum observed GPS speed.
- Retained Android packaging configuration and GitHub Actions APK workflow.
