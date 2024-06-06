import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { Detail } from '@/states/searchApi';

const initialState: Detail[] = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    prepend: (state, { payload }: PayloadAction<{ item: Detail }>) => {
      return [
        payload.item,
        ...state.filter((item) => item.id !== payload.item.id),
      ];
    },
    remove: (state, { payload }: PayloadAction<{ id: Detail['id'] }>) => {
      return state.filter((item) => item.id !== payload.id);
    },
    reset: () => initialState,
  },
});

export const { prepend, remove, reset } = historySlice.actions;
export const historyReducer = historySlice.reducer;
