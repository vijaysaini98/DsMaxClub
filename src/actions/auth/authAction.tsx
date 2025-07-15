import { API } from '@services/appClient';
import { resetAuth, setLoading, setUserData } from './authSlice';
import { removeAccessToken, removeRefreshToken, setAccessToken } from '@services/storage';
import * as routes from '@navigations/routes';
import NavigationService from '@navigations/NavigationService';
import { AppDispatch } from '@redux/store';

export const login =
  (data:any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authApi.login(data);
      if (response?.data) {
        setAccessToken(response?.data?.remember_token);
        dispatch(setUserData(response.data));
        NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.error('login error:', e?.response?.data || e.message);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  removeAccessToken();
  // removeRefreshToken();
  dispatch(resetAuth());
  NavigationService.navigate(routes?.LOGIN_SCREEN);
};
