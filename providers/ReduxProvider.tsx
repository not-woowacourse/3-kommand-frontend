'use client';

import { type PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { type AppStore, makeStore } from '@/states/store';

export function ReduxProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistor} loading={<div>adsf</div>}>
        {children}
      </PersistGate>
    </Provider>
  );
}
