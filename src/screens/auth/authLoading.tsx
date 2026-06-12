import NavigationService from '@navigations/NavigationService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { Access_Token, getItem, PROFILE_COMPLETE, USER_ID, USER_TYPE, USER_VISITED } from '@services/storage';
import { useEffect } from 'react';
import * as routes from '@navigations/routes';
import { AppSafeAreaView } from '@components/AppSafeAreaView';
import { colors } from '@theme/colors';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { getCityList, userProfile } from '@actions/auth/authAction';
import { getBannerList } from '@actions/home/homeAction';
import FastImage from 'react-native-fast-image';
import { logoImage } from '@helper/imagesAssets';
import { s, vs } from 'react-native-size-matters/extend';

const AuthLoading = () => {
  const dispatch = useAppDispatch();
   const {maintenanceInfo } = useAppSelector(state => state.auth);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      bootstrapAsync();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const bootstrapAsync = async () => {
    try {
      const customerToken = await getItem(Access_Token);
      const userId = await getItem(USER_ID);
      const userType: any = await getItem(USER_TYPE);
      const userVisited = await getItem(USER_VISITED);
      const profileComplete = await getItem(PROFILE_COMPLETE);

      if (customerToken) {
        dispatch(userProfile({ userid: userId }));
        dispatch(getBannerList({ screen: '1' }))
        dispatch(getCityList());
        if (userType == 1) {
          NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_EXECUTIVE)
        }
        else if (userType == 2) {
          if (profileComplete === '0') {
            NavigationService.reset(routes?.EDIT_PROFILE_SCREEN);
            return;
          }else{
            NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
          }
          // NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
        } else {
          NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_VENDOR);
        }
      } else {
        if (userVisited === "userVisited") {
          NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
        } 
        else {
          NavigationService.reset(routes?.ONBOARDING);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppSafeAreaView
      style={styles.mainContainer}
    >
        <ActivityIndicator size={'large'} color={colors.buttonBg} />
      <FastImage
      source={logoImage}
      style={{height:vs(200),width:s(200)}}
      resizeMode={FastImage.resizeMode.contain}
      />
    </AppSafeAreaView>
  );
};

export default AuthLoading;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  }
})
