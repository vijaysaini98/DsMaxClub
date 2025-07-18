import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import * as routes from './routes'
import { OnboardingScreen } from "@screens/auth/Onbording";
import Login from "@screens/auth/login";
import ForgotPassword from "@screens/auth/forgotPassword";
import Verification from "@screens/auth/verification";
import ResetPassword from "@screens/auth/restPassword";
import SingUp from "@screens/auth/singUp";
import BottomNavigation from "./BottomNavigation";
import Home from "@screens/home";
import BottomNavigationVendor from "./BottomNavigationVendor";

const Stack = createStackNavigator();

const options = { ...TransitionPresets.SlideFromRightIOS, headerShown: false };


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
    {/* <Stack.Screen name={routes.HOME_SCREEN} component={Home} /> */}

    <Stack.Screen name={routes.ONBOARDING} component={OnboardingScreen} />
    <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} />
    <Stack.Screen name={routes.FORGOT_PASSWORD_SCREEN} component={ForgotPassword} />
    <Stack.Screen name={routes.VERIFICATION_SCREEN} component={Verification} />
    <Stack.Screen name={routes.RESET_PASSWORD_SCREEN} component={ResetPassword} />
     <Stack.Screen name={routes.SIGNUP_SCREEN} component={SingUp} />
     {/* <Stack.Screen name={routes.BOTTOM_TAB_NAVIGATOR} component={BottomNavigation}/> */}
     <Stack.Screen name={routes.BOTTOM_TAB_NAVIGATOR} component={BottomNavigationVendor}/>
  </Stack.Navigator>
);


export const RootStackScreen = () => (
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