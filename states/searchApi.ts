import {
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { joinURL, withQuery } from 'ufo';

import { API_URL, CLIENT_NAME } from '@/constants/constant';

interface DetailArgs {
  id: number;
}

export type Detail = {
  id: number;
  title: string;
  alternativeTitle: string;
  uci: string;
  url: string;
  year: number;
  region: string; // "한국,미국"
  category: string; // "드라마,코미디"
  rights: string;
};

interface SearchResultsArgs {
  query: string;
  limit?: number;
}

export type SearchResults = (Detail & {
  matchedFields: {
    title: boolean;
    alternativeTitle: boolean;
    rights: boolean;
  };
})[];

export type MatchedFields = keyof SearchResults[number]['matchedFields'];

export const searchApi = createApi({
  reducerPath: 'result',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    headers: { 'client-name': CLIENT_NAME },
    // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
    // fetchBaseQuery assumes every request I make
    // will be json by default
  }),
  endpoints: (builder) => ({
    getDetail: builder.query<Detail, DetailArgs>({
      query: ({ id }) => joinURL('movies/detail', id.toString()),
    }),
    getSearchResults: builder.query<SearchResults, SearchResultsArgs>({
      queryFn: async (
        { query, limit },
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        // empty query인 경우 unexpected한 결과가 오기 때문에 네트워크 요청 없이 빈 배열 반환
        if (query === '') return { data: [] };

        const result = await baseQuery(
          withQuery('movies/search', { query, limit }),
        );

        // query 대신 queryFn을 사용하는 경우 data가 unknown일 것으로 추론하기에 type assertion이 필요합니다.
        // baseQuery가 제너릭을 받아먹어준다면 좀 편할 것 같은데 이유가 있었겠죠...
        // https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#performing-multiple-requests-with-a-single-query
        // https://stackoverflow.com/questions/73979994/rtk-query-typescript-for-custom-queryfn-on-api-endpoint
        return result.data
          ? { data: result.data as SearchResults }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
  }),
});

export const { useGetSearchResultsQuery, useGetDetailQuery } = searchApi;
