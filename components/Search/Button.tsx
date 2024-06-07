'use client';

import type { ComponentPropsWithoutRef } from 'react';

import type { LucideIcon } from 'lucide-react';

import type { Key } from '@/components/Key';
import { ShortcutIndicator } from '@/components/ShortcutIndicator';
import { cn } from '@/lib/utils';

interface ButtonProps {
  icon: LucideIcon;
  text?: string;
  ariaLabel?: string;
  onClick: () => void;
  className?: string;
  requiredCode?: ComponentPropsWithoutRef<
    typeof ShortcutIndicator
  >['requiredCode'];
  keyLabel?: ComponentPropsWithoutRef<typeof ShortcutIndicator>['keyLabel'];
  keyClassName?: ComponentPropsWithoutRef<typeof Key>['className'];
}

export function Button({
  icon: Icon,
  text,
  ariaLabel,
  className,
  onClick,
  requiredCode,
  keyLabel,
  keyClassName,
}: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded text-sm font-semibold text-base-700 outline-none ring-accent-500 ring-offset-2 ring-offset-white transition-all hover:bg-base-200 focus-visible:ring-2 active:scale-95 dark:text-base-dark-300 dark:ring-offset-base-dark-900 dark:hover:bg-base-dark-800',
        text ? 'px-2.5 py-2' : 'p-1',
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <Icon size={20} />
        {text && <span>{text}</span>}
      </div>
      {requiredCode && keyLabel && (
        <ShortcutIndicator
          onFire={onClick}
          requiredCode={requiredCode}
          keyLabel={keyLabel}
          keyClassName={keyClassName}
        />
      )}
    </button>
  );
}
