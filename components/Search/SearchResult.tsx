'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { prepend, reset } from '@/states/historySlice';

interface SearchResultProps {
  query: string;
}

export function SearchResult({ query }: SearchResultProps) {
  const history = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();

  // TODO: fetch here

  return (
    <div className="flex flex-col gap-2">
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <button onClick={() => dispatch(prepend(query))}>prepend {query}</button>
      <button onClick={() => dispatch(reset())}>reset</button>
    </div>
  );
}
