'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useDebounce } from '@uidotdev/usehooks';

import { type ReadMovieResponseDto } from '@/__generated__/data-contracts';
import { SearchCommandItem } from '@/app/_components/search-command-item';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { ROUTES } from '@/constants/routes';
import { useMoviesControllerSearchQuery } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  type SearchHistory,
  searchHistoryActions,
} from '@/slices/search-history-slice';

const SearchCommand = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data } = useMoviesControllerSearchQuery(
    { query: debouncedSearch },
    { skip: debouncedSearch.length === 0 },
  );

  const movies = data ?? [];

  const searchHistory = useAppSelector(
    (state) => state.searchHistory,
  ) as SearchHistory; // FIXME: useAppSelector의 타입 추론이 안되는 이슈

  const dispatch = useAppDispatch();

  const searchHistoryFirst = (
    a: ReadMovieResponseDto,
    b: ReadMovieResponseDto,
  ) => {
    if (searchHistory[a.id] !== undefined) {
      return -1;
    }

    if (searchHistory[b.id] !== undefined) {
      return 1;
    }

    return 0;
  };

  const moviesTitleMatched = movies
    .filter(
      (movie) =>
        movie.matchedFields.title || movie.matchedFields.alternativeTitle,
    )
    .sort(searchHistoryFirst);

  const moviesRightsMatched = movies
    .filter((movie) => movie.matchedFields.rights)
    .sort(searchHistoryFirst);

  const handleCmdBackspaceKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();

      dispatch(searchHistoryActions.clear());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleCmdBackspaceKeyDown);

    return () =>
      document.removeEventListener('keydown', handleCmdBackspaceKeyDown);
  }, [handleCmdBackspaceKeyDown]);

  return (
    <Command
      className="w-[calc(100vw-16px)] rounded-lg border shadow-md md:w-[600px]"
      loop
      shouldFilter={false}
    >
      <CommandInput
        className="text-lg"
        placeholder="영화 이름 또는 감독 이름으로 검색"
        value={search}
        onValueChange={setSearch}
        autoFocus
      />
      <CommandList>
        {debouncedSearch.length === 0 &&
          Object.keys(searchHistory).length > 0 && (
            <CommandGroup heading="검색 기록">
              {Object.values(searchHistory).map((movie) => (
                <SearchCommandItem
                  variant="seen"
                  key={movie.id}
                  value={movie.id.toString()}
                  movie={movie}
                  onSelect={(value) =>
                    router.push(ROUTES.MOVIE_OF(Number(value)))
                  }
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
                onSelect={(value) =>
                  router.push(ROUTES.MOVIE_OF(Number(value)))
                }
                variant={
                  searchHistory[movie.id] !== undefined ? 'seen' : 'default'
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
                onSelect={(value) =>
                  router.push(ROUTES.MOVIE_OF(Number(value)))
                }
                variant={
                  searchHistory[movie.id] !== undefined ? 'seen' : 'default'
                }
              />
            ))}
          </CommandGroup>
        )}
        {Object.keys(searchHistory).length > 0 && (
          <div className="flex flex-wrap items-center px-2 py-1 text-xs text-gray-600">
            <div className="flex items-center">
              검색 기록을 모두 삭제하려면&nbsp;
            </div>
            <div className="flex items-center">⌘ ← 를 누르거나&nbsp;</div>
            <div className="flex items-center">
              <span
                className="cursor-pointer rounded-sm border bg-slate-100 px-1 py-0.5 font-bold"
                onClick={() => dispatch(searchHistoryActions.clear())}
              >
                여기
              </span>
              를 클릭하세요.
            </div>
          </div>
        )}
      </CommandList>
    </Command>
  );
};

export { SearchCommand };
