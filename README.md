# DRIVEPOINT

**DRIVEPOINT — An automotive-inspired Android navigation and infotainment application.**

## Application — version 0.3.0

Classic OEM-inspired Android navigation system. Map-first, minimal Kia
UVO-inspired screen.

New in 0.3.0: destination selection and route startup reworked — selecting
a search result now obtains a GPS fix if no fix is available, then
calculates the route. Added coordinate validation, clearer routing/search
errors, visible busy feedback, stale-search response protection, and
map-style readiness handling before route rendering. A visible 0.3.0 build
identifier is shown in the settings drawer.

Implemented in 0.2.0:

- Destination search for addresses and points of interest, with selectable
  geocoding results
- Real driving routes drawn on the map using an OSRM-compatible routing
  service, with a next-maneuver panel and route summary while navigating
- Lane guidance when the routing response includes lane-level data
  (valid lanes highlighted; missing lane data is not fabricated)
- Nearby mapped speed-limit and school-zone notices from OpenStreetMap
  road tags
- Separate settings drawer for the marker, follow mode, heading-up, and
  map perspective
- Kept from 0.1.2: custom top-down sedan marker, Capacitor-native GPS
  permission and continuous location watch, follow mode, heading-up,
  2D/3D map controls

Not implemented yet: automatic off-route detection and rerouting, spoken
turn-by-turn guidance, reliable live traffic or camera data, full
speed-limit coverage, saved places, route history, offline maps, Android
Auto, and Android media-session integration.

Requirements: Node.js 22, npm. Map data is OpenStreetMap (ODbL, attribution
required); no Google Maps data or API is used. The development build uses
public OSM-ecosystem endpoints (tiles, Nominatim geocoding, OSRM demo
routing, Overpass API) — not guaranteed production infrastructure, with
usage policies and rate limits. Speed-limit and school-zone notices come
from community-mapped OSM tags and can be missing, stale, or incorrect —
always obey posted signs. GPS speed is device-reported and not a
replacement for a vehicle speedometer.

## How it works

1. ChatGPT writes the application and supplies a complete project ZIP.
2. The ZIP is extracted into the repository root (project files live at the
   root — no extra nested project directory).
3. Pushing to `main` triggers the GitHub Actions workflow
   (`.github/workflows/build-android.yml`), which installs Node.js
   dependencies, builds the React/TypeScript app, generates the Android
   project with `npx cap add android` if it does not exist yet, runs
   `npx cap sync android`, builds a debug APK, and uploads it as a
   downloadable workflow artifact.
4. The APK is downloaded, installed, and tested. Updates arrive as new ZIPs
   and go through the same flow.

## Project layout

```text
drivepoint/
├── package.json            # React/TypeScript app, incl. Capacitor deps
├── capacitor.config.ts     # Capacitor configuration (appId com.drivepoint.navigation)
├── vite.config.ts          # (or equivalent build config)
├── src/                    # React application source
├── public/
├── android/                # Capacitor Android project (generated in CI if missing)
├── CHANGELOG.md
├── .github/workflows/build-android.yml
├── .gitignore
└── README.md
```

## Technology

- React + TypeScript
- Material UI (MUI)
- MapLibre GL JS with OpenStreetMap data
- Capacitor for Android packaging
- Android native integrations when required

## Build workflow

- Runs on every push to `main` and can be started manually from the
  GitHub Actions tab (`workflow_dispatch`).
- Node.js 22, Java 21 (Temurin). The ubuntu runner already includes the
  Android SDK; Gradle runs from inside the `android/` folder.
- Output: `app-debug.apk` as the `drivepoint-debug-apk` artifact.
- A build cannot succeed until the application source code has been
  uploaded — a failed run before then is expected, not a broken workflow.

## Notes

- Do not delete or overwrite the workflow or repository configuration when
  uploading an update ZIP.
- Keep `package.json`, `capacitor.config.ts`, and the `android/` directory
  intact with every update.
