import { type Metadata } from 'next';

import { type PropsWithChildren } from 'react';

import { ReduxProvider } from '@/providers/ReduxProvider';

import './globals.css';

const metadata: Metadata = {
  title: 'Searzh',
  description: '우테코 따라잡기 세번째 구현과제',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko-KR">
      <body className="break-keep bg-body dark:bg-body-dark">
        <ReduxProvider>
          <main className="flex h-screen w-screen items-center justify-center p-4">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
