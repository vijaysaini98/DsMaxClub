import { useEffect, useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import { FCM_TOKEN_KEY, NOTIFICATION_DATA } from '@helper/Constants';

const useFcm1 = (
  onNotification: (n: any) => void,
  onOpenNotification: (n: any) => void,
) => {
  const messageListenerRef = useRef<(() => void) | null>(null);

  const setToken = async (token: string) => {
    console.log('✅ Saving FCM Token:', token);


    await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
  };

  const setData = async (data: any) => {
    
    await AsyncStorage.setItem(NOTIFICATION_DATA, JSON.stringify(data));
  };

  const getToken = async () => {
    try {
       console.log("Getting FCM Token...");
      const fcmToken = await messaging().getToken();
      console.log('✅ FCM Token:', fcmToken);
      if (fcmToken) {
        await setToken(fcmToken);
      }
    } catch (error) {
      console.log('[FCM] getToken error:', error);
    }
  };

  const registerAppWithFCM = async () => {
    console.log("4. registerAppWithFCM");
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }
    await getToken();
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      await registerAppWithFCM();
    } catch {
      Alert.alert(
        'Notification Permission Required',
        'Please allow notification permission to receive updates.',
        [{ text: 'OK', onPress: requestPermission }],
      );
    }
  };

  // const checkPermission = async () => {
  //   try {
  //     const enabled = await messaging().hasPermission();
  //     if (
  //       enabled === messaging.AuthorizationStatus.AUTHORIZED ||
  //       enabled === messaging.AuthorizationStatus.PROVISIONAL
  //     ) {
  //       await registerAppWithFCM();
  //     } else {
  //       await requestPermission();
  //     }
  //   } catch {
  //     await requestPermission();
  //   }
  // };
  const checkPermission = async () => {
    console.log("2. checkPermission called");
  try {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Permission Status:', authStatus);

    if (enabled) {
      await registerAppWithFCM();
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.log('Permission Error:', error);
  }
};

  const createNotificationListeners = () => {
    // 1. App opened from BACKGROUND by tapping notification
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('[FCM] Opened from background:', remoteMessage);
      if (remoteMessage) onOpenNotification(remoteMessage);
    });

    // 2. App opened from QUIT STATE by tapping notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('[FCM] Opened from quit state:', remoteMessage);
        if (remoteMessage) onOpenNotification(remoteMessage);
      });

    // 3. FOREGROUND message
    messageListenerRef.current = messaging().onMessage(async remoteMessage => {
      console.log('[FCM] Foreground message:', remoteMessage);
      if (remoteMessage) onNotification(remoteMessage);
    });

    // 4. Token refresh
    messaging().onTokenRefresh(fcmToken => {
      console.log('[FCM] Token refreshed:', fcmToken);
      setToken(fcmToken);
    });
  };

  useEffect(() => {
    console.log("1. useEffect called");
    checkPermission();
    createNotificationListeners();

    return () => {
          console.log("Cleanup");
      if (messageListenerRef.current) {
        messageListenerRef.current();
        messageListenerRef.current = null;
      }
    };
  }, []);

  return { setData };
};

export default useFcm1;
