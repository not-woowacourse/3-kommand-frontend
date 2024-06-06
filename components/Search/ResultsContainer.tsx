import type { PropsWithChildren } from 'react';

export function ResultsContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full max-w-96 shrink overflow-hidden rounded-lg border border-base-200 shadow-sm transition-[height] sm:max-h-[40rem] dark:border-base-dark-800">
      <div className="w-full shrink divide-y-4 divide-base-200 overflow-auto bg-white dark:divide-base-dark-800 dark:bg-base-dark-900">
        {children}
      </div>
    </div>
  );
}
