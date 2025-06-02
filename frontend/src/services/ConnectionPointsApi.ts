import { createApi } from "@reduxjs/toolkit/query/react";
import type { 
  IConnectionPoint,
  ICreateConnectionPointDto,
} from "../models/ConnectionPoint/connection-point.model";
import baseQueryWithReauth from "./BaseQuery";

export const ConnectionPointsApi = createApi({
  reducerPath: "connectionPointsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ConnectionPoint'],
  endpoints: (builder) => ({
    getConnectionPoints: builder.query<IConnectionPoint[], void>({
      query: () => "connection-points",
      providesTags: ['ConnectionPoint'],
    }),

    getConnectionPoint: builder.query<IConnectionPoint, number>({
      query: (id) => `connection-points/${id}`,
      providesTags: ['ConnectionPoint'],
    }),

    createConnectionPoint: builder.mutation<IConnectionPoint, ICreateConnectionPointDto>({
      query: (data) => ({
        url: "connection-points",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['ConnectionPoint'],
    }),

    updateConnectionPoint: builder.mutation<IConnectionPoint, { id: number; point: Partial<IConnectionPoint> }>({
      query: ({ id, point }) => ({
        url: `connection-points/${id}`,
        method: "PUT",
        body: point,
      }),
      invalidatesTags: ['ConnectionPoint'],
    }),

    deleteConnectionPoint: builder.mutation<void, number>({
      query: (id) => ({
        url: `connection-points/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['ConnectionPoint'],
    }),
  }),
});

export const {
  useGetConnectionPointsQuery,
  useGetConnectionPointQuery,
  useCreateConnectionPointMutation,
  useUpdateConnectionPointMutation,
  useDeleteConnectionPointMutation,
} = ConnectionPointsApi; 