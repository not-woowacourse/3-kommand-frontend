'use client';

import { type KeyboardEventHandler, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

import { type ReadMovieResponseDto } from '@/__generated__/data-contracts';
import { SearchCommandItem } from '@/app/_components/search-command-item';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { api } from '@/lib/api';
import { useSearchRecordStore } from '@/stores/use-search-record-store';
import { useStore_Ssr } from '@/stores/use-store__ssr';

const SearchCommand = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () =>
      api.movies.moviesControllerSearch({ query: debouncedSearch, limit: 6 }),
    placeholderData: (prevData) => prevData,
    enabled: debouncedSearch.length > 0,
  });

  const searchRecordStore = useStore_Ssr(
    useSearchRecordStore,
    (state) => state,
  );

  const movies = data?.data ?? [];

  const records = Object.values(searchRecordStore?.records ?? {});

  const recordsFirst = (a: ReadMovieResponseDto, b: ReadMovieResponseDto) => {
    if (records.some((record) => record.id === a.id)) {
      return -1;
    }

    if (records.some((record) => record.id === b.id)) {
      return 1;
    }

    return 0;
  };

  const moviesTitleMatched = movies
    .filter(
      (movie) =>
        movie.matchedFields.title || movie.matchedFields.alternativeTitle,
    )
    .sort(recordsFirst);

  const moviesRightsMatched = movies
    .filter((movie) => movie.matchedFields.rights)
    .sort(recordsFirst);

  const handleEnterKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // router.push(ROUTES.MOVIE_OF(Number(focus)));
    }
  };

  /**
   * searchRecordStore가 변화하기 때문에 useEffect 안에서 함수를 생성하면 안된다.
   */
  const handleCmdXKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'x' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();

      searchRecordStore?.clear();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleCmdXKeyDown);

    return () => document.removeEventListener('keydown', handleCmdXKeyDown);
  }, [handleCmdXKeyDown]);

  return (
    <Command
      className="w-[calc(100vw-16px)] rounded-lg border shadow-md md:w-[600px]"
      loop
      shouldFilter={false}
      onKeyDown={handleEnterKeyDown}
    >
      <CommandInput
        className="text-lg"
        placeholder="영화 이름 또는 감독 이름으로 검색"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {debouncedSearch.length === 0 &&
          Object.keys(searchRecordStore?.records ?? {}).length > 0 && (
            <CommandGroup heading="검색 기록">
              {Object.values(searchRecordStore?.records ?? {}).map((record) => (
                <SearchCommandItem
                  variant="seen"
                  key={record.id}
                  value={record.id.toString()}
                  movie={record}
                />
              ))}
            </CommandGroup>
          )}
        {debouncedSearch.length > 0 && moviesTitleMatched.length > 0 && (
          <CommandGroup heading="영화 이름">
            {moviesTitleMatched.map((movie) => (
              <SearchCommandItem
                key={movie.id}
                value={movie.id.toString()}
                movie={movie}
                variant={
                  records.some((record) => record.id === movie.id)
                    ? 'seen'
                    : 'default'
                }
              />
            ))}
          </CommandGroup>
        )}
        {debouncedSearch.length > 0 && moviesRightsMatched.length > 0 && (
          <CommandGroup heading="감독 이름">
            {moviesRightsMatched.map((movie) => (
              <SearchCommandItem
                key={movie.id}
                value={movie.id.toString()}
                movie={movie}
                variant={
                  records.some((record) => record.id === movie.id)
                    ? 'seen'
                    : 'default'
                }
              />
            ))}
          </CommandGroup>
        )}
        {Object.keys(searchRecordStore?.records ?? {}).length > 0 && (
          <CommandItem className="text-xs" disabled>
            검색기록을 모두 삭제하려면&nbsp;
            <kbd className="flex items-center gap-1">
              <span className="text-lg">⌘</span>X
            </kbd>
            &nbsp;를 누르세요.
          </CommandItem>
        )}
      </CommandList>
    </Command>
  );
};

export { SearchCommand };
