/* eslint-disable react/no-unstable-nested-components */
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationService from "./NavigationSevice";
import * as routes from "./routes";
import * as React from "react";
import { TransitionPresets } from "@react-navigation/stack";
import { OnboardingScreen } from "@screens/auth/Onbording";
import Login from "@screens/auth/login";
// import { OnboardingScreen } from "@screens/onboard";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const options = { ...TransitionPresets.SlideFromRightIOS, headerShown: false };

// const TabIcon = ({ focused, icon, title }: any) =>
//   focused ? (
//     <View style={commonStyles.tabFocused}>
//       <AppText color={WHITE} weight={MEDIUM}>
//         {title}
//       </AppText>
//     </View>
//   ) : (
//     <View style={{}}>
//       <Image source={icon} style={commonStyles.tabIcon} resizeMode="contain" />
//     </View>
//   );

const MyAuthLoadingStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_STACK}
      component={AuthStack}
    />

  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name={routes.ONBOARDING} component={OnboardingScreen} />
    
    <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} /> 
  </Stack.Navigator>
);

// function MrBottomNavigation() {
//   return (
//     <Tab.Navigator
//       initialRouteName={routes.MR_HOME_SCREEN}
//       backBehavior={"history"}
//       screenOptions={{
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           backgroundColor: colors.tabBg,
//           height: 70,
//           borderTopWidth: 0,
//           paddingTop: 15,
//           paddingHorizontal: universalPaddingHorizontal,
//         },

//         tabBarIconStyle: {},
//         tabBarAllowFontScaling: false,
//         tabBarShowLabel: true,
//         tabBarLabelStyle: {},
//         tabBarActiveTintColor: colors.buttonBg,
//         tabBarInactiveTintColor: colors.black,
//       }}
//     >
//       <Tab.Screen
//         name={routes.MR_APPOINTMENT_SCREEN}
//         options={{
//           tabBarLabel: "",
//           tabBarIcon: ({ focused }) => (
//             <TabIcon
//               focused={focused}
//               icon={tabAppointment}
//               title={"My Appointments"}
//             />
//           ),
//         }}
//         component={Appointment}
//       />

//       <Tab.Screen
//         name={routes.MR_HOME_SCREEN}
//         options={{
//           tabBarLabel: "",
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={tabHome} title={"Home"} />
//           ),
//         }}
//         component={Home}
//       />
//       <Tab.Screen
//         name={routes.MR_MORE_SCREEN}
//         options={{
//           tabBarLabel: "",
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={tabMore} title={"More"} />
//           ),
//         }}
//         component={MoreScreen}
//       />
//     </Tab.Navigator>
//   );
// }

// function DrBottomNavigation() {
//   const dispatch = useAppDispatch();
//   return (
//     <Tab.Navigator
//       initialRouteName={routes.DR_HOME_SCREEN}
//       backBehavior={"history"}
//       screenOptions={{
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           backgroundColor: colors.tabBg,
//           height: 70,
//           borderTopWidth: 0,
//           paddingTop: 15,
//           paddingHorizontal: universalPaddingHorizontal,
//         },

//         tabBarIconStyle: {},
//         tabBarAllowFontScaling: false,
//         tabBarShowLabel: true,
//         tabBarLabelStyle: {},
//         tabBarActiveTintColor: colors.buttonBg,
//         tabBarInactiveTintColor: colors.black,
//       }}
//     >
//       <Tab.Screen
//         name={routes.DR_APPOINTMENT_SCREEN}
//         options={{
//           tabBarLabel: "",
//           tabBarIcon: ({ focused }) => (
//             <TabIcon
//               focused={focused}
//               icon={tabAppointment}
//               title={"My Appointments"}
//             />
//           ),
//         }}
//         listeners={({ navigation, route }) => ({
//           tabPress: (e) => {
//             dispatch(SectionListChangeDrTabScreen(0));
//           },
//         })}
//         component={DoctorAppointment}
//       />

//       <Tab.Screen
//         name={routes.DR_HOME_SCREEN}
//         options={{
//           tabBarLabel: "",
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={tabHome} title={"Home"} />
//           ),
//         }}
//         component={DoctorHome}
//       />
//       <Tab.Screen
//         name={routes.DOCTOR_MORE_SCREEN}
//         options={{
//           tabBarLabel: "",
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={tabMore} title={"More"} />
//           ),
//         }}
//         component={DoctorMoreScreen}
//       />
//     </Tab.Navigator>
//   );
// }

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_STACK}
      component={MyAuthLoadingStack}
    />
  </Stack.Navigator>
);

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
