import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "teacher";
export const teacherApi = createApi({
    reducerPath: "teacherApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getTeacherDashboard: builder.query({
            query: () => {
                return {
                    url: "/dashBoard/teacher",
                    method: "GET",
                };
            },
            providesTags: [type],
        }),
        getTeacherProfile: builder.query({
            query: () => {
                return {
                    url: "/confirm/teacher",
                    method: "GET",
                };
            },
            providesTags: [type],
        }),
        getTeacherAttendance: builder.query({
            query: () => {
                return {
                    url: "/confirm/teacherAttendance",
                    method: "GET",
                };
            },
            providesTags: [type],
        }),
    }),
});

export const { useGetTeacherDashboardQuery, useGetTeacherProfileQuery, useGetTeacherAttendanceQuery } = teacherApi;
