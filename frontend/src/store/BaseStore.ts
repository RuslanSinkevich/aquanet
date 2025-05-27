// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "store/slice/AuthSlice";
import { AuthApi } from "../services/AuthApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
