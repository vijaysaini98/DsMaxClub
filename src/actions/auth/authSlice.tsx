import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  userData: undefined,
  cityList: []
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
      console.log("payload", payload);

      state.userData = payload;
    },
    setCityList: (state, { payload }) => {
      console.log("payload", payload);

      state.cityList = payload;
    },
    resetAuth: (state, { payload }) => {
      state = initialState;
    },
  },
});
export const { setLoading, setBtnLoading, setUserData, setCityList, resetAuth }: any = authSlice.actions;
export const authReducer = authSlice.reducer;
