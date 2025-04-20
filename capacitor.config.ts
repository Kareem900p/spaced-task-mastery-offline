
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.613cc1adbfbd470ca81468b062497fe6',
  appName: 'spaced-task-mastery-offline',
  webDir: 'dist',
  server: {
    url: 'https://613cc1ad-bfbd-470c-a814-68b062497fe6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#2E5BFF"
    }
  }
};

export default config;
