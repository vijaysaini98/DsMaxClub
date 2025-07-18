import { API } from '@services/appClient';
// import { setLoading } from './authSlice';
import { setAccessToken, setItem, USER_ID } from '@services/storage';
import * as routes from '@navigations/routes';
import NavigationService from '@navigations/NavigationService';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setCategoriBookletData, setCategoriListData, setLoading } from './homeSlice';

export const getCategoryList =
  (limit?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.categori_list(limit);
// console.log("response",response);

      if (response?.status == 200) {
       dispatch(setCategoriListData(response?.data))
        // Toast.show(response?.message, Toast.LONG);
        // onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("e", e);

      Toast.show(e?.response?.data?.message, Toast.LONG);
      // console.error('login error:', e?.response?.data || e.message);
    } finally {
      dispatch(setLoading(false))
    }
  };

  export const getCategoryBooklet =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.category_booklet(data);
// console.log("response",response);

      if (response?.status == 200) {
       dispatch(setCategoriBookletData(response?.data))
        // Toast.show(response?.message, Toast.LONG);
        // onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("e", e);

      Toast.show(e?.response?.data?.message, Toast.LONG);
      // console.error('login error:', e?.response?.data || e.message);
    } finally {
      dispatch(setLoading(false))
    }
  };
