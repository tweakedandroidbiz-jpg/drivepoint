# DRIVEPOINT

**DRIVEPOINT — An automotive-inspired Android navigation and infotainment application.**

## Status

Repository infrastructure is ready. The application source code has not been
uploaded yet — this repo is waiting for the first complete DRIVEPOINT project
ZIP from ChatGPT.

## Technology

- React + TypeScript
- Material UI (MUI)
- MapLibre GL JS with OpenStreetMap data
- Capacitor for Android packaging
- Android native integrations when required

## How it works

1. ChatGPT writes the application and supplies a complete project ZIP.
2. The ZIP is extracted into the repository root (project files live at the
   root — no extra nested project directory).
3. Pushing to `main` triggers the GitHub Actions workflow
   (`.github/workflows/build-android.yml`), which installs Node.js
   dependencies, builds the React/TypeScript app, runs
   `npx cap sync android`, builds a debug APK, and uploads it as a
   downloadable workflow artifact.
4. The APK is downloaded, installed, and tested. Updates arrive as new ZIPs
   and go through the same flow.

## Expected project layout (after the first ZIP)

```text
drivepoint/
├── package.json            # React/TypeScript app, incl. Capacitor deps
├── capacitor.config.ts     # Capacitor configuration
├── vite.config.ts          # (or equivalent build config)
├── src/                    # React application source
├── public/
├── android/                # Capacitor Android project (gradlew, app/, ...)
├── .github/workflows/build-android.yml
├── .gitignore
└── README.md
```

## Build workflow

- Runs on every push to `main` and can be started manually from the
  GitHub Actions tab (`workflow_dispatch`).
- Node.js 20 LTS, Java 17 (Temurin).
- Output: `app-debug.apk` as the `drivepoint-debug-apk` artifact.
- A build cannot succeed until the application source code has been
  uploaded — a failed run before then is expected, not a broken workflow.

## Notes

- Do not delete or overwrite the workflow or repository configuration when
  uploading an update ZIP.
- Keep `package.json`, `capacitor.config.ts`, and the `android/` directory
  intact with every update.
