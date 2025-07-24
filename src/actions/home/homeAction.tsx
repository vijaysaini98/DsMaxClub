import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setBannerData, setBookletDetailAbout, setBookletDetailAllDeals, setBookletDetailGallery, setBookletDetailT_C, setBookletList, setCategoriBookletData, setCategoriListData, setLoading } from './homeSlice';
import { CATEGORIES_LIST_SCCREEN } from '@navigations/routes';
import NavigationService from '@navigations/NavigationService';

export const getCategoryList =
  (limit?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.categori_list(limit);

      if (response?.status == 200) {
        dispatch(setCategoriListData(response?.data))
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

export const getCategoryBooklet =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.category_booklet(data);
      if (response?.status == 200) {
        dispatch(setCategoriBookletData(response?.data))
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

export const getBannerList =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.banner_api(data);

      if (response?.status == 200) {
        dispatch(setBannerData(response?.data))
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("bannerApi Error", e);

      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const getBookletList =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.booklet_list(data);
      if (response?.status == 200) {
        dispatch(setBookletList(response?.data))
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

export const getBookletDetail =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.booklet_detail(data);
      if (response?.status == 200) {
        if (data?.tabname == "All Deals") {
          dispatch(setBookletDetailAllDeals(response?.data))
        } else if (data?.tabname == "About") {
          dispatch(setBookletDetailAbout(response?.data))
        } else if (data?.tabname == "Gallery") {
          dispatch(setBookletDetailGallery(response?.data))
        } else {
          dispatch(setBookletDetailT_C(response?.data))
        }
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