// index.js
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

// ✅ MUST be here — not inside App.tsx
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[FCM] Background message:', remoteMessage);
  // Handle background data here (no UI updates — app is in background)
});

AppRegistry.registerComponent(appName, () => App);
