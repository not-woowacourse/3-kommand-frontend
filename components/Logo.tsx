'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Popcorn } from 'lucide-react';

export function Logo() {
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      className="flex items-center gap-2 rounded-lg px-2 py-3 text-3xl font-semibold text-base-700 outline-none ring-accent-500 ring-offset-2 ring-offset-body transition-all hover:bg-base-200 focus-visible:ring-2 active:scale-95 dark:text-base-dark-300 dark:ring-offset-body-dark dark:hover:bg-base-800"
    >
      <Popcorn size={36} />
      <h1>Movies</h1>
    </Link>
  );
}
