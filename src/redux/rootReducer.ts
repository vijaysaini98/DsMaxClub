import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../actions/auth/authSlice';
import { homeReducer } from '@actions/home/homeSlice';
import { myRequestReducer } from '@actions/myRequest/myRequestSlice';
import { myCardReducer } from '@actions/myCard/myCardSlice';
import { dealReducer } from '@actions/deals/dealSlice';
import { historyReducer } from '@actions/history/historySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  myRequest: myRequestReducer,
  myCard: myCardReducer,
  deal: dealReducer,
  history: historyReducer,
});

export default rootReducer;
