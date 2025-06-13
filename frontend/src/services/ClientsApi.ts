import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './BaseQuery';
import type { 
  IClient, 
  ICreateClientDto, 
  IUpdateClientDto 
} from '../models/Client/client.model';

export const ClientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    getClients: builder.query<IClient[], void>({
      query: () => 'clients',
      providesTags: ['Clients'],
    }),

    getClient: builder.query<IClient, number>({
      query: (id) => `clients/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Clients', id }],
    }),

    createClient: builder.mutation<IClient, ICreateClientDto>({
      query: (client) => ({
        url: 'clients',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['Clients'],
    }),

    updateClient: builder.mutation<IClient, { id: number; client: IUpdateClientDto }>({
      query: ({ id, client }) => ({
        url: `clients/${id}`,
        method: 'PATCH',
        body: client,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Clients', id },
        'Clients',
      ],
    }),

    deleteClient: builder.mutation<void, number>({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = ClientsApi; 