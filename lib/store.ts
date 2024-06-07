/**
 * @reference https://redux.js.org/usage/nextjs
 */
import { configureStore } from '@reduxjs/toolkit';

import { moviesApi } from '@/lib/api';

const makeStore = () => {
  return configureStore({
    reducer: {
      // 특정 top-level slice에서 생성된 리듀서를 추가
      [moviesApi.reducerPath]: moviesApi.reducer,
    },

    // 캐싱, 요청 취소, 폴링 등등 유용한 rtk-query의 기능들을 위한 api 미들웨어 추가
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(moviesApi.middleware),
  });
};

// Infer the type of makeStore
type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export type { AppDispatch, AppStore, RootState };

export { makeStore };
