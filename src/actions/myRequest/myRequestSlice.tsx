import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    myRequestAllList: [],
    myRequestPendingList: [],
    myRequestApproveList: [],
    myRequestRejectList: [],
    couponList: []
};

export const myRequestSlice = createSlice({
    name: 'myRequest',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setBtnLoading: (state, { payload }) => {
            state.isBtnLoading = payload;
        },
        setMyRequestAllList: (state, { payload }) => {
            state.myRequestAllList = payload;
        },
        setMyRequestPendingList: (state, { payload }) => {
            state.myRequestPendingList = payload;
        },
        setMyRequestApproveList: (state, { payload }) => {
            state.myRequestApproveList = payload;
        },
        setMyRequestRejectList: (state, { payload }) => {
            state.myRequestRejectList = payload;
        },
        setMyRequestCouponList: (state, { payload }) => {
            state.couponList = payload;
        },
        resetMyRequest: () => initialState,
    },
});
export const {
    setLoading,
    setBtnLoading,
    setMyRequestAllList,
    setMyRequestApproveList,
    setMyRequestPendingList,
    setMyRequestRejectList,
    setMyRequestCouponList
}: any = myRequestSlice.actions;
export const myRequestReducer = myRequestSlice.reducer;
