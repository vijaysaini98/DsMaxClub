import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import * as routes from './routes'
import { OnboardingScreen } from "@screens/auth/Onbording";
import Login from "@screens/auth/login";
import ForgotPassword from "@screens/auth/forgotPassword";
import Verification from "@screens/auth/verification";
import ResetPassword from "@screens/auth/restPassword";
import SingUp from "@screens/auth/singUp";
import BottomNavigation from "./BottomNavigation";
import AuthLoading from "@screens/auth/authLoading";
import EditProfile from "@screens/profile/editProfile";
import Categories from "@screens/categories";
import CategoriesList from "@screens/categories/categoriesList";


const Stack = createStackNavigator();

const options = { ...TransitionPresets.SlideFromRightIOS, headerShown: false };


const MyAuthLoadingStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_SCREEN}
      component={AuthLoading}
    />
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_STACK}
      component={AuthStack}
    />
<Stack.Screen name={routes.BOTTOM_TAB_NAVIGATOR} component={BottomNavigation}/>
<Stack.Screen name={routes.CATEGORIES_SCCREEN} component={Categories}/>
<Stack.Screen name={routes.CATEGORIES_LIST_SCCREEN} component={CategoriesList}/>
<Stack.Screen name={routes.EDIT_PROFILE_SCREEN} component={EditProfile}/>
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name={routes.ONBOARDING} component={OnboardingScreen}/>
    <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} />
    <Stack.Screen name={routes.FORGOT_PASSWORD_SCREEN} component={ForgotPassword} />
    <Stack.Screen name={routes.VERIFICATION_SCREEN} component={Verification} />
    <Stack.Screen name={routes.RESET_PASSWORD_SCREEN} component={ResetPassword} />
     <Stack.Screen name={routes.SIGNUP_SCREEN} component={SingUp} />
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