import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from 'react-native-simple-toast';

import {
  setLoading,
  setMyOrderAllList,
  setMyOrderCancelledList,
  setMyOrderCompletedList,
  setMyOrderExpiredList,
  setMyOrderPendingList,
  setMyOrderRejectedList,
} from './myOrderSlice';

// export const getMyorderList =
//   (data?: any) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));

//       const response = await API.orderApi.myOrder_List(data);

//       if (response?.status === 200) {

//         switch (data?.tabname) {

//           case 'All':
//             dispatch(setMyOrderAllList(response.data));
//             dispatch(setMyOrderCompletedList([]));
//             dispatch(setMyOrderPendingList([]));
//             dispatch(setMyOrderRejectedList([]));
//             break;

//           case 'Completed':
//             dispatch(setMyOrderCompletedList(response.data));
//             dispatch(setMyOrderAllList([]));
//             dispatch(setMyOrderPendingList([]));
//             dispatch(setMyOrderRejectedList([]));
//             break;

//           case 'Pending':
//             dispatch(setMyOrderPendingList(response.data));
//             dispatch(setMyOrderAllList([]));
//             dispatch(setMyOrderCompletedList([]));
//             dispatch(setMyOrderRejectedList([]));
//             break;

//           case 'failed':
//             dispatch(setMyOrderRejectedList(response.data));
//             dispatch(setMyOrderAllList([]));
//             dispatch(setMyOrderCompletedList([]));
//             dispatch(setMyOrderPendingList([]));
//             break;
//         }
//       }
//     } catch (e: any) {
//       Toast.show(e?.response?.data?.message || 'Something went wrong');
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

export const getMyorderList =
  (data?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await API.orderApi.myOrder_List(data);

      if (response?.status === 200) {
        // Clear all lists first
        dispatch(setMyOrderAllList([]));
        dispatch(setMyOrderCompletedList([]));
        dispatch(setMyOrderPendingList([]));
        dispatch(setMyOrderRejectedList([]));
        dispatch(setMyOrderCancelledList([]));
        dispatch(setMyOrderExpiredList([]));

      switch (data?.tabname) {
  case 'all':
    dispatch(setMyOrderAllList(response.data));
    break;

  case 'completed':
    dispatch(setMyOrderCompletedList(response.data));
    break;

  case 'pending':
    dispatch(setMyOrderPendingList(response.data));
    break;

  case 'failed':
    dispatch(setMyOrderRejectedList(response.data));
    break;

  case 'cancelled':
    dispatch(setMyOrderCancelledList(response.data));
    break;

  case 'expired':
    dispatch(setMyOrderExpiredList(response.data));
    break;
}
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };