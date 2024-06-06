'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { X } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { withQuery } from 'ufo';

import type { MoviesControllerFindOneData } from '@/__generated__/data-contracts';
import { Button } from '@/components/Search/Button';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { cn } from '@/lib/utils';
import { remove } from '@/states/historySlice';

interface ItemProps {
  item: MoviesControllerFindOneData;
}

export function Item({ item }: ItemProps) {
  const history = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const [query] = useQueryState('query');

  const href = withQuery(pathname, { query, id: item.id });

  const visited = history.some((historyItem) => historyItem.id === item.id);

  return (
    <li className="relative">
      <Link
        className="peer flex flex-wrap items-end gap-2 border-2 border-transparent bg-white p-4 outline-none transition-[transform,background-color] hover:bg-base-100 focus-visible:border-accent-500 active:scale-95 active:rounded-lg dark:border-accent-500 dark:bg-base-dark-900 dark:hover:bg-base-dark-800"
        href={href}
        replace
      >
        <div className="flex flex-col">
          <h3
            className={cn(
              'text-balance font-medium',
              visited
                ? 'pr-8 text-accent-700 dark:text-accent-300'
                : 'text-base-700 dark:text-base-dark-300',
            )}
          >
            {item.title}
          </h3>
          <p className="text-balance text-sm text-base-500 empty:hidden dark:text-base-dark-500">
            {item.alternativeTitle}
          </p>
          <p className="mt-0.5 text-balance text-xs text-base-400 empty:hidden dark:text-base-dark-600">
            {[item.year, item.rights].filter(Boolean).join(', ')}
          </p>
        </div>
        {item.category && (
          <ul className="ml-auto flex h-fit translate-x-0.5 translate-y-0.5 flex-wrap justify-end gap-1">
            {item.category.split(',').map((category) => (
              <li
                key={category}
                className="rounded-full bg-base-300 px-2 py-1 text-xs font-semibold text-base-600 dark:bg-base-dark-700 dark:text-base-dark-400"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </Link>
      {visited && (
        <Button
          onClick={() => dispatch(remove({ id: item.id }))}
          icon={X}
          ariaLabel="최근 검색 결과에서 삭제"
          className="absolute right-3 top-3 transition-opacity peer-active:opacity-0"
        />
      )}
    </li>
  );
}
