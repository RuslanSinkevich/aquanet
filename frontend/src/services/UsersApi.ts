import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser, IUserCreateDto, IUserUpdateDto } from '../models/Users/user.model';
import baseQuery from './BaseQuery';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    getUser: builder.query<IUser, number>({
      query: (id: number) => `users/${id}`,
      providesTags: ['User'],
    }),
    createUser: builder.mutation<IUser, IUserCreateDto>({
      query: (user: IUserCreateDto) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<IUser, { id: number; user: IUserUpdateDto }>({
      query: ({ id, user }: { id: number; user: IUserUpdateDto }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id: number) => ({
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