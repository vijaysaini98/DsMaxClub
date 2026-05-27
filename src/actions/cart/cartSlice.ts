import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  cartList: [] as any[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setBtnLoading: (state, { payload }) => {
      state.isBtnLoading = payload;
    },
    // setCartList: (state, { payload }) => {
    //     state.cartList = [...state.cartList, payload];
    // },
    //        setCartList: (state, { payload }) => {
    //   state.cartList = payload;
    // },
    setCartList: (state, { payload }) => {
      state.cartList = Array.isArray(payload) ? payload : [payload];
    },

 removeCartItem: (
  state,
  { payload },
) => {
  state.cartList =
    state.cartList.filter(
      (item: any) =>
        item?.cart_id !==
        payload,
    );
},
    clearCart: state => {
      state.cartList = [];
    },

    // UPDATE QUANTITY LOCALLY
    updateCartQtyLocal: (state, { payload }) => {
      state.cartList = state.cartList.map((item: any) => {
        if (item?.cart_id === payload?.cart_id) {
          return {
            ...item,

            quantity: payload?.quantity,

            total_price:
              Number(item?.price || 0) * Number(payload?.quantity || 1),
          };
        }

        return item;
      });
    },
  },
});
export const {
  setLoading,
  setBtnLoading,
  setCartList,
  removeCartItem,
  updateCartQtyLocal,
  clearCart,
}: any = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
