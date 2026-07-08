/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import NavigationService from "./NavigationService";
import * as React from "react";
import { MyAuthLoadingStack, RootStackScreen } from "./StackNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { getMaintenanceStatus } from "@actions/auth/authAction";
import { useAppDispatch } from "@redux/hooks";

const Stack = createStackNavigator();

// const options = { ...TransitionPresets.SlideFromRightIOS, headerShown: false };


const Navigator = () => {
 const dispatch = useAppDispatch()

  return (
    <NavigationContainer
      theme={DarkTheme}
      ref={(navigationRef) => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}
       onReady={() => {
        dispatch(getMaintenanceStatus());
      }}
      onStateChange={() => {
        dispatch(getMaintenanceStatus());
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="MyAuthLoadingStack"
          component={MyAuthLoadingStack}
        />
      </Stack.Navigator>
      {/* <RootStackScreen /> */}
      {/* <MyAuthLoadingStack/> */}
    </NavigationContainer>
  );
};

export default Navigator;
