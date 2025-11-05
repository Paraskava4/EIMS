import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "noticeStudent";
export const studentNoticeApi = createApi({
    reducerPath: "studentNoticeApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/notice`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getStudentNotice: builder.query({
            query: (id) => {
                return {
                    url: `/noticeData/${id}`,
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

export const { useGetStudentNoticeQuery } = studentNoticeApi;
