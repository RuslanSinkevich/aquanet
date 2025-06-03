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
          const token = data.access_token;
          setAuthCookie(token, data.user);
          dispatch(setCredentials({ token, user: data.user }));
        } catch (error) {
          console.error('Login error:', error);
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
