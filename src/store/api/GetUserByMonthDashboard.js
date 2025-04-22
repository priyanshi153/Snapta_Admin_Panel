import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Total from '../../types/AllTotalDashboard'
import Cookies from 'js-cookie'

const baseURL = "http://192.168.0.5:8002/api/";

export const getGrowth = createApi({
  reducerPath: "getGrowth",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getGrowth: builder.query({
      query: (token) => ({
        url: "user_month_wisedata",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { token }, // Sending token in request body
      }),
    }),
  }),
});

export const { useGetGrowthQuery } = getGrowth;
