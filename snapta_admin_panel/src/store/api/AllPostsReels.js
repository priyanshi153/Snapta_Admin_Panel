import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'

const baseURL = "http://192.168.0.5:8002/api/";

export const getAllPostReel = createApi({
  reducerPath: "getAllPostReel",
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
    getAllPostReel: builder.query({
      query: (token) => ({
        url: "get_all_latest_reel_and_post",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { token }, // Sending token in request body
      }),
    }),
  }),
});

export const { useGetAllPostReelQuery } = getAllPostReel;
