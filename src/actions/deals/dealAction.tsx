import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setCouponCode, setDealBookletList, setDealCouponList, setLoading, setVendorUserList } from './dealSlice';

export const getVendorDealBookletList =
    (limit?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.dealApi.vendor_Booklet_List(limit);

            if (response?.status == 200) {
                dispatch(setDealBookletList(response?.data))
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

export const getDealCouponList =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.dealApi.vendor_coupon_list(data);
            if (response?.status == 200) {
                dispatch(setDealCouponList(response?.data))
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

    export const getVendorUserList =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.dealApi.vendor_user_list(data);
            if (response?.status == 200) {
                dispatch(setVendorUserList(response?.data))
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


export const scanCouponCode =
    (data?: any, onSucess?: any,onFailed) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.dealApi.scan_coupon_code(data);
            if (response?.status == 200) {
                dispatch(setCouponCode(response?.data))
                onSucess && onSucess()
                return;
            } else {
                throw new Error('No response data received from backend.');
            }
        } catch (e: any) {
            console.log("e", e);
onFailed && onFailed()
            Toast.show(e?.response?.data?.message, Toast.LONG);
        } finally {
            dispatch(setLoading(false))
        }
    };