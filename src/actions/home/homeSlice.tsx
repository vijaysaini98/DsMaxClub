import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    categoryListData: [],
    categoryBookletData: []
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setCategoriListData: (state, { payload }) => {
            state.categoryListData = payload;
        },
        setCategoriBookletData: (state, { payload }) => {
            state.categoryBookletData = payload;
        },
        resetHome: (state, { payload }) => {
            state = initialState;
        },
    },
});
export const { setLoading, setCategoriListData, setCategoriBookletData, resetHome }: any = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
