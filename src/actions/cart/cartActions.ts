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
      console.log(response, 'response of cart -===>');

      if (response?.status == 200) {
        // save in local redux cart
        dispatch(setCartList(localItem));

        Toast.show(response?.message || 'Added to cart', Toast.LONG);

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
      dispatch(setBtnLoading(false));
    }
  };

export const getCartList =
  (onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await API.cartApi.cart_list();
 
      console.log(response, 'response of cartlist===>');

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
      dispatch(setBtnLoading(true));

      const response = await API.cartApi.update_cart_quantity(data);

      if (response?.status == 200) {
        // Refresh complete cart
        dispatch(getCartList());

        onSucess && onSucess(response?.data);
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


export const deleteCartItem =
  (data?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));

      const response = await API.cartApi.remove_cart(data);

      if (response?.status == 200) {
        // Refresh complete cart
        dispatch(getCartList());

        onSucess && onSucess(response?.data);

        Toast.show(response?.message, Toast.LONG);
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


export const initiatePayment =
  (data?: any, onSuccess?: any) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log('PAYMENT ACTION START');
      console.log('REQUEST ===>', data);

      dispatch(setBtnLoading(true));

      const response = await API.cartApi.payment_initiate(data);

      console.log('FULL RESPONSE ===>', JSON.stringify(response));

      if (response?.status === 200) {
        console.log('STATUS 200 HIT');

        onSuccess?.(response?.data);

        return;
      } else {
        console.log('STATUS NOT 200 ===>', response?.status);

        Toast.show(
          response?.message || 'Payment failed',
          Toast.LONG,
        );
      }
    } catch (e: any) {
      console.log('PAYMENT ERROR ===>', e);
      console.log('PAYMENT ERROR DATA ===>', e?.response?.data);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };
  
