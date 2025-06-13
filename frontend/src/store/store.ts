import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AuthApi } from '../services/AuthApi';
import { ConnectionPointsApi } from '../services/ConnectionPointsApi';
import { ClientsApi } from '../services/ClientsApi';
import { MaterialsApi } from '../services/MaterialsApi';
import { WorkItemsApi } from '../services/WorkItemsApi';
import { UsersApi } from '../services/UsersApi';
import authReducer from './slice/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ConnectionPointsApi.reducerPath]: ConnectionPointsApi.reducer,
    [ClientsApi.reducerPath]: ClientsApi.reducer,
    [MaterialsApi.reducerPath]: MaterialsApi.reducer,
    [WorkItemsApi.reducerPath]: WorkItemsApi.reducer,
    [UsersApi.reducerPath]: UsersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      ConnectionPointsApi.middleware,
      ClientsApi.middleware,
      MaterialsApi.middleware,
      WorkItemsApi.middleware,
      UsersApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 