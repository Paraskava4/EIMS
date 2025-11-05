import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "Fees";
export const feesApi = createApi({
    reducerPath: "feesApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/fees`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getStudentFees: builder.query({
            query: (id) => {
                return {
                    url: `/detail/${id}`,
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

export const { useGetStudentFeesQuery } = feesApi;
