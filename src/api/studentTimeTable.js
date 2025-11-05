import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "studentTimeTable";
export const studentTimeTableApi = createApi({
    reducerPath: "studentTimeTableApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/timeTable`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getStudentTimeTable: builder.query({
            query: (id) => {
                return {
                    url: `/get/${id}`,
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

export const { useGetStudentTimeTableQuery } = studentTimeTableApi;
