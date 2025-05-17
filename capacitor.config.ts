import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mbuilder.mbuilder',
  appName: 'mbuilder',
  webDir: 'dist',
    server: {
    url: 'http://192.168.1.23:8000',
    cleartext: true
  }
};

export default config;
