import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  userData: undefined,
  cityList: [],
  termsCondition:{},
  privacyPolicy:{}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setBtnLoading: (state, { payload }) => {
      state.isBtnLoading = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    setCityList: (state, { payload }) => {
      state.cityList = payload;
    },
    setTermCondition:(state,{payload})=>{
      state.termsCondition = payload;
    },
    setPrivacyPolicy:(state,{payload})=>{
      state.privacyPolicy = payload;
    },
    resetAuth: (state, { payload }) => {
      return initialState;
    },
  },
});
export const { setLoading, setBtnLoading, setUserData, setCityList,setTermCondition,setPrivacyPolicy, resetAuth }: any = authSlice.actions;
export const authReducer = authSlice.reducer;
