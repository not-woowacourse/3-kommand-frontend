'use client';

import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Command } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ShortcutIndicator {
  onFire: () => void;
  // pass lowercase values if using an alphabet
  requiredKey: KeyboardEvent['key'];
  requiredKeyAlt?: KeyboardEvent['key'];
}

export function ShortcutIndicator({
  onFire,
  requiredKey,
  requiredKeyAlt,
}: ShortcutIndicator) {
  // XXX: 커버리지가 매우 좁습니다. (약 74%)
  const userAgentDataSupported = typeof navigator.userAgentData !== 'undefined';

  const isMobile = userAgentDataSupported
    ? navigator.userAgentData?.mobile === true
    : undefined;

  const requiredModifier = userAgentDataSupported
    ? navigator.userAgentData?.platform === 'macOS'
      ? 'Meta'
      : 'Ctrl'
    : undefined;

  const [isModifierPressed, setIsModifierPressed] = useState(false);
  const [isRequiredKeyPressed, setIsRequiredKeyPressed] = useState(false);

  const handleKeys = useCallback(
    (event: KeyboardEvent) => {
      switch (event.type) {
        case 'keydown':
          if (event.key === requiredKey || event.key === requiredKeyAlt)
            setIsRequiredKeyPressed(true);
          if (event.key === requiredModifier) setIsModifierPressed(true);

          if (
            event.key === requiredKey &&
            ((requiredModifier === 'Meta' && event.metaKey) ||
              (requiredModifier === 'Ctrl' && event.ctrlKey))
          ) {
            // keeps browser default hotkeys from being triggered
            // e. g. cmd+y
            event.preventDefault();

            onFire();

            // (macOS) keyup is not fired with event.metaKey,
            // so we're manually setting this to false
            // https://stackoverflow.com/q/73412298
            setTimeout(() => setIsRequiredKeyPressed(false), 200);
          }

          break;
        case 'keyup':
          if (event.key === requiredKey || event.key === requiredKeyAlt)
            setIsRequiredKeyPressed(false);
          if (event.key === requiredModifier) setIsModifierPressed(false);
          break;
      }
    },
    [requiredModifier, onFire, requiredKey, requiredKeyAlt],
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeys);
    document.body.addEventListener('keyup', handleKeys);

    return () => {
      document.body.removeEventListener('keydown', handleKeys);
      document.body.removeEventListener('keyup', handleKeys);
    };
  }, [handleKeys]);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-[0.1875rem] opacity-100 transition-opacity peer-focus:peer-[:not(:placeholder-shown)]:opacity-0">
      <Key pressed={isModifierPressed}>
        {requiredModifier === 'Meta' ? (
          <Command size={12} strokeWidth={2.5} />
        ) : (
          requiredModifier
        )}
      </Key>
      <Key pressed={isRequiredKeyPressed}>{requiredKey.toUpperCase()}</Key>
    </div>
  );
}

type KeyProps = PropsWithChildren & {
  pressed?: boolean;
};

function Key({ children, pressed = false }: KeyProps) {
  return (
    <kbd
      className={cn(
        'flex min-h-6 items-center rounded-sm border border-base-300 bg-base-100 px-1 py-0.5 font-sans text-[0.6875rem] font-bold leading-none text-base-400 shadow-base-300 dark:border-base-dark-600 dark:bg-base-dark-800 dark:text-base-dark-500 dark:shadow-base-dark-600',
        pressed ? 'translate-y-[1px]' : 'shadow-[0_1px]',
      )}
    >
      {children}
    </kbd>
  );
}
