'use client';

import { AlertCircle, SearchX } from 'lucide-react';

import { Error } from '@/components/Search/Error';
import { Group } from '@/components/Search/Group';
import { useAppSelector } from '@/lib/redux';
import {
  type MatchedFields,
  type SearchResults,
  useGetSearchResultsQuery,
} from '@/states/searchApi';

interface SearchResultProps {
  query: string;
}

type TransformedSearchResults = {
  [key in MatchedFields]: SearchResults;
};

export function SearchResults({ query }: SearchResultProps) {
  const { data, error, isLoading } = useGetSearchResultsQuery({ query });
  const history = useAppSelector((state) => state.history);

  // XXX: 왜 로딩 상태 뜨는 걸 못 보는지
  // TODO: skeleton
  if (isLoading) return <div>로딩 중</div>;

  // XXX: better error message
  if (error || !data)
    return <Error icon={AlertCircle} text="오류가 발생했습니다." />;

  if (data.length === 0)
    return <Error icon={SearchX} text="검색 결과가 없습니다." />;

  const transformedData: TransformedSearchResults = {
    title: data.filter((item) => item.matchedFields.title),
    alternativeTitle: data.filter(
      (item) => item.matchedFields.alternativeTitle,
    ),
    rights: data.filter((item) => item.matchedFields.rights),
  };

  const dataIds = data.map((dataItem) => dataItem.id);

  const filteredHistory = history.filter((historyItem) =>
    dataIds.includes(historyItem.id),
  );

  return (
    <>
      <Group title="최근 검색 결과" items={filteredHistory} />
      {Object.keys(transformedData).map((key) => (
        <Group
          key={key}
          title={key as MatchedFields}
          items={transformedData[key as MatchedFields]}
        />
      ))}
    </>
  );
}
