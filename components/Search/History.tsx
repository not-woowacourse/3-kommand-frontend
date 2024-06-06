'use client';

import { Delete, HistoryIcon, ListX } from 'lucide-react';

import { Button } from '@/components/Search/Button';
import { Error } from '@/components/Search/Error';
import { Group } from '@/components/Search/Group';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { reset } from '@/states/historySlice';

export function History() {
  const history = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();

  if (history.length === 0)
    return (
      <Error icon={HistoryIcon} text="여기에 최근 검색 결과가 표시됩니다." />
    );

  return (
    <>
      <Group title="최근 검색 결과" items={history} />
      <div className="flex items-center justify-between !border-t p-2">
        <div className="pl-2 text-sm font-medium text-base-500 dark:text-base-dark-500">
          총 {history.length}건
        </div>
        <Button
          icon={ListX}
          text="모두 삭제"
          onClick={() => dispatch(reset())}
          requiredCode="Backspace"
          keyLabel={Delete}
        />
      </div>
    </>
  );
}
