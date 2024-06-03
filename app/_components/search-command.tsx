'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { SearchCommandItem } from '@/app/_components/search-command-item';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

const SearchCommand = () => {
  const [search, setSearch] = useState('');

  const { data } = useQuery({
    queryKey: ['search', search],
    queryFn: () =>
      api.movies.moviesControllerSearch({ query: search, limit: 6 }),
    placeholderData: (prevData) => prevData,
    enabled: search.length > 0,
  });

  const movies = data?.data ?? [];

  const moviesTitleMatched = movies.filter(
    (movie) =>
      movie.matchedFields.title || movie.matchedFields.alternativeTitle,
  );

  const moviesRightsMatched = movies.filter(
    (movie) => movie.matchedFields.rights,
  );

  return (
    <Command
      className={cn('rounded-lg border shadow-md', 'max-w-lg')}
      loop
      shouldFilter={false}
    >
      <CommandInput
        placeholder="영화 이름 또는 감독 이름으로 검색"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandGroup heading="검색 기록"></CommandGroup>
        {moviesTitleMatched.length > 0 && (
          <CommandGroup heading="영화 이름">
            {moviesTitleMatched.map((movie) => (
              <SearchCommandItem
                key={movie.id}
                value={movie.id.toString()}
                movie={movie}
              />
            ))}
          </CommandGroup>
        )}
        {moviesRightsMatched.length > 0 && (
          <CommandGroup heading="감독 이름">
            {moviesRightsMatched.map((movie) => (
              <SearchCommandItem
                key={movie.id}
                value={movie.id.toString()}
                movie={movie}
              />
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export { SearchCommand };
