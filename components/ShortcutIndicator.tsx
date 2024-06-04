'use client';

import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Command } from 'lucide-react';

import { Key } from '@/components/Key';

interface ShortcutIndicator {
  onFire: () => void;
  // pass lowercase values if using an alphabet
  requiredKey: KeyboardEvent['key'];
  requiredKeyAlt?: KeyboardEvent['key'];
  keyClassName?: ComponentPropsWithoutRef<typeof Key>['className'];
}

export function ShortcutIndicator({
  onFire,
  requiredKey,
  requiredKeyAlt,
  keyClassName,
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
      <Key pressed={isModifierPressed} className={keyClassName}>
        {requiredModifier === 'Meta' ? (
          <Command size={12} strokeWidth={2.5} />
        ) : (
          requiredModifier
        )}
      </Key>
      <Key pressed={isRequiredKeyPressed} className={keyClassName}>
        {requiredKey.toUpperCase()}
      </Key>
    </div>
  );
}
