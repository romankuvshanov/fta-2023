import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: "https://free-to-play-games-database.p.rapidapi.com/api/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "78eb930ce8msh74b6ad7ad5abe54p137a16jsned1f0cc515fa",
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
