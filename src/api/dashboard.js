import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/dashBoard`,
        prepareHeaders,
    }),
    tagTypes: ["dashBoardDetailsGet"],
    endpoints: (builder) => ({
        dashBoardDetailsGet: builder.query({
            query: () => {
                return {
                    url: "/get",
                    method: "GET",
                };
            },
            transformResponse: (response, meta, arg) => {
                if (response?.status === 200) return response.data;
            },
            providesTags: ["dashBoardDetailsGet"],
        }),
    }),
});

export const { useDashBoardDetailsGetQuery } = dashboardApi;
