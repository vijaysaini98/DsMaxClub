import { useEffect, useRef } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { EventType } from '@notifee/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { FCM_TOKEN_KEY } from '@helper/Constants';

type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;

export type FcmHandlers = {
  onForeground?: (msg: RemoteMessage) => void;
  onOpened?: (msg: RemoteMessage) => void;
};

// ─── Token helpers ────────────────────────────────────────────────────────────
async function saveToken(token: string) {
  await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
  console.log('[FCM] Token:', token);
}

async function fetchAndSaveToken() {
  try {
    const token = await messaging().getToken();
    if (token) await saveToken(token);
  } catch (e) {
    console.warn('[FCM] getToken error:', e);
  }
}

// ─── Display via Notifee (foreground only — background handled in index.js) ──
async function showNotification(msg: RemoteMessage) {
  await notifee.displayNotification({
    title: msg.notification?.title ?? '',
    body: msg.notification?.body ?? '',
    data: msg.data ?? {},
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      smallIcon: 'ic_notification',
      pressAction: { id: 'default' },
      showTimestamp: true,
    },
  });
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
const useFcm = ({ onForeground, onOpened }: FcmHandlers = {}) => {
  const unsubFcm = useRef<(() => void) | null>(null);
  const unsubNotifee = useRef<(() => void) | null>(null);

  const requestPermission = async (): Promise<boolean> => {
    const status = await messaging().requestPermission();
    return (
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const ensurePermission = async (): Promise<boolean> => {
    const current = await messaging().hasPermission();
    if (
      current === messaging.AuthorizationStatus.AUTHORIZED ||
      current === messaging.AuthorizationStatus.PROVISIONAL
    )
      return true;

    const granted = await requestPermission();
    if (!granted) {
      Alert.alert(
        'Notifications off',
        'Turn on notifications in Settings to receive updates.',
      );
    }
    return granted;
  };

  useEffect(() => {
    (async () => {
      const allowed = await ensurePermission();
      if (!allowed) return;

      // 1. Fetch + save token
      await fetchAndSaveToken();

      // 2. Token refresh
      const unsubRefresh = messaging().onTokenRefresh(saveToken);

      // 3. Foreground FCM → display via Notifee
      unsubFcm.current = messaging().onMessage(async msg => {
        console.log('[FCM] Foreground:', msg);
        await showNotification(msg);
        onForeground?.(msg);
      });

      // 4. Foreground Notifee press (user taps while app is open)
      unsubNotifee.current = notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS && detail.notification) {
          console.log('[Notifee] Foreground press:', detail.notification.data);
          onOpened?.({
            messageId: detail.notification.id,
            data: detail.notification.data as Record<string, string>,
            notification: {
              title: detail.notification.title,
              body: detail.notification.body,
            },
          } as RemoteMessage);
        }
      });

      // 5. Background tap → app foregrounded
      messaging().onNotificationOpenedApp(msg => {
        console.log('[FCM] Opened from background:', msg);
        onOpened?.(msg);
      });

      // 6. Kill-state tap → app opened fresh
      messaging()
        .getInitialNotification()
        .then(msg => {
          if (msg) {
            console.log('[FCM] Opened from kill state:', msg);
            onOpened?.(msg);
          }
        });

      return unsubRefresh;
    })();

    return () => {
      unsubFcm.current?.();
      unsubNotifee.current?.();
    };
  }, []);
};

export default useFcm;
