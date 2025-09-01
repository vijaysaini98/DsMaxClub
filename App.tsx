import Navigator from "@navigations/Navigator";
import store from "@redux/store";
import { colors } from "@theme/colors";
import React, { JSX, useEffect } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import SplashScreen from 'react-native-splash-screen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';


const App = () => {
  // useEffect(() => {
  //   setTimeout(
  //     () => {
  //       SplashScreen.hide();
  //     },
  //     Platform.OS === 'ios' ? 2000 : 0,
  //   );

  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider >
        <Provider store={store}>
          {/* <RootComponent> */}
           <BottomSheetModalProvider>
          <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <Navigator />
            {/* </RootComponent> */}
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