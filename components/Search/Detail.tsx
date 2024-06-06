import Link from 'next/link';

import { useEffect } from 'react';

import {
  AlertCircle,
  ArrowLeft,
  Asterisk,
  Earth,
  LinkIcon,
  type LucideIcon,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

import type { MoviesControllerFindOneData } from '@/__generated__/data-contracts';
import { Button } from '@/components/Search/Button';
import { Error } from '@/components/Search/Error';
import { useAppDispatch } from '@/lib/redux';
import { cn } from '@/lib/utils';
import { prepend } from '@/states/historySlice';
import { useGetDetailQuery } from '@/states/searchApi';

interface DetailProps {
  id: MoviesControllerFindOneData['id'];
}

export function Detail({ id }: DetailProps) {
  const { data: item, error, isLoading } = useGetDetailQuery({ id });

  const [_, setId] = useQueryState('id', parseAsInteger);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (item) dispatch(prepend({ item }));
  }, [item, dispatch]);

  // XXX: 왜 로딩 상태 뜨는 걸 못 보는지
  // TODO: skeleton
  if (isLoading) return <div>로딩 중</div>;

  const onClick = () => setId(null);

  // XXX: better error message
  if (error || !item)
    return (
      <div className="flex flex-col items-center pb-8">
        <Error icon={AlertCircle} text="오류가 발생했습니다." />
        <Button
          onClick={onClick}
          icon={ArrowLeft}
          text="검색 결과로 돌아가기"
          requiredKey="["
        />
      </div>
    );

  return (
    <div className="flex flex-col items-start gap-2 p-5">
      <Button
        onClick={onClick}
        icon={ArrowLeft}
        text="검색 결과로 돌아가기"
        requiredKey="["
        className="-translate-x-2.5 -translate-y-2.5"
      />
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-balance text-center text-3xl font-bold text-base-800 dark:text-base-dark-200">
            {item.title}
          </h2>
          <p className="text-balance text-center text-base-500 empty:hidden dark:text-base-dark-500">
            {item.alternativeTitle}
          </p>
          <p className="text-balance text-center text-sm text-base-400 empty:hidden dark:text-base-dark-600">
            {[item.year, item.rights].filter(Boolean).join(', ')}
          </p>
          {item.category && (
            <ul className="mt-1.5 flex -translate-x-0.5 flex-wrap justify-center gap-1">
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
        </div>
        <div className="flex flex-col gap-0.5">
          {item.region && (
            <DetailRow icon={Earth} label="지역" text={item.region} />
          )}
          {item.uci && (
            <DetailRow icon={Asterisk} label="UCI" text={item.uci} />
          )}
          {item.url && (
            <DetailRow icon={LinkIcon} label="더 알아보기" href={item.url} />
          )}
        </div>
      </div>
    </div>
  );
}

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  text?: string;
  href?: string;
}

function DetailRow({ icon: Icon, label, text, href }: DetailRowProps) {
  const Tag = href ? Link : 'div';

  return (
    <Tag
      href={href ?? ''}
      target="_blank"
      className={cn(
        'flex min-h-10 items-center justify-between gap-4 rounded-lg p-2 text-base-700 dark:text-base-dark-300',
        href &&
          'ring-accent-500 ring-offset-white transition-all hover:bg-base-200 active:scale-95 dark:ring-offset-base-dark-900 dark:hover:bg-base-dark-800',
      )}
    >
      <div className="flex gap-2 text-base-600 dark:text-base-dark-400">
        <Icon size={20} />
        <div className="text-sm font-semibold">{label}</div>
      </div>
      {text && <div className="text-balance text-right">{text}</div>}
      {href && <SquareArrowOutUpRight size={18} strokeWidth={2.5} />}
    </Tag>
  );
}
