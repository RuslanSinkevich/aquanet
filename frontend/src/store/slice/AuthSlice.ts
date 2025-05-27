// store/slice/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "models/Users/User";

export interface AuthState {
  token: string | null;
  user: User | null;
}

// Инициализация из localStorage
const saved = localStorage.getItem("auth");
const initialState: AuthState = saved
  ? JSON.parse(saved)
  : { token: null, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      console.log("state",state.token);
      
      // Сохраняем сразу в localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
