import { configureStore } from '@reduxjs/toolkit';

import { historyReducer } from '@/states/history/historySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      history: historyReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
