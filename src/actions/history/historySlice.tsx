import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    vendorHistoryList: [],
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setBtnLoading: (state, { payload }) => {
            state.isBtnLoading = payload;
        },
       setVendorHistory:(state, { payload }) => {
            state.vendorHistoryList = payload;
        },
        resetHistory: (state, { payload }) => {
            state = initialState;
        },
    },
});
export const {
    setLoading,
    setBtnLoading,
    setVendorHistory,
    resetHistory,
}: any = historySlice.actions;
export const historyReducer = historySlice.reducer;
