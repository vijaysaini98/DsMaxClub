import BottomNavigation from "@navigations/BottomNavigation";
import NavigationService from "@navigations/NavigationService";
import { useAppDispatch } from "@redux/hooks";
import { Access_Token, getItem, USER_ID, USER_TYPE } from "@services/storage";
import { useEffect } from "react";
import * as routes from '@navigations/routes'
import { height } from "@utils/index";
import { AppSafeAreaView } from "@components/AppSafeAreaView";
import { colors } from "@theme/colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getCityList, userProfile } from "@actions/auth/authAction";




const AuthLoading = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      bootstrapAsync();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const bootstrapAsync = async () => {
    try {
      // const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
      // const loginType = await AsyncStorage.getItem(LOGIN_TYPE);
      const customerToken = await getItem(Access_Token)
      const userId = await getItem(USER_ID)
      const loginType = await getItem(USER_TYPE)
      if (customerToken) {
        dispatch(userProfile({userid:userId}))
        dispatch(getCityList())
        NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR)
      } else {
        NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppSafeAreaView style={{
    alignItems: "center",
    flex:1,
    backgroundColor: colors.white,
    justifyContent:'center'
  }}>
      {/* <View style={}> */}
        <ActivityIndicator size={"large"} color={colors.buttonBg}/>
      {/* </View> */}
    </AppSafeAreaView>
  );
};

export default AuthLoading;

// const styles = StyleSheet.create({
//   topContainer: {
//     alignItems: "center",
//     flexGrow: 1,
//     backgroundColor: "white",
//   },
