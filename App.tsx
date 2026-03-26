import Navigator from '@navigations/Navigator';
import store from '@redux/store';
import { commonStyles } from '@theme/commonStyles';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import RootComponent from './src/RootComponent';
import useFcm from './src/fcm-service';

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
