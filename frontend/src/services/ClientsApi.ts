import { createApi } from "@reduxjs/toolkit/query/react";
import { 
  IClient, 
  ICreateClientDto, 
  IUpdateClientDto 
} from "../models/Client/client.model";
import baseQueryWithReauth from "./BaseQuery";

export const ClientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    getClients: builder.query<IClient[], void>({
      query: () => "clients",
      providesTags: ['Client'],
    }),

    getClient: builder.query<IClient, number>({
      query: (id) => `clients/${id}`,
      providesTags: ['Client'],
    }),

    createClient: builder.mutation<IClient, ICreateClientDto>({
      query: (data) => ({
        url: "clients",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Client'],
    }),

    updateClient: builder.mutation<IClient, { id: number; data: IUpdateClientDto }>({
      query: ({ id, data }) => ({
        url: `clients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Client'],
    }),

    deleteClient: builder.mutation<void, number>({
      query: (id) => ({
        url: `clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Client'],
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