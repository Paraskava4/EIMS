import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";
import isSuccess from "../utils/constants/validation/response";

const type = "ApplyLeave";

export const applyLeaveApi = createApi({
    reducerPath: "applyLeaveApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/leave`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getApplyLeave: builder.query({
            query: (studentId) => ({
                url: `/lastLeave/${studentId}`,
                method: "GET",
            }),
            providesTags: [type],
        }),
        crateApplyLeave: builder.mutation({
            query: (body) => ({
                url: "/create",
                method: "POST",
                body,
            }),
            transformResponse: (response, meta, arg) => isSuccess(response),
        }),
    }),
});

export const { useGetApplyLeaveQuery, useCrateApplyLeaveMutation } = applyLeaveApi;
