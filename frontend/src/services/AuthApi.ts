import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "models/Users/Auth";
import { baseUrl } from "config/config";
import { User } from "models/Users/User";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl() }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (raw: any): LoginResponse => {
        // raw — { accessToken, userId, firstName, lastName, phone, houseNumber }
        const user: User = {
          id: raw.userId,
          firstName: raw.firstName,
          lastName: raw.lastName,
          phone: raw.phone,
          houseNumber: raw.houseNumber,
          createdAt: "", // если нет дома в ответе, можно оставить пустую строку
        };
        return {
          accessToken: raw.accessToken, // приводим к snake_case
          user,
        };
      },
    }),

    getProfile: builder.query<User, void>({
      query: () => "auth/me", // ваш URL для получения текущего пользователя
      // не сохраняем навсегда в кеше, чтобы всегда проверять актуальность:
      keepUnusedDataFor: 0,
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

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  AuthApi;
