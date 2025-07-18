import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../actions/auth/authSlice';
import { homeReducer } from '@actions/home/homeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

export default rootReducer;
