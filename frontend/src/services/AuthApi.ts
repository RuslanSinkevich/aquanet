import { createApi } from "@reduxjs/toolkit/query/react";
import type { IAuthLoginRequest, IAuthRegisterRequest, IAuthLoginResponse } from "models/Users/Auth";
import { setAuthCookie } from "../utils/Cookies";
import { setCredentials } from "../store/slice/AuthSlice";
import baseQuery from "./BaseQuery";
import { IUser } from "models/Users/user.model";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<IAuthLoginResponse, IAuthLoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const tokenToStore = data.token;

          if (tokenToStore) {
            setAuthCookie(tokenToStore, data.user);
            dispatch(setCredentials({ token: tokenToStore, user: data.user }));
          } else {
            // Можно добавить обработку ошибки, если токен критически важен и не пришел
            console.error("[AuthApi Login] Token from backend was undefined/null.");
          }
        } catch (error) {
          // Можно добавить более специфичную обработку ошибок, например, показывать уведомление пользователю
          console.error('[AuthApi Login] Login error in onQueryStarted:', error);
        }
      },
    }),

    me: builder.query<IUser, void>({
      query: () => "auth/me",
      keepUnusedDataFor: 0,
    }),

    register: builder.mutation<void, IAuthRegisterRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = AuthApi;
