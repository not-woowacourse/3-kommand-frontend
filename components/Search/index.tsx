'use client';

import { useState } from 'react';

import { SearchBox } from '@/components/Search/SearchBox';
import { SearchResult } from '@/components/Search/SearchResult';
import { useDebounce } from '@/lib/useDebounce';

export function Search() {
  const [query, setQuery] = useState('');
  const deboundedQuery = useDebounce(query, 200);

  return (
    <>
      <SearchBox
        query={query}
        setQuery={setQuery}
        placeholder="영화 검색"
        requiredKey="k"
        requiredKeyAlt="ㅏ"
      />
      <SearchResult query={deboundedQuery} />
    </>
  );
}
