import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isBtnLoading: false,

  myOrderAllList: [],
  myOrderCompletedList: [],
  myOrderPendingList: [],
  myOrderRejectedList: [],
  myOrderCancelledList: [],
myOrderExpiredList: [],
};

const myOrderSlice = createSlice({
  name: 'myOrder',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },

    setBtnLoading: (state, { payload }) => {
      state.isBtnLoading = payload;
    },

    setMyOrderAllList: (state, { payload }) => {
      state.myOrderAllList = payload ?? [];
    },

    setMyOrderCompletedList: (state, { payload }) => {
      state.myOrderCompletedList = payload ?? [];
    },

    setMyOrderPendingList: (state, { payload }) => {
      state.myOrderPendingList = payload ?? [];
    },

    setMyOrderRejectedList: (state, { payload }) => {
      state.myOrderRejectedList = payload ?? [];
    },
    setMyOrderCancelledList: (state, { payload }) => {
  state.myOrderCancelledList = payload ?? [];
},

setMyOrderExpiredList: (state, { payload }) => {
  state.myOrderExpiredList = payload ?? [];
},

    resetMyOrder: () => initialState,
  },
});

export const {
  setLoading,
  setBtnLoading,
  setMyOrderAllList,
  setMyOrderCompletedList,
  setMyOrderPendingList,
  setMyOrderRejectedList,
   setMyOrderCancelledList,
  setMyOrderExpiredList,
} = myOrderSlice.actions;

export const myOrderReducer = myOrderSlice.reducer;