'use client';

import { type PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';

import { type Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { type AppStore, makeStore } from '@/lib/store';

const ReduxStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<AppStore>();
  const persistorRef = useRef<Persistor>({} as Persistor);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export { ReduxStoreProvider };
