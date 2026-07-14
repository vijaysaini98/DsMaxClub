import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  persistReducer } from 'redux-persist';

import { authReducer } from '../actions/auth/authSlice';
import { homeReducer } from '@actions/home/homeSlice';
import { myRequestReducer } from '@actions/myRequest/myRequestSlice';
import { myCardReducer } from '@actions/myCard/myCardSlice';
import { dealReducer } from '@actions/deals/dealSlice';
import { historyReducer } from '@actions/history/historySlice';
import { execuitveRequestReducer } from '@actions/executiveRequest.tsx/executiveRequestSlice';
import { cartReducer } from '@actions/cart/cartSlice';
import { myOrderReducer } from '@actions/myOrders/myOrderSlice';
import { imageReducer } from '@actions/staticImages/staticImagesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  myRequest: myRequestReducer,
  myCard: myCardReducer,
  deal: dealReducer,
  history: historyReducer,
  executiveRequest: execuitveRequestReducer,
  cart: cartReducer,
  myOrder: myOrderReducer,
  imagesSlice: imageReducer,
});

// persistConfig must be defined BEFORE it's used
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['imagesSlice'], // ← must match the reducer key above exactly
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, 
//     }),
// });

export default persistedReducer;