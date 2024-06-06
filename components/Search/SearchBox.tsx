'use client';

import {
  type ChangeEventHandler,
  type ComponentPropsWithoutRef,
  type FocusEventHandler,
  useRef,
} from 'react';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import { ShortcutIndicator } from '@/components/ShortcutIndicator';

interface SearchBoxProps {
  query: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  placeholder: string;
  requiredKey: ComponentPropsWithoutRef<
    typeof ShortcutIndicator
  >['requiredKey'];
  requiredKeyAlt?: ComponentPropsWithoutRef<
    typeof ShortcutIndicator
  >['requiredKeyAlt'];
}

export function SearchBox({
  query,
  onChange,
  onFocus,
  placeholder,
  requiredKey,
  requiredKeyAlt,
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // XXX: motion.search가 없다.
    <motion.div
      layout
      transition={{ mass: 0.5 }}
      className="relative w-full max-w-96"
    >
      <input
        ref={inputRef}
        placeholder={placeholder}
        value={query}
        onChange={onChange}
        onFocus={onFocus}
        type="search"
        inputMode="text"
        className="peer w-full rounded-lg border border-base-200 bg-white px-3 py-2 pl-9 text-base-700 placeholder-base-300 shadow-sm transition-all focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-body disabled:cursor-not-allowed disabled:opacity-50 dark:border-base-dark-700 dark:bg-base-dark-900 dark:text-base-dark-200 dark:placeholder-base-dark-600 dark:focus-visible:ring-offset-body-dark enabled:[&:not(:focus-visible)]:hover:bg-base-100 dark:enabled:[&:not(:focus-visible)]:hover:bg-base-dark-800"
      />
      <ShortcutIndicator
        onFire={() => inputRef.current?.focus()}
        requiredKey={requiredKey}
        requiredKeyAlt={requiredKeyAlt}
        absolute
      />
      <Search
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-400 dark:text-base-dark-600"
        size={18}
        strokeWidth={2.5}
      />
    </motion.div>
  );
}
