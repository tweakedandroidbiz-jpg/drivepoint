import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.drivepoint.navigation',
  appName: 'DRIVEPOINT',
  webDir: 'dist',
  android: {
    allowMixedContent: false
  }
};

export default config;
