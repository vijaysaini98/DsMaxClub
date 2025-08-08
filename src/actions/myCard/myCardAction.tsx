import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setBtnLoading, setCouponCodeData, setCouponList, setLoading, setMyCardActiveBookletList, setMyCardAllBookletList, setMyCardCouponList, setMyCardExpiredBookletList } from './myCardSlice';
import NavigationService from '@navigations/NavigationService';
import { REDEEM_SUCCESSFULL_SCREEN_USER } from '@navigations/routes';

export const getMyCardBookletList =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.myCardApi.myCard_List(data);
            if (response?.status == 200) {
                if (data?.tabname == "all") {
                    dispatch(setMyCardAllBookletList(response?.data))
                    dispatch(setMyCardActiveBookletList())
                    dispatch(setMyCardExpiredBookletList())
                } else if (data?.tabname == "active") {
                    dispatch(setMyCardActiveBookletList(response?.data))
                    dispatch(setMyCardAllBookletList())
                    dispatch(setMyCardExpiredBookletList())
                }
                else if (data?.tabname == "expire") {
                    dispatch(setMyCardExpiredBookletList(response?.data))
                    dispatch(setMyCardActiveBookletList())
                    dispatch(setMyCardAllBookletList())
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

export const getMyCardCouponList =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.myCardApi.myCard_Coupon_List(data);
            if (response?.status == 200) {
                dispatch(setMyCardCouponList(response?.data))
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

export const getCoupon =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.myCardApi.myCard_Coupon(data);
            if (response?.status == 200) {
                dispatch(setCouponList(response?.data))
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

export const couponCodeGenrate =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setBtnLoading(true));
            const response = await API.myCardApi.coupon_code_genrate(data);
            if (response?.status == 200) {
                dispatch(setCouponCodeData(response?.data))
                NavigationService.navigate(REDEEM_SUCCESSFULL_SCREEN_USER)
                onSucess && onSucess()
                return;
            } else {
                throw new Error('No response data received from backend.');
            }
        } catch (e: any) {
            console.log("e", e);

            Toast.show(e?.response?.data?.message, Toast.LONG);
        } finally {
            dispatch(setBtnLoading(false))
        }
    };