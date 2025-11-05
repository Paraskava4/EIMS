import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";
import isSuccess from "../utils/constants/validation/response";

const type = "timeTable";
export const timeTableApi = createApi({
    reducerPath: "timeTableApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/timeTable`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        createTimeTable: builder.mutation({
            query: (body) => ({
                url: "/create",
                method: "POST",
                body,
            }),
            transformResponse: (response, meta, arg) => isSuccess(response),
            invalidatesTags: (result, error, arg) => !error && [type],
        }),
    }),
});

export const { useCreateTimeTableMutation } = timeTableApi;
