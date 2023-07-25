import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/user';
import { apiSlice } from '../services/reAuth';
import userReducer from './slices/userSlice';
import trackReducer from './slices/trackSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    track: trackReducer,
    filter: filterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(apiSlice.middleware),
});
