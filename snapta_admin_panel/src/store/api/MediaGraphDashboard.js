import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Total from '../../types/AllTotalDashboard'
import Cookies from 'js-cookie'

const baseURL = "http://192.168.0.5:8002/api/";

export const getMediaGraph = createApi({
  reducerPath: "getMediaGraph",
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
    getMediaGraph: builder.query({
      query: (token) => ({
        url: "media_graph",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { token }, // Sending token in request body
      }),
    }),
  }),
});

export const { useGetMediaGraphQuery } = getMediaGraph;
