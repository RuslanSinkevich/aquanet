import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './BaseQuery';
import type { 
  IMaterial, 
  IMaterialCreateDto, 
  IMaterialUpdateDto 
} from '../models/Material/material.model';

export const MaterialsApi = createApi({
  reducerPath: 'materialsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Materials'],
  endpoints: (builder) => ({
    getMaterials: builder.query<IMaterial[], void>({
      query: () => 'materials',
      providesTags: ['Materials'],
    }),

    getMaterial: builder.query<IMaterial, number>({
      query: (id) => `materials/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Materials', id }],
    }),

    createMaterial: builder.mutation<IMaterial, IMaterialCreateDto>({
      query: (material) => ({
        url: 'materials',
        method: 'POST',
        body: material,
      }),
      invalidatesTags: ['Materials'],
    }),

    updateMaterial: builder.mutation<IMaterial, { id: number; material: IMaterialUpdateDto }>({
      query: ({ id, material }) => ({
        url: `materials/${id}`,
        method: 'PUT',
        body: material,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Materials', id },
        'Materials',
      ],
    }),

    deleteMaterial: builder.mutation<void, number>({
      query: (id) => ({
        url: `materials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Materials'],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = MaterialsApi; 