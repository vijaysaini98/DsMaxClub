import Toast from 'react-native-simple-toast';

import { AppDispatch } from '@redux/store';
import {
  removeCartItem,
  setBtnLoading,
  setCartList,
  setLoading,
  updateCartQtyLocal,
} from './cartSlice';
import { API } from '@services/appClient';

export const addToCartAction =
  (data?: any, localItem?: any, onSucess?: any) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));

      const response = await API.cartApi.add_to_cart(data);

      if (response?.status == 200) {
        // save in local redux cart
        dispatch(setCartList(localItem));
        onSucess && onSucess(response?.data);
        Toast.show(response?.message || 'Added to cart', Toast.LONG);

        return;
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log('e', e);

      Toast.show(
        e?.response?.data?.message || 'Something went wrong',
        Toast.LONG,
      );
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const getCartList =
  (onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await API.cartApi.cart_list();

      if (response?.status == 200) {
        dispatch(setCartList(response?.data));
        onSucess && onSucess(response?.data);

        return;
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log('e', e);

      Toast.show(
        e?.response?.data?.message || 'Something went wrong',
        Toast.LONG,
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateCartQuantity =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await API.cartApi.update_cart_quantity(data);

      dispatch(getCartList());

      onSucess && onSucess(response?.data);
    } catch (e: any) {

      if (e?.response?.status === 400) {
        Toast.show(
          e?.response?.data?.message?.message || 'Maximum quantity reached',
          Toast.LONG,
        );

        dispatch(getCartList());
        return;
      }

      Toast.show(
        e?.response?.data?.message?.message || 'Something went wrong',
        Toast.LONG,
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteCartItem =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));

      const response = await API.cartApi.remove_cart(data);

      if (response?.status == 200) {
        dispatch(getCartList());

        onSucess && onSucess(response?.data);

        Toast.show(response?.message, Toast.LONG);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log('e1726', e);

      Toast.show(
        e?.response?.data?.message || 'Something went wrong',
        Toast.LONG,
      );
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const initiatePayment =
  (data?: any, onSuccess?: any) => async (dispatch: AppDispatch) => {
    try {
   

      dispatch(setBtnLoading(true));

      const response = await API.cartApi.payment_initiate(data);

console.log(response,'response==>');

      if (response?.status === 200) {
        console.log('STATUS 200 HIT');

        onSuccess?.(response?.data);


        return;
      } else {
        console.log('STATUS NOT 200 ===>', response?.status);

        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.response?.data?.message, Toast.LONG);
       console.log('Full Error:', e);
  console.log('API Error Response:', e?.response);
  console.log('Status Code:', e?.response?.status);
  console.log('Response Data:', e?.response?.data);
  console.log('Message:', e?.response?.data?.message);

      dispatch(getCartList());
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const getPaymentStatus =
  (merchantTransactionId: string, onSuccess?: any) =>
  async (dispatch: AppDispatch) => {
    console.log('PAYMENT STATUS START');
    console.log('merchabbbbt', merchantTransactionId);
    try {
      dispatch(setBtnLoading(true));

      const response = await API.cartApi.payment_status(merchantTransactionId);

      console.log('PAYMENT STATUS RESPONSE ===>', JSON.stringify(response));
      console.log(response, 'status response ===>');

      if (response?.status === 200) {
        onSuccess?.(response);

        return;
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log('PAYMENT STATUS ERROR ===>', e);
      console.log('PAYMENT STATUS ERROR DATA ===>', e?.response?.data);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const executiveCartRequestSend =
  (data?: any, onSuccess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));

      const response = await API.cartApi.executive_cart_request_send(data);

      console.log('FULL RESPONSE ===>', JSON.stringify(response, null, 2));
      console.log('responsew  w', response);
      console.log('response.data', response?.data);
      console.log('response.data.data', response?.data?.data);

      if (response?.status === 200) {
        console.log('STATUS 200 HIT');

        // Send complete response to callback
        onSuccess?.(response);

        return;
      }

      Toast.show(response?.message || 'Request failed', Toast.LONG);
    } catch (e: any) {
      console.log('EXECUTIVE CART REQUEST ERROR ===>', e);

      console.log('EXECUTIVE CART REQUEST ERROR DATA ===>', e?.response?.data);

      Toast.show(
        e?.response?.data?.message || e?.message || 'Something went wrong',
        Toast.LONG,
      );
    } finally {
      dispatch(setBtnLoading(false));
    }
  };
