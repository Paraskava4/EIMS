import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "ParentChild";

export const parentChildApi = createApi({
    reducerPath: "parentChildApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/dashBoard`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getParentChild: builder.query({
            query: () => ({
                url: `/parent`,
                method: "GET",
            }),
            providesTags: [type],
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
    }),
});

export const { useGetParentChildQuery } = parentChildApi;
