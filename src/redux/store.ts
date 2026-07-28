import {configureStore} from '@reduxjs/toolkit';
// import {setAutoFreeze} from 'immer';
import rootReducer from './rootReducer';
import { persistStore } from 'redux-persist';

// setAutoFreeze(false);
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
