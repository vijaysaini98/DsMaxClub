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
       clearMyRequestDetails: (state, { payload }) => {
  switch (payload) {
    case 'pending':
      state.myRequestPendingList = {};
      break;

    case 'approve':
      state.myRequestApproveList = {};
      break;

    case 'reject':
      state.myRequestRejectList = {};
      break;

    default:
      state.myRequestAllList = {};
      break;
  }
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
    setMyRequestCouponList,
    clearMyRequestDetails
}: any = myRequestSlice.actions;
export const myRequestReducer = myRequestSlice.reducer;
