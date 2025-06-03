import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "models/Users/user.model";
import {
  getAuthToken,
  getAuthUser,
  setAuthCookie,
  clearAuthCookies,
} from "utils/Cookies";

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const token = getAuthToken();
const user = getAuthUser();

const initialState: IAuthState = {
  token,
  user,
  isAuthenticated: Boolean(token && user),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: IUser | null }>
    ) => {
      const { token, user } = action.payload;
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        setAuthCookie(token, user);
      }
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
