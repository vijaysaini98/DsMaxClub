import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setBannerData, setBookletDetailAbout, setBookletDetailAllDeals, setBookletDetailGallery, setBookletDetailT_C, setBookletList, setBtnLoading, setCategoriBookletData, setCategoriListData, setComboBookletDeals, setLoading, setMyReportCouponList } from './homeSlice';

export const getCategoryList =
  (limit?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.categori_list(limit);

      if (response?.status == 200) {
        dispatch(setCategoriListData(response?.data))
        return;
      } else {
        Toast.show(response?.message, Toast.LONG);
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
        Toast.show(response?.message, Toast.LONG);
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
        Toast.show(response?.message, Toast.LONG);
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
        Toast.show(response?.message, Toast.LONG);
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
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      dispatch(setBookletDetailAllDeals())
      dispatch(setBookletDetailAbout())
      dispatch(setBookletDetailGallery())
      dispatch(setBookletDetailT_C())
      // Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false))
    }
  };

export const getComboBookletDetail =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.combo_booklet_detail(data);
console.log(response,'resonse of booklet details');

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
        onSucess(response)
        return;
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log(e,'error==>');
      
      dispatch(setBookletDetailAllDeals())
      dispatch(setBookletDetailAbout())
      dispatch(setBookletDetailGallery())
      dispatch(setBookletDetailT_C())
      // Toast.show(e?.response?.data?.message, Toast.LONG);
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
        Toast.show(response?.message, Toast.LONG);
        //  Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      if (e?.response) {
        console.log("bookletRequest error", e?.response)
        // Toast.show(e?.response?.data?.message, Toast.LONG);
      }

    } finally {
      dispatch(setBtnLoading(false))
    }
  };

export const executiveBookletRequest =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));
      const response = await API.homeApi.executive_booklet_request(data);

      if (response?.status == 200) {
        Toast.show(response?.message, Toast.LONG);
        onSucess && onSucess()
        return;
      } else {
        Toast.show(response?.message, Toast.LONG);
        return;
      }
    } catch (e: any) {
      console.log("executiveBookletRequest error=>>", e?.response?.data);

      Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setBtnLoading(false))
    }
  };

export const getComboBookletDeals =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await API.homeApi.combo_booklet_deals(data);
      if (response?.status == 200) {
        dispatch(setComboBookletDeals(response?.data))
        onSucess && onSucess()
        return;
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("getComboBookletDeals error=>>", e?.response?.data);

      // Toast.show(e?.response?.data?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createLeads = (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await API.homeApi.create_leads(data);
    if (response?.status == 200) {
      onSucess && onSucess()
      Toast.show(response?.message, Toast.LONG);
      return;
    } else {
      Toast.show(response?.message, Toast.LONG);
    }
  } catch (e: any) {
    console.log("bookletRequest error=>>", e?.response?.data);

    Toast.show(e?.response?.data?.message, Toast.LONG);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getReportList =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.homeApi.myReport_Coupon_List(data);
            console.log(response,'response===>');
            
            if (response?.status == 200) {
                dispatch(setMyReportCouponList(response?.data))
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