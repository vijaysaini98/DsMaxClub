import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    cartList: [] as any[]
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
        setCartList: (state, { payload }) => {
            state.cartList = [...state.cartList, payload];
        },
    },
});
export const {
    setLoading,
    setBtnLoading,
    setCartList,
}: any = cartSlice.actions;
export const cartReducer = cartSlice.reducer;