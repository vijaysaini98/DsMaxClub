import apiClient, { API } from '@services/appClient';
import { resetAuth, setAppinfo, setCityList, setHowToRedeem, setLoading, setPrivacyPolicy, setTermCondition, setUserData } from './authSlice';
import {
  PROFILE_COMPLETE,
  removeAccessToken,
  setAccessToken,
  setItem,
  USER_ID,
  USER_TYPE,
} from '@services/storage';
import * as routes from '@navigations/routes';
import NavigationService from '@navigations/NavigationService';
import { AppDispatch } from '@redux/store';
import Toast from 'react-native-simple-toast';
import { resetDeal } from '@actions/deals/dealSlice';
import { resetHome } from '@actions/home/homeSlice';

export const login =
  (data: any, onSucess?: any, callBack?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.login(data);

      if (response?.status == 200) {
        if (response?.data?.user?.otp_verified !== 0) {
          setAccessToken(response?.data?.user?.remember_token);
          setItem(USER_ID, response?.data?.user?.uuid);
          setItem(USER_TYPE, response?.data?.user?.user_type);
        }

        dispatch(userProfile({ userid: response?.data?.user?.uuid }));
        dispatch(getCityList());
        if (response?.data?.user?.user_type == 2) {

          if (response?.data?.user?.otp_verified == 0) {
            setAccessToken(response?.data?.user?.remember_token);
            setItem(USER_ID, response?.data?.user?.uuid);
            setItem(USER_TYPE, response?.data?.user?.user_type);
            let apiData = {
              email: data.email,
              // mobile: state?.phone
            }
            callBack && callBack()
            // dispatch(customerVerifySendOtp(apiData))
            dispatch(sendOtp(apiData))
            // callBack && callBack()
          } else {
            onSucess && onSucess();
            NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
          }

        }
        else if (response?.data?.user?.user_type == 1) {
          onSucess && onSucess();
          NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_EXECUTIVE)
        }
        else {
          onSucess && onSucess();
          NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_VENDOR);
        }

        Toast.show(response?.message, Toast.LONG);

        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log('e', e);

      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const userLogin =
  (data: any, onSucess?: any, callBack?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.userLogin(data);
      if (response?.status == 200) {
        // setAccessToken(response?.data?.remember_token);
        // setItem(USER_ID, response?.data?.uuid);
        // setItem(USER_TYPE, response?.data?.user_type);

        // dispatch(userProfile({ userid: response?.data?.uuid }));
        // dispatch(getCityList());

        // if (response?.data?.user_type == 2) {
        //   NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
        // } else {
        //   NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_VENDOR);
        // }
        Toast.show(response?.message, Toast.LONG);

        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }

    } catch (e: any) {
      console.log('e', e);

      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const singUp =
  (data: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.singUp(data);
      if (response?.status == 200) {
        setAccessToken(response?.data?.remember_token);
        setItem(USER_ID, response?.data?.uuid);
        setItem(USER_TYPE, response?.data?.user_type);

        dispatch(userProfile({ userid: response?.data?.uuid }));
        dispatch(getCityList());
        if (response?.data?.user_type == 2) {
          NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
        } else {
          NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_VENDOR);
        }
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logout =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.logout(data);

      if (response?.status == 200) {
        removeAccessToken();
        dispatch(resetAuth());
        dispatch(resetHome())
        dispatch(resetDeal())
        NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log('logout error ', e);
      onSucess && onSucess();
      removeAccessToken();
      dispatch(resetAuth());
      dispatch(resetHome())
      dispatch(resetDeal())
      NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
      Toast.show("Logout Successfully", Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteAccount =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.delete_account(data);

      if (response?.status == 200) {
        removeAccessToken();
        NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
        dispatch(resetAuth());
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess();

        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
      onSucess && onSucess();
    } finally {
      dispatch(setLoading(false));
    }
  };

export const sendOtp =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.send_otp(data);

      if (response?.status == 200) {
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
      console.log('e', e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const customerVerifySendOtp =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.customer_send_otp_verify(data);

      if (response?.status == 200) {
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
      console.log('e', e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const verifyOtp =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.verify_otp(data);
      if (response?.status == 200) {
        if (response?.data?.user?.user_type == 2) {
          setAccessToken(response?.data?.user?.remember_token);
          setItem(USER_ID, response?.data?.user?.uuid);
          setItem(USER_TYPE, response?.data?.user?.user_type);
          setItem(PROFILE_COMPLETE, response?.data?.user?.profile_complete.toString());
          dispatch(userProfile({ userid: response?.data?.user?.uuid }));
          dispatch(getCityList());
          if (response?.data?.user?.profile_complete == 0) {
            NavigationService.reset(routes?.EDIT_PROFILE_SCREEN);
          } else {
            NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
          }
          onSucess && onSucess();
        } else {
          onSucess && onSucess();
        }
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("e===>>", e?.response?.data);

      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const resetPassword =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.reset_password(data);

      if (response?.status == 200) {
        NavigationService.reset(routes?.LOGIN_TYPE_SCREEN);
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const userProfile =
  (data?: any, onSucess?: any, isFirstTime?: boolean) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userApi.user_profile(data);
      if (response?.status == 200) {
        dispatch(setUserData(response?.data));
        if (isFirstTime && response?.data?.profile_complete !== 0) {
          NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
          setItem(PROFILE_COMPLETE, response?.data?.profile_complete.toString());
        }
        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("user proofile Error", e);

      // Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateUserProfile =
  (data?: any, userId?: string, onSucess?: any, from?: string,) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(setLoading(true));
        const response = await API.userApi.update_user_profile(data);
        if (response?.status == 200) {
          if (from !== "header") {
            Toast.show(response?.message, Toast.LONG);
          }
          onSucess && onSucess();
          return;
        } else {
          throw new Error('No response data received from backend.');
        }
      } catch (e: any) {
        console.log("e", e?.response?.data);

        // Toast.show(e?.response?.data?.message, Toast.LONG);
      } finally {
        dispatch(setLoading(false));
      }
    };

export const updateUserProfileImage =
  (data?: any, userId?: string, onSucess?: any) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(setLoading(true));
        const response = await API.userApi.user_profile_image(data);
        if (response?.status == 200) {
          dispatch(userProfile(userId));
          Toast.show(response?.message, Toast.LONG);
          onSucess && onSucess();
          return;
        } else {
          throw new Error('No response data received from backend.');
        }
      } catch (e: any) {
        console.log("updateUserProfileImage", e?.response?.data?.message)
        // Toast.show(e?.response?.data?.message, Toast.LONG);
      } finally {
        dispatch(setLoading(false));
      }
    };

export const getCityList =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userApi.city_list(data);
      if (response?.status == 200) {
        dispatch(setCityList(response?.data));
        onSucess && onSucess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("city List Error", e?.response?.data);
      // Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getPrivacy_TermCondition =
  (data?: any, from?: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.pageApi(data);

      if (response?.status == 200) {
        if (data == "privacy-policy") {
          dispatch(setPrivacyPolicy(response?.data))
        }
        else if (data == "how-to-redeem") {

          dispatch(setHowToRedeem(response?.data))
        }
        else {
          dispatch(setTermCondition(response?.data))
        }
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("privacy policy error", e?.response?.data)
      // Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAppVersion = (data?: any) => async (dispatch: AppDispatch) => {
  try {
    const response: any = await API.authApi.getAppVersion();
    if (response.success) {
      dispatch(setAppinfo(response?.data))
    }
  } catch (e: any) {
    console.log("App Version Error", e?.response?.data);
  } finally {
  }
};

