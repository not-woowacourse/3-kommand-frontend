import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  type MoviesControllerFindOneData,
  type MoviesControllerSearchData,
  type MoviesControllerSearchParams,
} from '@/__generated__/data-contracts';

const PROXY_API_PREFIX = '/backend-api';

const HTTP_HEADER_KEYS = {
  CLIENT_NAME: 'Client-Name',
};

const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PROXY_API_PREFIX,
    headers: {
      [HTTP_HEADER_KEYS.CLIENT_NAME]: process.env.NEXT_PUBLIC_CLIENT_NAME!,
    },
  }),
  endpoints: (builder) => ({
    moviesControllerSearch: builder.query<
      MoviesControllerSearchData,
      MoviesControllerSearchParams
    >({
      query: (params) => ({
        url: '/movies/search',
        params,
      }),
    }),
    moviesControllerFindOne: builder.query<MoviesControllerFindOneData, number>(
      {
        query: (id) => ({
          url: `/movies/detail/${id}`,
        }),
      },
    ),
  }),
});

export { moviesApi };
export const {
  useMoviesControllerSearchQuery,
  useMoviesControllerFindOneQuery,
} = moviesApi;
