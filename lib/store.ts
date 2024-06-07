/**
 * @reference https://redux.js.org/usage/nextjs
 */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { moviesApi } from '@/lib/api';
import {
  SEARCH_HISTORY_SLICE_NAME,
  searchHistoryReducer,
} from '@/slices/search-history-slice';

const persistConfig = {
  key: 'redux-persist',
  storage,
  whitelist: [SEARCH_HISTORY_SLICE_NAME],
};

const rootReducer = combineReducers({
  [moviesApi.reducerPath]: moviesApi.reducer,
  [SEARCH_HISTORY_SLICE_NAME]: searchHistoryReducer,
});

const makeStore = () => {
  return configureStore({
    reducer: persistReducer(persistConfig, rootReducer),

    // 캐싱, 요청 취소, 폴링 등등 유용한 rtk-query의 기능들을 위한 api 미들웨어 추가
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // 이렇게 해도 되는거 맞나?
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(moviesApi.middleware),
  });
};

// Infer the type of makeStore
type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export type { AppDispatch, AppStore, RootState };

export { makeStore };
