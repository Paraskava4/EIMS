import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";
import isSuccess from "../utils/constants/validation/response";

const type = "Holidays";
export const holidaysApi = createApi({
    reducerPath: "holidaysApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/holiday`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getHolidays: builder.query({
            query: () => {
                return {
                    url: "/holidayGet",
                    method: "GET",
                };
            },
            providesTags: [type],
        }),
        createHolidays: builder.mutation({
            query: (body) => ({
                url: "/holidayCreate",
                method: "POST",
                body,
            }),
            transformResponse: (response, meta, arg) => {
                isSuccess(response);
                return response;
            },
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
    }),
});

export const { useGetHolidaysQuery, useCreateHolidaysMutation } = holidaysApi;
