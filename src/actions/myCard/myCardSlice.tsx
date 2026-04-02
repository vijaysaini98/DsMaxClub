import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    isLoading: false,
    isRefresh:false,
    isBtnLoading: false,
    myCardAllBookletList: [],
    myCardActiveBookletList: [],
    myCardExpiredBookletList: [],
    myCardCouponList: [],
    couponList: [],
    couponData:{},
    comboOfferList: [],
    myCardComboOfferList: [],
};

export const myCardSlice = createSlice({
    name: 'myCard',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setIsRefresh: (state, { payload }) => {
            state.isRefresh = payload;
        },
        setBtnLoading: (state, { payload }) => {
            state.isBtnLoading = payload;
        },
        setMyCardAllBookletList: (state, { payload }) => {
            state.myCardAllBookletList = payload;
        },
        setMyCardActiveBookletList: (state, { payload }) => {
            state.myCardActiveBookletList = payload;
        },
        setMyCardExpiredBookletList: (state, { payload }) => {
            state.myCardExpiredBookletList = payload;
        },
        setMyCardCouponList: (state, { payload }) => {
            state.myCardCouponList = payload;
        },
        setMyCardComboOfferList: (state, { payload }) => {
            state.myCardComboOfferList = payload;
        },
        setCouponList: (state, { payload }) => {
            state.couponList = payload;
        },
        setCouponCodeData :(state, { payload }) => {
            state.couponData = payload;
        },
        setComboOfferList: (state, { payload }) => {
            state.comboOfferList = payload;
        },
        resetMyCard: () => initialState, 
    },
});
export const {
    setLoading,
    setIsRefresh,
    setBtnLoading,
    setMyCardActiveBookletList,
    setMyCardAllBookletList,
    setMyCardExpiredBookletList,
    setMyCardCouponList,
    setMyCardComboOfferList,
    setCouponList,
    setCouponCodeData,
    resetMyCard,
    setComboOfferList

}: any = myCardSlice.actions;
export const myCardReducer = myCardSlice.reducer;
