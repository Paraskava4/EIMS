import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";
import { api } from "../utils/constants/url";

const type = "Profile";
export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: baseQueryWithAuthInterceptor({
        baseUrl: `${api.baseURL}/confirm`,
        prepareHeaders,
    }),
    tagTypes: [type],
    endpoints: (builder) => ({
        getStudentProfile: builder.query({
            query: (id) => {
                return {
                    url: `/profile/${id}`,
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

export const { useGetStudentProfileQuery } = profileApi;
