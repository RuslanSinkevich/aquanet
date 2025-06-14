import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "models/Users/user.model";
import {
  getAuthToken,
  getAuthUser,
  clearAuthCookies,
} from "utils/Cookies";

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialToken = getAuthToken();
const initialUser = getAuthUser();

const initialState: IAuthState = {
  token: initialToken,
  user: initialUser,
  isAuthenticated: !!(initialToken && initialUser),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string | null; user: IUser | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = !!(action.payload.token && action.payload.user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      clearAuthCookies();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
