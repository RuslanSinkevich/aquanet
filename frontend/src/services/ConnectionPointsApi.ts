import { createApi } from "@reduxjs/toolkit/query/react";
import type { 
  IConnectionPoint,
  IConnectionPointCreateDto,
} from "../models/ConnectionPoint/connection-point.model";
import baseQueryWithReauth from "./BaseQuery";

export const ConnectionPointsApi = createApi({
  reducerPath: "connectionPointsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ConnectionPoint'],
  endpoints: (builder) => ({
    // Получение списка всех точек подключения
    getConnectionPoints: builder.query<IConnectionPoint[], void>({
      query: () => "connection-points",
      providesTags: ['ConnectionPoint'],
    }),

    // Получение конкретной точки подключения по ID
    getConnectionPoint: builder.query<IConnectionPoint, number>({
      query: (id) => `connection-points/${id}`,
      providesTags: ['ConnectionPoint'],
    }),

    // Создание новой точки подключения
    createConnectionPoint: builder.mutation<IConnectionPoint, IConnectionPointCreateDto>({
      query: (data) => ({
        url: "connection-points",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['ConnectionPoint'],
    }),

    // Обновление существующей точки подключения
    updateConnectionPoint: builder.mutation<IConnectionPoint, { id: number; point: Partial<IConnectionPoint> }>({
      query: ({ id, point }) => ({
        url: `connection-points/${id}`,
        method: "PUT",
        body: point,
      }),
      invalidatesTags: ['ConnectionPoint'],
    }),

    // Удаление точки подключения
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