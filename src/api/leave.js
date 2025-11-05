import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "leave";

export const leaveApi = createApi({
    reducerPath: "leaveApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/leave`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getLeave: builder.query({
            query: () => ({
                url: `/get`,
                method: "GET",
            }),
            providesTags: [type],
        }),
        updateLeave: builder.mutation({
            query: (body) => ({
                url: `/update/${body?.leaveId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
    }),
});

export const { useGetLeaveQuery, useUpdateLeaveMutation } = leaveApi;
