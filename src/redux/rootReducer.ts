import {combineReducers} from '@reduxjs/toolkit';
import { authReducer } from '../actions/auth/authSlice';
// import {authReducer} from './slice/authSlice';
// import {busReducer} from './slice/busSlice';

const rootReducer = combineReducers({
  auth: authReducer,
//   bus: busReducer,
});

export default rootReducer;
