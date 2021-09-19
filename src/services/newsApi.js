import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const headers = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "7b64fcac56mshad4024c78e90d38p19df6bjsn58728722ae06",
};

const createUrlWithHeaders = (url) => ({ url, headers: headers }); // this is for like mixing url and headers

export const newsApi = createApi({
  reducerPath:'newsApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) => createUrlWithHeaders(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const {useGetNewsQuery} = newsApi