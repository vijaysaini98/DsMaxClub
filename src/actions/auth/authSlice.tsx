import { createSlice } from '@reduxjs/toolkit';
import howToRedeem from '@screens/detail/ui/howToRedeem';
export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  userData: undefined,
  cityList: [],
  termsCondition:{},
  privacyPolicy:{},
  refundPolicy :{},
  howToRedeem:{},
  appInfo:{},
  maintenanceInfo: null,
  staticImages:{}
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
      setRefundPolicy:(state,{payload})=>{
      state.refundPolicy = payload;
    },
     setHowToRedeem:(state,{payload})=>{
      state.howToRedeem = payload;
    },
   setAppinfo : (state,{payload})=>{
      state.appInfo = payload
    },
    setMaintenanceInfo: (state, { payload }) => {
  state.maintenanceInfo = payload;
},
setStaticImages: (state, action) => {
  state.staticImages = action.payload;
},
    resetAuth: () => initialState, 
  },
});
export const { setLoading, setBtnLoading, setUserData, setCityList,
  setTermCondition,setPrivacyPolicy,setHowToRedeem, resetAuth,setAppinfo,setMaintenanceInfo,setStaticImages,setRefundPolicy }: any = authSlice.actions;
export const authReducer = authSlice.reducer;
