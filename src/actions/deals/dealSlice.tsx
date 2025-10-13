import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  vendorDealBookletList: [],
  dealCouponList: [],
  vendorUserList: [],
  scanCouponCode: {},
  vendorBookletCouponList:[]
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
    setVendorBookletCouponist: (state, { payload }) => {
      state.vendorBookletCouponList = payload;
    },
    setDealCouponList: (state, { payload }) => {
      state.dealCouponList = payload;
    },
    setCouponCode: (state, { payload }) => {
      state.scanCouponCode = payload;
    },
    resetDeal: () => initialState, // ✅ proper reset
  },
});

export const {
  setLoading,
  setBtnLoading,
  setDealBookletList,
  setDealCouponList,
  setVendorUserList,
  setCouponCode,
  setVendorBookletCouponist,
  resetDeal,
} = dealSlice.actions;

export const dealReducer = dealSlice.reducer;
