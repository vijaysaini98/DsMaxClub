import { AppDispatch } from "@redux/store";
import { setBtnLoading, setExecutiveApproveList, setExecutiveRequestAllList, setExecutiveRequestPendingList, setExecutiveRequestRejectList, setExecutiveRequestUserDetails, setImageLoading, setLoading } from "./executiveRequestSlice";
import { API } from "@services/appClient";
import Toast from "react-native-simple-toast";
import { setIsRefresh } from "@actions/myCard/myCardSlice";

export const getExecutiveRequestList =
    (data?: any,isRefresh?:boolean, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
isRefresh && dispatch(setIsRefresh(true))
            const response = await API.executiveRequestApi.executive_Request_List(data);
         
            if (response?.status == 200) {
                if (data?.tabname == "all") {
                    dispatch(setExecutiveRequestAllList(response?.data))
                    dispatch(setExecutiveRequestPendingList())
                    dispatch(setExecutiveApproveList())
                    dispatch(setExecutiveRequestRejectList())
                } else if (data?.tabname == "pending") {
                    dispatch(setExecutiveRequestPendingList(response?.data))
                    dispatch(setExecutiveRequestAllList())
                    dispatch(setExecutiveApproveList())
                    dispatch(setExecutiveRequestRejectList())
                }
                else if (data?.tabname == "approve") {
                    dispatch(setExecutiveApproveList(response?.data))
                    dispatch(setExecutiveRequestPendingList())
                    dispatch(setExecutiveRequestAllList())
                    dispatch(setExecutiveRequestRejectList())
                }
                else if (data?.tabname == "reject") {
                    dispatch(setExecutiveRequestRejectList(response?.data))
                    dispatch(setExecutiveApproveList())
                    dispatch(setExecutiveRequestPendingList())
                    dispatch(setExecutiveRequestAllList())
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
            isRefresh && dispatch(setIsRefresh(true))
        }
    };

export const getExecutiveRequestUserDetails = (data?: any, onSucess?: any, onFailed?: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setBtnLoading(true));
        const response = await API.executiveRequestApi.execuitve_Request_User_Details(data);
        
        if (response?.status == 200) {
            // dispatch(setCouponCode(response?.data))
            dispatch(setExecutiveRequestUserDetails(response?.data))
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
        dispatch(setBtnLoading(false))
    }
};

export const executiveRequestStatusChange =
    (data?: any, onSucess?: any, onFailed?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.executiveRequestApi.executive_Request_Status_Change(data);
          
            if (response?.status == 200) {
                // dispatch(setCouponCode(response?.data))
                 onSucess && onSucess()
                 Toast.show(response?.message, Toast.LONG);
               
                return;
            } else {
                throw new Error('No response data received from backend.');
            }
        } catch (e: any) {
            console.log("e", e?.response);
            onFailed && onFailed()
            Toast.show(e?.response?.data?.message, Toast.LONG);
        } finally {
            dispatch(setLoading(false))
        }
    };

    export const executivePaymentImageUpload =
    (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setImageLoading(true));
            const response = await API.executiveRequestApi.executive_payment_image_upload(data);
           
            if (response?.status == 200) {
                //  Toast.show(response?.message, Toast.LONG);
                onSucess && onSucess(response?.data)
                return;
            } else {
                throw new Error('No response data received from backend.');
            }
        } catch (e: any) {
            console.log("e", e?.response);
            Toast.show(e?.response?.data?.message, Toast.LONG);
        } finally {
            dispatch(setImageLoading(false))
        }
    };