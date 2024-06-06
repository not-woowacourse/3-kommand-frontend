'use client';

import { AlertCircle, SearchX } from 'lucide-react';

import { Error } from '@/components/Search/Error';
import { Group } from '@/components/Search/Group';
import { GroupSkeleton } from '@/components/Search/GroupSkeleton';
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
  const { data, error, isFetching } = useGetSearchResultsQuery({ query });
  const history = useAppSelector((state) => state.history);

  // 맨 처음 가져올 때 isLoading
  // data가 있는 상태에서 또 가져올 때 isFetching
  // isFetching인 경우에는 보여줄 수 있는 이전 data가 있으므로 스켈레톤은 isLoading에만 띄우는 게 적절
  // + 어차피 debounce 대기 중에도 이전 data가 보임
  // 근데 저는 스켈레톤을 예쁘게 만들었기 때문에 isFetching으로 스켈레톤이 더 자주 나오게 하겠음
  if (isFetching) return <GroupSkeleton />;

  if (!data || error)
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
