import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { type Driver, rememberEnhancer, rememberReducer } from 'redux-remember';

import { historyReducer } from '@/states/historySlice';
import { searchApi } from '@/states/searchApi';

const dumbStorage: Driver = {
  getItem: () => {},
  setItem: () => {},
};

const rememberedKeys = ['history'];

const rememberedReducer = rememberReducer({
  history: historyReducer,
  [searchApi.reducerPath]: searchApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rememberedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchApi.middleware),
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(
        rememberEnhancer(
          typeof window === 'undefined' ? dumbStorage : window.localStorage,
          rememberedKeys,
        ),
      ),
  });

  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
