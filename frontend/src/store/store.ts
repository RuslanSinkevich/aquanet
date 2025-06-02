import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AuthApi } from '../services/AuthApi';
import { ConnectionPointsApi } from '../services/ConnectionPointsApi';
import { ClientsApi } from '../services/ClientsApi';
import authReducer from './slice/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ConnectionPointsApi.reducerPath]: ConnectionPointsApi.reducer,
    [ClientsApi.reducerPath]: ClientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      ConnectionPointsApi.middleware,
      ClientsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 