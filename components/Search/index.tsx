'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useDebounce } from 'use-debounce';

import { Detail } from '@/components/Search/Detail';
import { History } from '@/components/Search/History';
import { ResultsContainer } from '@/components/Search/ResultsContainer';
import { SearchBox } from '@/components/Search/SearchBox';
import { SearchResults } from '@/components/Search/SearchResults';
import { cn } from '@/lib/utils';

export function Search() {
  const [searchParamQuery, setSearchParamQuery] = useQueryState(
    'query',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  );

  const [query, setQuery] = useState(searchParamQuery);
  const [debouncedQuery] = useDebounce(query, 200);

  const [id, setId] = useQueryState('id', parseAsInteger);

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setSearchParamQuery(debouncedQuery);
  }, [debouncedQuery, setSearchParamQuery]);

  // full refresh 없이 URL이 변경되는 경우 input value에 반영하기 위해 필요합니다.
  // e. g. Link 컴포넌트
  useEffect(() => {
    setQuery(searchParamQuery);
  }, [searchParamQuery]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setId(null);
  };

  const onFocus = () => {
    setIsDirty(true);
  };

  return (
    <div
      className={cn(
        'flex min-h-0 w-full flex-1 grow flex-col items-center gap-4',
        isDirty || query || id
          ? 'justify-start'
          : 'justify-end sm:justify-center',
      )}
    >
      <SearchBox
        query={query}
        setQuery={setQuery}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="영화 검색"
        requiredKey="k"
        requiredKeyAlt="ㅏ"
      />
      {id && (
        <ResultsContainer>
          <Detail id={id} />
        </ResultsContainer>
      )}
      {!id && query !== '' && (
        <ResultsContainer>
          <SearchResults query={debouncedQuery} />
        </ResultsContainer>
      )}
      {!id && query === '' && isDirty && (
        <ResultsContainer>
          <History />
        </ResultsContainer>
      )}
    </div>
  );
}
