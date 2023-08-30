import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: "https://free-to-play-games-database.p.rapidapi.com/api/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "31a3a25192msh3e11b5f38aa90dfp1f3d21jsn07e71bca244d",
      );
      headers.set(
        "X-RapidAPI-Host",
        "free-to-play-games-database.p.rapidapi.com",
      );
      return headers;
    },
  }),
  {
    maxRetries: 3,
  },
);

export const freetogameApi = createApi({
  reducerPath: "freetogameApi",
  keepUnusedDataFor: 60 * 5,
  baseQuery: staggeredBaseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action?.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getGames: builder.query({
      query: (arg) => {
        const { platform, sort, tag } = arg;
        return `games?platform=${platform}&sort-by=${sort}${
          tag !== "all" ? `&category=${tag}` : ""
        }`;
      },
    }),
    getGame: builder.query({
      query: (gameId) => `game?id=${gameId}`,
    }),
  }),
});

export const { useGetGamesQuery, useGetGameQuery } = freetogameApi;
