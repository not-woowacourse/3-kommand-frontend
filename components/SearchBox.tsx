'use client';

import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Search } from 'lucide-react';

import { ShortcutIndicator } from '@/components/ShortcutIndicator';
import { useDebounce } from '@/lib/useDebounce';

interface SearchBoxProps {
  placeholder: string;
  requiredKey: ComponentPropsWithoutRef<
    typeof ShortcutIndicator
  >['requiredKey'];
  requiredKeyAlt?: ComponentPropsWithoutRef<
    typeof ShortcutIndicator
  >['requiredKeyAlt'];
  debounceMilliseconds: number;
}

export function SearchBox({
  placeholder,
  requiredKey,
  requiredKeyAlt,
  debounceMilliseconds,
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const deboundedQuery = useDebounce(query, debounceMilliseconds);

  useEffect(() => {
    console.log(deboundedQuery);
  }, [deboundedQuery]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        type="search"
        inputMode="text"
        className="peer w-full rounded-lg border border-base-200 bg-white px-3 py-2 pl-9 text-base-700 placeholder-base-300 shadow-sm transition-all focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-body disabled:cursor-not-allowed disabled:opacity-50 dark:border-base-dark-700 dark:bg-base-dark-900 dark:text-base-dark-200 dark:placeholder-base-dark-600 dark:focus-visible:ring-offset-body-dark enabled:[&:not(:focus-visible)]:hover:bg-base-100 dark:enabled:[&:not(:focus-visible)]:hover:bg-base-dark-800"
      />
      <ShortcutIndicator
        onFire={() => inputRef.current?.focus()}
        requiredKey={requiredKey}
        requiredKeyAlt={requiredKeyAlt}
      />
      <Search
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-400 dark:text-base-dark-600"
        size={18}
        strokeWidth={2.5}
      />
    </div>
  );
}
