import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "ParentDashboard";

export const parentDashboardApi = createApi({
    reducerPath: "parentDashboardApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/dashBoard`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: (studentId) => ({
                url: `/childData/${studentId}`,
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
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
    }),
});

export const { useGetDashboardQuery, useCrateApplyLeaveMutation } = parentDashboardApi;
