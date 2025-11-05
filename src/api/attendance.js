import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "attendance";
export const attendanceApi = createApi({
    reducerPath: "attendanceApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/attendance`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getAttendance: builder.query({
            query: (id) => {
                return {
                    url: `/childAttendance/${id}`,
                    method: "GET",
                };
            },
            transformResponse: (response, meta, arg) => {
                if (response?.status === 200) return response;
            },
            providesTags: [type],
        }),
    }),
});

export const { useGetAttendanceQuery } = attendanceApi;
