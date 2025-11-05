import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";
import { showErrorToast, showSuccessToast } from "../utils/constants/api/toast";

export const standardApi = createApi({
    reducerPath: "standardApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/standard`,
        prepareHeaders,
    }),
    tagTypes: ["Standard"],
    endpoints: (builder) => ({
        getStandard: builder.query({
            query: () => {
                return {
                    url: "/allStandardGet",
                    method: "GET",
                };
            },
            providesTags: ["Standard"],
        }),
        createStandard: builder.mutation({
            query: (body) => ({
                url: "/standardCreate",
                method: "POST",
                body,
            }),
            transformResponse: (response, meta, arg) => {
                response?.status === 201 && showSuccessToast(response?.message);
                return response.data;
            },
            transformErrorResponse: (response, meta, arg) => response.status,
            invalidatesTags: (result, error, arg) => !error && ["Standard"],
        }),
        updateStandard: builder.mutation({
            query: (body) => ({
                url: `/standardUpdate/${body._id}`,
                method: "PUT",
                body,
            }),
            transformResponse: (response, meta, arg) => {
                response?.status === 202 && showSuccessToast(response?.message);
                return response.data;
            },
            transformErrorResponse: (response, meta, arg) => {
                response?.status === 400 && showErrorToast(response?.data?.message);
                return response.data;
            },
            invalidatesTags: (result, error, arg) => !error && ["Standard"],
        }),
        deleteStandard: builder.mutation({
            query: (id) => ({
                url: `/standardDelete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => !error && ["Standard"],
        }),
    }),
});

export const { useGetStandardQuery, useCreateStandardMutation, useUpdateStandardMutation, useDeleteStandardMutation } = standardApi;
