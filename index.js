import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';

// ─── Android channel (must exist before any notification fires) ───────────────
notifee.createChannel({
  id: 'default',
  name: 'Default Notifications',
  importance: AndroidImportance.HIGH,
  vibration: true,
  sound: 'default',
});

// ─── Background + Kill-state handler (registered BEFORE AppRegistry) ─────────
// FCM delivers here for both states on Android.
// No UI updates allowed — only logic + notifee display.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[FCM] Background/Kill:', remoteMessage);

  const data = remoteMessage.data ?? {};
  const title =
    remoteMessage.notification?.title ??
    data.title ??
    data.notificationTitle ??
    data.subject ??
    'New notification';
  const body =
    remoteMessage.notification?.body ??
    data.body ??
    data.message ??
    data.msg ??
    'You have a new update';

  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      smallIcon: 'ic_notification', // must exist in android/app/src/main/res/drawable/
      pressAction: { id: 'default' },
      showTimestamp: true,
    },
  });
});

// ─── Notifee background press events ─────────────────────────────────────────
notifee.onBackgroundEvent(async ({ type, detail }) => {
  // EventType.PRESS = 1
  if (type === 1) {
    console.log('[Notifee] Background press:', detail.notification?.data);
    // Safe to store data in AsyncStorage here for the app to read on open
  }
});

AppRegistry.registerComponent(appName, () => App);
