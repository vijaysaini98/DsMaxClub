import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from "@react-navigation/stack";
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
import BottomNavigationVendor from "./BottomNavigationVendor";
import RedeemSuccessfull from "@screens/scan/redeemSuccessfull";
import Details from "@screens/detail";
import UserRedeemSucessfull from "@screens/myCard/redeemSucessfull";
import MyRequest from "@screens/myRequest";
import RequestCouponList from "@screens/myRequest/requestCouponList";
import MyCardCouponList from "@screens/myCard/myCardCouponList";
import PrivacyPolicy from "@screens/privacyPolicy";
import TermCondition from "@screens/termCondition";
import CouponList from "@screens/myCard/couponList";
import VerndorCouponList from "@screens/deals/vendorCoupon";
import UserList from "@screens/deals/userList";
import { Platform } from "react-native";
import BottomNavigationExecutive from "./BottomNavigationExecutive";
import RequestApprove from "@screens/request/ui/requestApprove";
import HotelBooking from "@screens/hotelTravelBooking.tsx/hotelBooking";
import TravelBooking from "@screens/hotelTravelBooking.tsx/travelBooking";
import OptionsScreen from "@screens/auth/optionsScreen";
import Cart from "@screens/cart";
import LoginType from "@screens/auth/loginType";
import RequestSuccessfull from "@screens/detail/ui/requestSuccessful";
import ReportScreen from "@screens/report";
import ComboDetailList from "@screens/home/comboDetailList";
import MyCardComboOfferList from "@screens/myCard/myCardComboOfferList";
import Checkout from "@screens/checkout";
import MyCard from "@screens/myCard";
import MyOrders from "@screens/myOrders";
import Requests from "@screens/request";
import Home from "@screens/home";
import RefundPolicy from "@screens/refundScreen";

const Stack = createStackNavigator();

const options = {
  ...TransitionPresets.SlideFromRightIOS,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: Platform.OS == 'ios' ? true : false,
  // gestureDirection: 'horizontal',
  headerShown: false
};




export const MyAuthLoadingStack = () => (
  <Stack.Navigator    
  screenOptions={options}>
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_SCREEN}
      component={AuthLoading}
    />
    <Stack.Screen name={routes.ONBOARDING} component={OnboardingScreen} />
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_STACK}
      component={AuthStack}
    />
    <Stack.Screen name={routes.BOTTOM_TAB_NAVIGATOR} component={BottomNavigation} />
    <Stack.Screen name={routes.BOTTOM_TAB_NAVIGATOR_VENDOR} component={BottomNavigationVendor} />
    <Stack.Screen name={routes.BOTTOM_TAB_NAVIGATOR_EXECUTIVE} component={BottomNavigationExecutive} />
    <Stack.Screen name={routes.HOME_SCREEN} component={Home} />
    <Stack.Screen name={routes.CATEGORIES_SCCREEN} component={Categories} />
    <Stack.Screen name={routes.CATEGORIES_LIST_SCCREEN} component={CategoriesList} />
    <Stack.Screen name={routes.EDIT_PROFILE_SCREEN} component={EditProfile} />
    <Stack.Screen name={routes.DETAILS_SCREEN} component={Details} />
    <Stack.Screen name={routes.COMBO_OFFER_LIST_SCREEN} component={ComboDetailList} />
    <Stack.Screen name={routes.MY_CARD_COMBO_OFFERS_LIST_SCREEN} component={MyCardComboOfferList} />
    <Stack.Screen name={routes.REPORT_SCREEN} component={ReportScreen} />
    <Stack.Screen name={routes.MY_CARD_SCREEN} component={MyCard} />
    <Stack.Screen name={routes.MY_CARD_COUPON_LIST_SCREEN} component={MyCardCouponList} />
    <Stack.Screen name={routes.COUPON_LIST_SCREEN} component={CouponList} />
    <Stack.Screen name={routes.MY_REQUEST_SCREEN} component={MyRequest} />
    <Stack.Screen name={routes.REQUEST_SCREEN} component={Requests} />
    <Stack.Screen name={routes.REQUEST_COUPON_LIST_SCREEN} component={RequestCouponList} />
    <Stack.Screen name={routes.REDEEM_SUCCESSFULL_SCREEN_USER} component={UserRedeemSucessfull} />
    <Stack.Screen name={routes.REDEEM_SUCCESSFULL_SCREEN} component={RedeemSuccessfull} />
    <Stack.Screen name={routes.PRIVACY_POLICY_SCREEN} component={PrivacyPolicy} />
    <Stack.Screen name={routes.TERMS_CONDITION_SCREEN} component={TermCondition} />
    <Stack.Screen name={routes.REFUND_POLICY_SCREEN} component={RefundPolicy} />
    <Stack.Screen name={routes.VENDOR_COUPON_LIST} component={VerndorCouponList} />
    <Stack.Screen name={routes.VENDOR_USER_LIST} component={UserList} />
    <Stack.Screen name={routes.EXECUTIVE_REQUEST_APPROVE} component={RequestApprove} />
    <Stack.Screen name={routes.HOTEL_BOOKING} component={HotelBooking} />
    <Stack.Screen name={routes.TRAVEL_BOOKING} component={TravelBooking} />
    <Stack.Screen name={routes.CART_SCREEN} component={Cart} />
  <Stack.Screen name={routes.REQUEST_SUCCESSFUL_SCREEN} component={RequestSuccessfull} />
    <Stack.Screen name={routes.CHECKOUT_SCREEN} component={Checkout} />
    <Stack.Screen name={routes.MY_ORDERS_SCREEN} component={MyOrders} />


  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name={routes.LOGIN_TYPE_SCREEN} component={LoginType} />
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