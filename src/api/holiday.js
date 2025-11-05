import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "Holiday";
export const holidayApi = createApi({
    reducerPath: "holidayApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/holiday`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getHoliday: builder.query({
            query: () => {
                return {
                    url: "/get",
                    method: "GET",
                };
            },
            providesTags: [type],
        }),
    }),
});

export const { useGetHolidayQuery } = holidayApi;
