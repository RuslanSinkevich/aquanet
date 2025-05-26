import { configureStore } from '@reduxjs/toolkit';
import { AuthApi } from 'services/AuthApi';

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    // остальные редьюсеры...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});

// Типы для useSelector и dispatch, если нужны
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
