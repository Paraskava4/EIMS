import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "tokenVerify";
export const tokenVerifyApi = createApi({
    reducerPath: "tokenVerifyApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/token`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        GetTokenVerify: builder.mutation({
            query: (Token) => {
                return {
                    url: `/${Token}`,
                    method: "GET",
                };
            },
            transformResponse: (response, meta, arg) => response,
            transformErrorResponse: (response, meta, arg) => response,
            invalidatesTags: (result, error, arg) => error && [type],
        }),
    }),
});

export const { useGetTokenVerifyMutation } = tokenVerifyApi;
