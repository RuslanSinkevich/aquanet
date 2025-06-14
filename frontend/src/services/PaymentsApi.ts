import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPayment, IPaymentCreateDto, IPaymentUpdateDto } from '../models/Payment/payment.model';
import { getAuthToken } from '../utils/Cookies';

export const PaymentsApi = createApi({
  reducerPath: 'paymentsApi',
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
  tagTypes: ['Payment'],
  endpoints: (builder) => ({
    getPayments: builder.query<IPayment[], void>({
      query: () => 'payments',
      providesTags: ['Payment'],
    }),
    getPayment: builder.query<IPayment, number>({
      query: (id) => `payments/${id}`,
      providesTags: ['Payment'],
    }),
    createPayment: builder.mutation<IPayment, IPaymentCreateDto>({
      query: (payment) => ({
        url: 'payments',
        method: 'POST',
        body: payment,
      }),
      invalidatesTags: ['Payment'],
    }),
    updatePayment: builder.mutation<IPayment, { id: number; payment: IPaymentUpdateDto }>({
      query: ({ id, payment }) => ({
        url: `payments/${id}`,
        method: 'PATCH',
        body: payment,
      }),
      invalidatesTags: ['Payment'],
    }),
    deletePayment: builder.mutation<void, number>({
      query: (id) => ({
        url: `payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payment'],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = PaymentsApi; 