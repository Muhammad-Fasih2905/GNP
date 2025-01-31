import {configureStore, combineReducers, UnknownAction} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from './user/userSlice';
import commonSlice from './common/commonSlice';
import productSlice from './product/productSlice';
import cardSlice from './card/cardSlice';
import orderSlice from './order/orderSlice';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const reducers = combineReducers({
  cardSlice,
  userSlice,
  commonSlice,
  productSlice,
  orderSlice
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userSlice'],
};

// const persistedReducers = persistReducer(persistConfig, reducers);
// const dynamicReducer = (state: any, action: UnknownAction) => {
//   // if (action.type === 'users/saveRememberMe' && action.payload?.rememberMe === false) {
//     if (action.type === 'users/setToken' && state && !state.rememberMe) {
//     // Clear persisted state when rememberMe is false
//     state = undefined;
//   }
//   return reducers(state, action);
// };

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
