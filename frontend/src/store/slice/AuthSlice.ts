import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "models/Users/user.model";
import {
  getAuthToken,
  getAuthUser,
  setAuthCookie,
  clearAuthCookies,
} from "utils/Cookies";

export interface AuthState {
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: getAuthToken(),
  user: getAuthUser(),
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
        setAuthCookie(token, user);
      }
    },
    logout: (state) => {      
      state.token = null;
      state.user = null;
      clearAuthCookies();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
