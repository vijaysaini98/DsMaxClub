import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  cartList: [] as any[],
  isRefresh:false,  
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
      setIsRefresh: (state, { payload }) => {
            state.isRefresh = payload;
        },
setCartList: (state, { payload }) => {
  state.cartList = payload;
},

 removeCartItem: (
  state,
  { payload },
) => {
  state.cartList.items =
    state.cartList.items?.filter(
      (item: any) =>
        item?.cart_id !==
        payload,
    );
},
    clearCart: state => {
      state.cartList = [];
    },

 
    updateCartQtyLocal: (state, { payload }) => {
  if (!state.cartList?.items) return;

  state.cartList.items = state.cartList.items.map((item: any) => {
    if (item.cart_id === payload.cart_id) {
      return {
        ...item,
        quantity: payload.quantity,
        total_price:
          Number(item.price || 0) * Number(payload.quantity || 1),
      };
    }

    return item;
  });
},
     incrementQuantity: (state, action) => {
      const item = state.cartList.find(
        item => item.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartList.find(
        item => item.id === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
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
  removeFromCart,
  addToCart,
   incrementQuantity,
  decrementQuantity,
  setIsRefresh,
}: any = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
