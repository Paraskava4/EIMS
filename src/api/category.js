import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "category";
export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/category`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => {
                return {
                    url: "/get",
                    method: "GET",
                };
            },
            providesTags: [type],
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: "/create",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        updateCategory: builder.mutation({
            query: (body) => ({
                url: `/update/${body._id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response, meta, arg) => {
                return response;
            },
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
    }),
});

export const { useGetCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;
