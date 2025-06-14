import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './BaseQuery';
import type { 
  IWorkItem, 
  IWorkItemCreateDto, 
  IWorkItemUpdateDto 
} from '../models/WorkItem/work-item.model';

export const WorkItemsApi = createApi({
  reducerPath: 'workItemsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['WorkItems'],
  endpoints: (builder) => ({
    getWorkItems: builder.query<IWorkItem[], void>({
      query: () => 'work-items',
      providesTags: ['WorkItems'],
    }),

    getWorkItem: builder.query<IWorkItem, number>({
      query: (id) => `work-items/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'WorkItems', id }],
    }),

    createWorkItem: builder.mutation<IWorkItem, IWorkItemCreateDto>({
      query: (workItem) => ({
        url: 'work-items',
        method: 'POST',
        body: workItem,
      }),
      invalidatesTags: ['WorkItems'],
    }),

    updateWorkItem: builder.mutation<IWorkItem, { id: number; workItem: IWorkItemUpdateDto }>({
      query: ({ id, workItem }) => ({
        url: `work-items/${id}`,
        method: 'PUT',
        body: workItem,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'WorkItems', id },
        'WorkItems',
      ],
    }),

    deleteWorkItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `work-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WorkItems'],
    }),
  }),
});

export const {
  useGetWorkItemsQuery,
  useGetWorkItemQuery,
  useCreateWorkItemMutation,
  useUpdateWorkItemMutation,
  useDeleteWorkItemMutation,
} = WorkItemsApi; 