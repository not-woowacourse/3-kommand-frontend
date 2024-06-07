import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { MoviesControllerFindOneData } from '@/__generated__/data-contracts';

const initialState: MoviesControllerFindOneData[] = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    prepend: (
      state,
      { payload }: PayloadAction<{ item: MoviesControllerFindOneData }>,
    ) => {
      return [
        payload.item,
        ...state.filter((item) => item.id !== payload.item.id),
      ];
    },
    remove: (
      state,
      { payload }: PayloadAction<{ id: MoviesControllerFindOneData['id'] }>,
    ) => {
      return state.filter((item) => item.id !== payload.id);
    },
    reset: () => initialState,
  },
});

export const { prepend, remove, reset } = historySlice.actions;
export const historyReducer = historySlice.reducer;
