'use client';

import { type PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';

import { type AppStore, makeStore } from '@/states/store';

export function ReduxProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
