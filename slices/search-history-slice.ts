import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type ReadMovieResponseDto } from '@/__generated__/data-contracts';

type SearchHistory = Record<number, ReadMovieResponseDto>;

const initialState: SearchHistory = {};

const SEARCH_HISTORY_SLICE_NAME = 'searchHistory';

/**
 * createSlice: ducks 패턴의 상위호환 느낌
 * @reference https://velog.io/@pest95/createSliceredux-toolkit%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-action%EA%B3%BC-reducer-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
 */
const searchHistorySlice = createSlice({
  name: SEARCH_HISTORY_SLICE_NAME,
  initialState,
  reducers: {
    // createSlice uses Immer internally, so we can "mutate" the state directly
    add: (state, { payload }: PayloadAction<ReadMovieResponseDto>) => {
      state[payload.id] = payload;
    },
    remove: (state, { payload }: PayloadAction<number>) => {
      delete state[payload];
    },
    clear: () => initialState,
  },
});

const searchHistoryReducer = searchHistorySlice.reducer;
const searchHistoryActions = searchHistorySlice.actions;

export {
  SEARCH_HISTORY_SLICE_NAME,
  searchHistoryActions,
  searchHistoryReducer,
  type SearchHistory,
};
