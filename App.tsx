import Navigator from '@navigations/Navigator';
import store from '@redux/store';
import { colors } from '@theme/colors';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import { commonStyles } from '@theme/commonStyles';
import RootComponent from './src/RootComponent';
import useFcm from 'src/FcmService';

const App = () => {
  // ─── FCM ─────────────────────────────────────────────────────
  useFcm(
    notification => {
      // ✅ Foreground notification received
      console.log('🔔 Notification received (foreground):', notification);
      // TODO: show in-app toast / modal here
    },
    notification => {
      // ✅ Notification tapped → app opened
      console.log('📲 Notification opened:', notification);
      // TODO: navigate to specific screen based on notification.data
    },
  );

  // ─── Splash screen ────────────────────────────────────────────
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), Platform.OS === 'ios' ? 2000 : 0);
  }, []);

  // ─── Network state ────────────────────────────────────────────
  const [netConnected, setNetConnected] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!netConnected);
  }, [netConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setNetConnected(state?.isConnected ?? true);
    });
    return unsubscribe;
  }, []);

  // ─── Render ───────────────────────────────────────────────────
  return (
    <GestureHandlerRootView style={commonStyles.flex}>
      <SafeAreaProvider>
        <Provider store={store}>
          <RootComponent>
            <Navigator />
          </RootComponent>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors?.white || '#FFFFFF',
  },
});
