import { API } from '@services/appClient';
import { resetAuth, setCityList, setLoading, setUserData } from './authSlice';
import { removeAccessToken, setAccessToken, setItem, USER_ID } from '@services/storage';
import * as routes from '@navigations/routes';
import NavigationService from '@navigations/NavigationService';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";

export const login =
  (data: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.login(data);

      if (response?.status == 200) {
        setAccessToken(response?.data?.user?.remember_token);
        setItem(USER_ID, response?.data?.user?.uuid)

        dispatch(userProfile({ userid: response?.data?.user?.uuid }))
        dispatch(getCityList())
        NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("e", e);

      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const singUp = (data: any, onSucess?: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await API.authApi.singUp(data);
    if (response?.status == 200) {
      Toast.show(response?.message, Toast.LONG);
      NavigationService.reset(routes?.LOGIN_SCREEN);
      onSucess && onSucess()
      return;
    } else {
      throw new Error('No response data received from backend.');
    }
  } catch (e: any) {
    Toast.show(e?.response?.data?.message, Toast.LONG);
  } finally {
    dispatch(setLoading(false))
  }
};

export const logout =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.logout(data);

      if (response?.status == 200) {
        removeAccessToken()
        dispatch(resetAuth())
        // dispatch()
        NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
        Toast.show(response?.message, Toast.LONG);
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("e", e);
      removeAccessToken()
      NavigationService.reset(routes?.NAVIGATION_AUTH_STACK);
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const sendOtp =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.send_otp(data);

      if (response?.status == 200) {
        NavigationService.navigate(routes?.VERIFICATION_SCREEN, { email: data?.email });
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
      console.log("e", e);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const verifyOtp =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {

      dispatch(setLoading(true));
      const response = await API.authApi.verify_otp(data);

      if (response?.status == 200) {
        NavigationService.navigate(routes?.RESET_PASSWORD_SCREEN, { email: data?.email });
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const resetPassword =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.reset_password(data);

      if (response?.status == 200) {
        NavigationService.reset(routes?.LOGIN_SCREEN);
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const userProfile =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userApi.user_profile(data);
      if (response?.status == 200) {
        dispatch(setUserData(response?.data));
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const updateUserProfile =
  (data?: any, userId?: string, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userApi.update_user_profile(data);
      if (response?.status == 200) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(userProfile(userId))
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const updateUserProfileImage =
  (data?: any, userId?: string, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userApi.user_profile_image(data);
      if (response?.status == 200) {
        dispatch(userProfile(userId))
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const getCityList =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userApi.city_list(data);
      if (response?.status == 200) {
        dispatch(setCityList(response?.data))
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };