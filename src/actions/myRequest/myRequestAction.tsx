import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setLoading, setMyRequestAllList, setMyRequestApproveList, setMyRequestCouponList, setMyRequestList, setMyRequestPendingList, setMyRequestRejectList } from './myRequestSlice';

export const getMyRequestList =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.myRequestApi.myRequest_List(data);
            if (response?.status == 200) {
                if (data?.tabname == "all") {
                    dispatch(setMyRequestAllList(response?.data))
                } else if (data?.tabname == "pending") {
                    dispatch(setMyRequestPendingList(response?.data))
                }
                else if (data?.tabname == "approve") {
                    dispatch(setMyRequestApproveList(response?.data))
                }
                else if (data?.tabname == "reject") {
                    dispatch(setMyRequestRejectList(response?.data))
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

export const getMyRequestCouponList =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.myRequestApi.myRequest_Coupon_List(data);
            if (response?.status == 200) {
               dispatch(setMyRequestCouponList(response?.data))
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