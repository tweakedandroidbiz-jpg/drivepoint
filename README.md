# DRIVEPOINT

**DRIVEPOINT — An automotive-inspired Android navigation and infotainment application.**

## Application — version 0.1.0

Development scaffold. An automotive-inspired Android navigation app with a
classic 2010–2017 Material Design / OEM infotainment look.

Included in 0.1.0:

- React + TypeScript + Material UI
- MapLibre map view with OpenStreetMap raster tiles (with attribution)
- Basic map controls and 2D/3D pitch toggle
- Browser geolocation centering
- Classic dark automotive UI shell
- Capacitor Android configuration

Planned, not implemented yet: destination search and geocoding, routing and
turn-by-turn guidance, GPS speed and trip computer, speed-limit awareness,
road alerts, route simulation, voice guidance, media-session controls,
saved destinations, and offline maps.

Requirements: Node.js 22, npm. Map data is OpenStreetMap (ODbL, attribution
required); no Google Maps data or API is used.

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
- Node.js 22, Java 21 (Temurin), Android SDK set up in the runner.
- Output: `app-debug.apk` as the `drivepoint-debug-apk` artifact.
- A build cannot succeed until the application source code has been
  uploaded — a failed run before then is expected, not a broken workflow.

## Notes

- Do not delete or overwrite the workflow or repository configuration when
  uploading an update ZIP.
- Keep `package.json`, `capacitor.config.ts`, and the `android/` directory
  intact with every update.
