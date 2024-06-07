import { Suspense } from 'react';

import { Logo } from '@/components/Logo';
import { Search } from '@/components/Search';

export default function RootPage() {
  return (
    <>
      <Logo />
      <Suspense
        fallback={
          <div className="flex-1 flex-col items-center justify-end gap-4 sm:justify-center" />
        }
      >
        <Search />
      </Suspense>
    </>
  );
}
