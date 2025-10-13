import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    categoryListData: [],
    categoryBookletData: [],
    bannerList: {},
    bookletList: [],
    bookletDetailAllDeals: {},
    bookletDetailAbout: {},
    bookletDetailGallery: {},
    bookletDetailT_C: {},
    comboBookletDeals: [],
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setBtnLoading: (state, { payload }) => {
            state.isBtnLoading = payload;
        },
        setCategoriListData: (state, { payload }) => {
            state.categoryListData = payload;
        },
        setCategoriBookletData: (state, { payload }) => {
            state.categoryBookletData = payload;
        },
        setBannerData: (state, { payload }) => {
            state.bannerList = payload;
        },
        setBookletList: (state, { payload }) => {
            state.bookletList = payload;
        },
        setBookletDetailAllDeals: (state, { payload }) => {
            state.bookletDetailAllDeals = payload;
        },
        setBookletDetailAbout: (state, { payload }) => {
            state.bookletDetailAbout = payload;
        },
        setBookletDetailGallery: (state, { payload }) => {
            state.bookletDetailGallery = payload;
        },
        setBookletDetailT_C: (state, { payload }) => {
            state.bookletDetailT_C = payload;
        },
        setComboBookletDeals: (state, { payload }) => {
            state.comboBookletDeals = payload;
        },
        resetHome: () => initialState,
    },
});
export const {
    setLoading,
    setBtnLoading,
    setCategoriListData,
    setCategoriBookletData,
    resetHome,
    setBannerData,
    setBookletList,
    setBookletDetailAllDeals,
    setBookletDetailT_C,
    setBookletDetailGallery,
    setBookletDetailAbout,
    setComboBookletDeals
}: any = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
