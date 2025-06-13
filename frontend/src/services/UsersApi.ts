import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './BaseQuery';
import type { IUser } from '../models/User/user.model';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => 'users',
      providesTags: ['Users'],
    }),

    getUser: builder.query<IUser, number>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Users', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
} = UsersApi; 