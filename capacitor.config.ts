import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mbuilder.mbuilder',
  appName: 'mbuilder',
  webDir: 'dist',
    server: {
    url: 'http://www.mbuilder.es/',
    cleartext: true
  }
};

export default config;
