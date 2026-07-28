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
hasMore: true,
offset: 0,

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
  if (payload?.append) {
    state.myOrderAllList = [
      ...state.myOrderAllList,
      ...(payload.data ?? []),
    ];
  } else {
    state.myOrderAllList = payload?.data ?? [];
  }
},

setMyOrderCompletedList: (state, { payload }) => {
  if (payload?.append) {
    state.myOrderCompletedList = [
      ...state.myOrderCompletedList,
      ...(payload.data ?? []),
    ];
  } else {
    state.myOrderCompletedList = payload?.data ?? [];
  }
},

    setMyOrderPendingList: (state, { payload }) => {
      if (payload?.append) {
    state.myOrderPendingList = [
      ...state.myOrderPendingList,
      ...(payload.data ?? []),
    ];
  } else {
    state.myOrderPendingList = payload?.data ?? [];
  }
    },

    setMyOrderRejectedList: (state, { payload }) => {
      if (payload?.append) {
    state.myOrderRejectedList = [
      ...state.myOrderRejectedList,
      ...(payload.data ?? []),
    ];
  } else {
    state.myOrderRejectedList = payload?.data ?? [];
  }
    },
    setMyOrderCancelledList: (state, { payload }) => {
       if (payload?.append) {
    state.myOrderCancelledList = [
      ...state.myOrderCancelledList,
      ...(payload.data ?? []),
    ];
  } else {
    state.myOrderCancelledList = payload?.data ?? [];
  }
},

setMyOrderExpiredList: (state, { payload }) => {
  if (payload?.append) {
    state.myOrderExpiredList = [
      ...state.myOrderExpiredList,
      ...(payload.data ?? []),
    ];
  } else {
    state.myOrderExpiredList = payload?.data ?? [];
  }

},
setHasMore:(state,{payload})=>{
   state.hasMore=payload;
},

setOffset:(state,{payload})=>{
   state.offset=payload;
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
  setHasMore,
  setOffset
} = myOrderSlice.actions;

export const myOrderReducer = myOrderSlice.reducer;