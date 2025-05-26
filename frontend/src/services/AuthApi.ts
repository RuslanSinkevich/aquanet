import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "config/config";

interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  houseNumber: string;
}

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config() }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: builder.mutation<any, RegisterRequest>({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = AuthApi;
