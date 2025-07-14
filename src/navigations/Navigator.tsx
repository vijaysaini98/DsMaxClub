/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import NavigationService from "./NavigationSevice";
import * as React from "react";
import { RootStackScreen } from "./StackNavigation";

// const Stack = createStackNavigator();

// const options = { ...TransitionPresets.SlideFromRightIOS, headerShown: false };


const Navigator = () => {
  return (
    <NavigationContainer
      theme={DarkTheme}
      ref={(navigationRef) => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}
    >
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
