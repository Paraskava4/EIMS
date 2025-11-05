import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";
import { showSuccessToast } from "../utils/constants/api/toast";
import isSuccess from "../utils/constants/validation/response";

const type = "IncomeAndExpense";
export const incomeAndExpenseApi = createApi({
    reducerPath: "IncomeAndExpenseApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getIncome: builder.query({
            query: () => {
                return {
                    url: "/income/get",
                    method: "GET",
                };
            },
            providesTags: [type],
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        getExpense: builder.query({
            query: () => {
                return {
                    url: "/expense/get",
                    method: "GET",
                };
            },
            providesTags: [type],
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        createIncome: builder.mutation({
            query: (body) => ({
                url: "/income/create",
                method: "POST",
                body,
            }),
            transformResponse: (response, meta, arg) => isSuccess(response),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        createExpense: builder.mutation({
            query: (body) => ({
                url: "/expense/create",
                method: "POST",
                body,
            }),
            transformResponse: (response, meta, arg) => isSuccess(response),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        deleteIncome: builder.mutation({
            query: (id) => ({
                url: `/income/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response, meta, arg) => isSuccess(response),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/expense/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response, meta, arg) => {
                return isSuccess(response);
            },
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        updateIncome: builder.mutation({
            query: ({ id, ...data }) => {
                return {
                    url: `/income/update/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            transformResponse: (response, meta, arg) => isSuccess(response),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        updateExpense: builder.mutation({
            query: ({ id, ...data }) => {
                return {
                    url: `/expense/update/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            transformResponse: (response, meta, arg) => isSuccess(response),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
    }),
});

export const {
    useGetIncomeQuery,
    useGetExpenseQuery,
    useCreateIncomeMutation,
    useCreateExpenseMutation,
    useDeleteIncomeMutation,
    useDeleteExpenseMutation,
    useUpdateIncomeMutation,
    useUpdateExpenseMutation,
} = incomeAndExpenseApi;
