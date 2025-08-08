import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setBannerData, setBookletDetailAbout, setBookletDetailAllDeals, setBookletDetailGallery, setBookletDetailT_C, setBookletList, setBtnLoading, setCategoriBookletData, setCategoriListData, setLoading } from './homeSlice';

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
      console.log("category list error", e?.response?.data);

      // Toast.show(e?.response?.data?.message, Toast.LONG);
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
      console.log("category booklet Error", e?.response?.data);

      // Toast.show(e?.response?.data?.message, Toast.LONG);
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
      console.log("bannerApi Error", e?.response?.data);
      // Toast.show(e?.response?.data?.message, Toast.LONG);
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
      console.log("e", e?.response?.data);

      // Toast.show(e?.response?.data?.message, Toast.LONG);
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
      console.log("bookletDetail", e?.response?.data);
      dispatch(setBookletDetailAllDeals())
      dispatch(setBookletDetailAbout())
      dispatch(setBookletDetailGallery())
      dispatch(setBookletDetailT_C())
      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const bookletRequest =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));
      const response = await API.homeApi.booklet_request(data);
      if (response?.status == 200) {
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess()
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log("bookletRequest error=>>", e?.response?.data);

      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setBtnLoading(false))
    }
  };