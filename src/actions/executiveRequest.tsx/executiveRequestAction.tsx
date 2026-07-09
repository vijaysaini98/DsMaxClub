import { AppDispatch } from "@redux/store";
import { setBtnLoading, setExecutiveApproveList, setExecutiveRequestAllList, setExecutiveRequestPendingList, setExecutiveRequestRejectList, setExecutiveRequestUserDetails, setImageLoading, setLoading, setPaginationLoading } from "./executiveRequestSlice";
import { API } from "@services/appClient";
import Toast from "react-native-simple-toast";
import { setIsRefresh } from "@actions/myCard/myCardSlice";

export const getExecutiveRequestList =
  (
    data?: any,
    isRefresh?: boolean,
    isLoadMore?: boolean,
    onSuccess?: any,
  ) =>
  async (dispatch: AppDispatch, getState: any) => {
    try {
      
      if (!isLoadMore) {
        dispatch(setLoading(true));
      } else {
        dispatch(setPaginationLoading(true));
      }

      if (isRefresh) {
        dispatch(setIsRefresh(true));
      }

      const response =
        await API.executiveRequestApi.executive_Request_List(data);

      if (response?.status === 200) {
        const newData = response?.data?.data ?? [];

        const state = getState().executiveRequest;

        switch (data?.tabname) {
          case 'all':
            dispatch(
              setExecutiveRequestAllList(
                isLoadMore
                  ? [...state.executiveRequestAllList, ...newData]
                  : newData,
              ),
            );
            break;

          case 'pending':
            dispatch(
              setExecutiveRequestPendingList(
                isLoadMore
                  ? [...state.executiveRequestPendingList, ...newData]
                  : newData,
              ),
            );
            break;

          case 'approve':
            dispatch(
              setExecutiveApproveList(
                isLoadMore
                  ? [...state.executiveRequestApproveList, ...newData]
                  : newData,
              ),
            );
            break;

          case 'reject':
            dispatch(
              setExecutiveRequestRejectList(
                isLoadMore
                  ? [...state.executiveRequestRejectList, ...newData]
                  : newData,
              ),
            );
            break;
        }

        onSuccess?.({
          hasMore: response?.data?.meta?.has_more ?? false,
          offset: response?.data?.meta?.offset ?? 0,
          total: response?.data?.meta?.total ?? 0,
        });

        return response;
      }

      throw new Error('No response data received from backend.');
    } catch (e: any) {
      console.log(e);

      Toast.show(
        e?.response?.data?.message || 'Something went wrong',
        Toast.LONG,
      );
    } finally {
      if (!isLoadMore) {
        dispatch(setLoading(false));
      } else {
        dispatch(setPaginationLoading(false));
      }

      if (isRefresh) {
        dispatch(setIsRefresh(false));
      }
    }
  };
export const getExecutiveRequestUserDetails = (data?: any, onSucess?: any, onFailed?: any) => async (dispatch: AppDispatch) => {
    try {
     dispatch(setLoading(true));
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
        dispatch(setLoading(false))
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