import Navigator from "@navigations/Navigator";
import store from "@redux/store";
import { colors } from "@theme/colors";
import React, { JSX, useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import SplashScreen from 'react-native-splash-screen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { NoInternetModal, ServerCheckComp } from "@components/NoInternetConnections";
import { commonStyles } from "@theme/commonStyles";
import { BaseUrlConfig } from "@config/config";


const App = () => {
  useEffect(() => {
    setTimeout(
      () => {
        SplashScreen.hide();
      },
      Platform.OS === 'ios' ? 2000 : 0,
    );

  }, []);

  const [netConnected, setNetConnected] = useState(true);
  const [visible, setVisible] = useState(false);
  const netInfo = useNetInfo();


  useEffect(() => {
    if (!netConnected) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [netConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setNetConnected(state?.isConnected);
    });
    return unsubscribe;
  }, [visible]);

  return (
    <GestureHandlerRootView style={commonStyles.flex}>
      <SafeAreaProvider >
        <Provider store={store}>
          <BottomSheetModalProvider>
            <SafeAreaView style={styles.safeArea} edges={['bottom']}>
              <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
              <NoInternetModal
                visible={!(netInfo.isConnected && netInfo.isInternetReachable)}
              />
               <ServerCheckComp visible={BaseUrlConfig.ENVIRONMENT} />
              <Navigator />
            </SafeAreaView>
          </BottomSheetModalProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors?.white || "#FFFFFF", // use your app's default bg color
  },
});