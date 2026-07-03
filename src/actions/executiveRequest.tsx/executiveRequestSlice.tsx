import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    isImageLoading:false,
    isRefresh: false,
    executiveRequestAllList: [],
    executiveRequestPendingList: [],
    executiveRequestApproveList: [],
    executiveRequestRejectList: [],
    executiveRequestUserDetails:{}
};

export const executiveRequestSlice = createSlice({
    name: 'executive',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setBtnLoading: (state, { payload }) => {
            state.isBtnLoading = payload;
        },
         setImageLoading: (state, { payload }) => {
            state.isImageLoading = payload;
        },
        setExecutiveRequestAllList: (state, { payload }) => {
            
            state.executiveRequestAllList = payload;
        },
         setExecutiveApproveList: (state, { payload }) => {
            state.executiveRequestApproveList = payload;
        },
        setExecutiveRequestPendingList: (state, { payload }) => {
            
            state.executiveRequestPendingList = payload;
        },
        setExecutiveRequestRejectList: (state, { payload }) => {
            state.executiveRequestRejectList = payload;
        },
        setExecutiveRequestUserDetails:(state, { payload }) => {
            state.executiveRequestUserDetails = payload;
        },
            setIsRefresh: (state, { payload }) => {
            state.isRefresh = payload;
        },
        resetExecutiveRequest: () => initialState, // ✅ proper reset
    },
});

export const {
    setLoading,
    setBtnLoading,
    setImageLoading,
    setExecutiveRequestAllList,
    setExecutiveRequestPendingList,
    setExecutiveApproveList,
    setExecutiveRequestRejectList,
    setExecutiveRequestUserDetails,
    resetExecutiveRequest,
    setIsRefresh,
} = executiveRequestSlice.actions;

export const execuitveRequestReducer = executiveRequestSlice.reducer;
