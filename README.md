# DRIVEPOINT

**DRIVEPOINT — An automotive-inspired Android navigation and infotainment application.**

## Application — version 0.1.2

Classic OEM-inspired Android navigation foundation.

Implemented in 0.1.2:

- Full-screen MapLibre map with floating OEM-style controls
- Original top-down sedan marker as the default; optional direction-arrow
  marker preference persists locally
- Capacitor-native GPS permission, one-shot location and continuous watch
  (with browser fallback)
- Follow mode, heading-up option, zoom controls and 2D/3D perspective
- Device GPS speed, estimated session distance, elapsed time and maximum
  observed GPS speed

Not implemented yet: destination search and geocoding, routing and
turn-by-turn guidance, verified road identification, speed limits, live
road alerts, Android media-session controls, saved trip history, Smart
Arrival, offline maps and route simulation. Menu references to these are
informational placeholders.

Requirements: Node.js 22, npm. Map data is OpenStreetMap (ODbL, attribution
required); no Google Maps data or API is used. GPS speed is device-reported
and may be unavailable — it is not a replacement for a vehicle speedometer.
Trip distance is a phone-location estimate, not odometer data.

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
