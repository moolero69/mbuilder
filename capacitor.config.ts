import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mbuilder.mbuilder',
  appName: 'mbuilder',
  webDir: 'dist',
    server: {
    url: 'http://mbuilder.es/',
    cleartext: true
  }
};

export default config;
