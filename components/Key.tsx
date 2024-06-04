import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type KeyProps = PropsWithChildren & {
  pressed?: boolean;
  className?: string;
};

export function Key({ children, pressed = false, className }: KeyProps) {
  return (
    <kbd
      className={cn(
        'flex items-center font-sans',
        pressed ? 'translate-y-[1px]' : 'shadow-[0_1px]',
        className ??
          'min-h-6 rounded-sm border border-base-300 bg-base-100 px-1 py-0.5 text-[0.6875rem] font-bold leading-none text-base-400 shadow-base-300 dark:border-base-dark-600 dark:bg-base-dark-800 dark:text-base-dark-500 dark:shadow-base-dark-600',
      )}
    >
      {children}
    </kbd>
  );
}
