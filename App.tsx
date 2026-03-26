import Navigator from '@navigations/Navigator';
import store from '@redux/store';
import { commonStyles } from '@theme/commonStyles';
import React, { useEffect, useState } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import RootComponent from './src/RootComponent';
import useFcm from './src/fcm-service';
import { PermissionsAndroid, Platform } from 'react-native';

const App = () => {
  useFcm({
    onForeground: msg => {
      // Notifee already shows the heads-up banner.
      // Add in-app badge/toast here if needed.
      console.log('🔔 Foreground:', msg);
    },
    onOpened: msg => {
      console.log('📲 Opened:', msg);
      // Navigate based on msg.data?.screen etc.
    },
  });

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), Platform.OS === 'ios' ? 2000 : 0);
  }, []);

  const [netConnected, setNetConnected] = useState(true);

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => {
      setNetConnected(state?.isConnected ?? true);
    });
    return unsub;
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // Android < 13 doesn't need explicit permission
  };
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return (
    <GestureHandlerRootView style={commonStyles.flex}>
      <SafeAreaProvider>
        <Provider store={store}>
          <RootComponent isConnected={netConnected}>
            <Navigator />
          </RootComponent>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
