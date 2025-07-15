import Navigator from "@navigations/Navigator";
import store from "@redux/store";
import React, { JSX, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
    <SafeAreaProvider>
      <Provider store={store}>
        {/* <RootComponent> */}
          <Navigator />
        {/* </RootComponent> */}
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
