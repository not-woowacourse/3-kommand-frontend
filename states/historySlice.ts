import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type HistoryState = string[];

const initialState: HistoryState = [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    prepend: (state, action: PayloadAction<string>) => {
      state.unshift(action.payload);
    },
    reset: (_state) => {
      return initialState;
    },
  },
});

export const { prepend, reset } = historySlice.actions;
export const historyReducer = historySlice.reducer;
