import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUser, IUserCreateDto, IUserUpdateDto } from '../models/Users/user.model';
import { getAuthToken } from '../utils/Cookies';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    getUser: builder.query<IUser, number>({
      query: (id) => `users/${id}`,
      providesTags: ['User'],
    }),
    createUser: builder.mutation<IUser, IUserCreateDto>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<IUser, { id: number; user: IUserUpdateDto }>({
      query: ({ id, user }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UsersApi; 