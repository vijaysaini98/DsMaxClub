import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from 'react-native-simple-toast';

import {
  setHasMore,
  setLoading,
  setMyOrderAllList,
  setMyOrderCancelledList,
  setMyOrderCompletedList,
  setMyOrderExpiredList,
  setMyOrderPendingList,
  setMyOrderRejectedList,
  setOffset,
} from './myOrderSlice';


export const getMyorderList =
  (data?: any) => async (dispatch: AppDispatch) => {
    const isFirstPage = (data?.offset ?? 0) === 0;

    try {
      // Show full screen loader only for first page
      if (isFirstPage) {
        dispatch(setLoading(true));
      }

      const response = await API.orderApi.myOrder_List(data);

      console.log(response, 'response of my order list');

      if (response?.status === 200) {
        const list = response?.data?.data ?? [];
        const meta = response?.data?.meta ?? {};

        dispatch(setHasMore(meta?.has_more ?? false));
        dispatch(setOffset(meta?.offset ?? 0));

        const append = !isFirstPage;

        switch (data?.tabname) {
          case 'all':
            dispatch(
              setMyOrderAllList({
                data: list,
                append,
              }),
            );
            break;

          case 'completed':
            dispatch(
              setMyOrderCompletedList({
                data: list,
                append,
              }),
            );
            break;

          case 'pending':
            dispatch(
              setMyOrderPendingList({
                data: list,
                append,
              }),
            );
            break;

          case 'failed':
            dispatch(
              setMyOrderRejectedList({
                data: list,
                append,
              }),
            );
            break;

          case 'cancelled':
            dispatch(
              setMyOrderCancelledList({
                data: list,
                append,
              }),
            );
            break;

          case 'expired':
            dispatch(
              setMyOrderExpiredList({
                data: list,
                append,
              }),
            );
            break;

          default:
            break;
        }
      }

      return response;
    } catch (e: any) {
      Toast.show(e?.response?.data?.message || 'Something went wrong');
      throw e;
    } finally {
      // Hide full screen loader only for first page
      if (isFirstPage) {
        dispatch(setLoading(false));
      }
    }
  };