import {createSlice} from '@reduxjs/toolkit';
export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  userData: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setUserData: (state, {payload}) => {
      state.userData = payload;
    },
    resetAuth: (state, {payload}) => {
      state = initialState;
    },
  },
});
export const {setLoading,setUserData,resetAuth}: any = authSlice.actions;
export const authReducer = authSlice.reducer;
