import Navigator from "@navigations/Navigator";
import store from "@redux/store";
import { colors } from "@theme/colors";
import React, { JSX } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

function App(): JSX.Element {


  // useEffect(() => {
  //   onAppStart(store);
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 2000);
  //   checkApplicationPermission();
  // }, []);

  // const checkApplicationPermission = async () => {
  //   if (Platform.OS === "android") {
  //     try {
  //       await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //       );
  //     } catch (error) {
  //       console.log("error::::::", error);
  //     }
  //   }
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider >
        <Provider store={store}>
          {/* <RootComponent> */}
          <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <Navigator />
            {/* </RootComponent> */}
          </SafeAreaView>
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