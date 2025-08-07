import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    vendorDealBookletList: [],
    dealCouponList: [],
    vendorUserList:[],
    scanCouponCode: {}
};

export const dealSlice = createSlice({
    name: 'deal',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setBtnLoading: (state, { payload }) => {
            state.isBtnLoading = payload;
        },
        setDealBookletList: (state, { payload }) => {
            state.vendorDealBookletList = payload;
        },
         setVendorUserList: (state, { payload }) => {
            state.vendorUserList = payload;
        },
        setDealCouponList: (state, { payload }) => {
            state.dealCouponList = payload;
        },
        setCouponCode: (state, { payload }) => {
            state.scanCouponCode = payload;
        },
        resetdeal: (state, { payload }) => {
            state = initialState;
        },
    },
});
export const {
    setLoading,
    setBtnLoading,
    setDealBookletList,
    setDealCouponList,
    setVendorUserList,
    setCouponCode,
    resetHome,
}: any = dealSlice.actions;
export const dealReducer = dealSlice.reducer;
