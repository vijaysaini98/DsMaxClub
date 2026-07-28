import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setLoading, setMyRequestAllList, setMyRequestApproveList, setMyRequestCouponList, setMyRequestPendingList, setMyRequestRejectList } from './myRequestSlice';

// export const getMyRequestList =
//     (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
//         try {
//             dispatch(setLoading(true));
//             const response = await API.myRequestApi.myRequest_List(data);
//             console.log(response,'response of my Request');
            
//             if (response?.status == 200) {
//                 if (data?.tabname == "all") {
//                     dispatch(setMyRequestAllList(response?.data?.data))
//                     dispatch(setMyRequestPendingList())
//                     dispatch(setMyRequestApproveList())
//                     dispatch(setMyRequestRejectList())
//                 } else if (data?.tabname == "pending") {
//                     dispatch(setMyRequestPendingList(response?.data?.data))
//                     dispatch(setMyRequestAllList())
//                     dispatch(setMyRequestApproveList())
//                     dispatch(setMyRequestRejectList())
//                 }
//                 else if (data?.tabname == "approve") {
//                     dispatch(setMyRequestApproveList(response?.data?.data))
//                     dispatch(setMyRequestAllList())
//                     dispatch(setMyRequestPendingList())
//                     dispatch(setMyRequestRejectList())
//                 }
//                 else if (data?.tabname == "reject") {
//                     dispatch(setMyRequestRejectList(response?.data?.data))
//                     dispatch(setMyRequestAllList())
//                     dispatch(setMyRequestPendingList())
//                     dispatch(setMyRequestApproveList())
//                 }
//                 return;
//             } else {
//                 throw new Error('No response data received from backend.');
//             }
//         } catch (e: any) {
//             console.log("e", e);

//             Toast.show(e?.response?.data?.message, Toast.LONG);
//         } finally {
//             dispatch(setLoading(false))
//         }
//     };

export const getMyRequestList =
  (data?: any, onSuccess?: any) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
  dispatch(setMyRequestAllList({}));
      const response = await API.myRequestApi.myRequest_List(data);
console.log(response,'response of request list');

      if (response?.status === 200) {
        // 👇 NOT response.data.data
        dispatch(setMyRequestAllList(response.data));

        onSuccess?.(response);
      }
    } catch (e: any) {
      dispatch(setMyRequestAllList({}));

      Toast.show(
        e?.response?.data?.message ?? 'Something went wrong',
        Toast.LONG,
      );
    } finally {
      dispatch(setLoading(false));
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