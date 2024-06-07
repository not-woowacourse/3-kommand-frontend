import { type Metadata } from 'next';
import localFont from 'next/font/local';

import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { ReduxStoreProvider } from '@/providers/redux-store-provider';

import './globals.css';

const wantedSansVariable = localFont({
  src: '../public/fonts/WantedSansVariable.woff2',
  display: 'swap',
});

const metadata: Metadata = {
  title: 'Searzh',
  description: '우테코 따라잡기 세번째 구현과제',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko-KR">
      <ReduxStoreProvider>
        <body className={cn(wantedSansVariable.className, 'bg-neutral-50')}>
          {children}
        </body>
      </ReduxStoreProvider>
    </html>
  );
};

export { metadata };
export default RootLayout;
