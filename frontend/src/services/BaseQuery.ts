import {
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/config";
import { RootState } from "store/store";
import { logout } from "store/slice/AuthSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl(),
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Нет refreshToken — просто логаутим пользователя
    api.dispatch(logout());
  }

  return result;
};

export default baseQueryWithReauth;
