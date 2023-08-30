import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const freetogameApi = createApi({
  reducerPath: "freetogameApi",
  keepUnusedDataFor: 60 * 5,
  baseQuery: fetchBaseQuery({
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
