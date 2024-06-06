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
          <main className="flex h-screen w-screen flex-col items-center justify-center gap-6 p-6 transition-[padding,gap] sm:gap-8 sm:p-8">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
