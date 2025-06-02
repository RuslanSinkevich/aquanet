import { createApi } from "@reduxjs/toolkit/query/react";
import type { ILoginRequest, IRegisterRequest } from "models/Users/Auth";
import { setAuthCookie } from "../utils/Cookies";
import { setCredentials } from "../store/slice/AuthSlice";
import baseQuery from "./BaseQuery";
import { IUser } from "models/Users/user.model";

interface LoginResponse {
  token: string;
  user: IUser;
}

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          setAuthCookie(data.token, data.user);
          dispatch(setCredentials(data));
        } catch {
          // Handle error
        }
      },
    }),

    getProfile: builder.query<IUser, void>({
      query: () => "auth/me", // ваш URL для получения текущего пользователя
      // не сохраняем навсегда в кеше, чтобы всегда проверять актуальность:
      keepUnusedDataFor: 0,
    }),

    register: builder.mutation<void, IRegisterRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  AuthApi;
