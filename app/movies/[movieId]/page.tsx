'use client';

import Link from 'next/link';

import { useEffect } from 'react';

import { ArrowLeft, ExternalLink } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useMoviesControllerFindOneQuery } from '@/lib/api';
import { useAppDispatch } from '@/lib/hooks';
import { searchHistoryActions } from '@/slices/search-history-slice';

type MovieIdPageProps = {
  params: {
    movieId: number;
  };
};

const MovieIdPage = ({ params: { movieId } }: MovieIdPageProps) => {
  const { data } = useMoviesControllerFindOneQuery(movieId);

  const dispatch = useAppDispatch();

  const movie = data;

  useEffect(() => {
    if (movie === undefined) {
      return;
    }

    dispatch(searchHistoryActions.add(movie));
  }, [movie, dispatch, searchHistoryActions.add]);

  if (movie === undefined) {
    return null;
  }

  const { title, alternativeTitle, uci, url, year, region, category, rights } =
    movie;

  const splitedRights = rights?.split(',') ?? [];
  const splitedRegions = region?.split(',') ?? [];
  const splitedCategories = category?.split(',') ?? [];

  return (
    <main className="flex flex-col gap-12 p-2 transition-all md:p-12">
      <Button size="icon">
        <Link href={ROUTES.ROOT}>
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </Button>
      <div className="flex flex-col gap-2">
        {year !== undefined && <p>{year}</p>}
        <div className="flex flex-wrap items-baseline gap-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          {alternativeTitle !== undefined && (
            <p className="text-neutral-600">{alternativeTitle}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {splitedRights.map((right) => (
            <Badge key={right}>{right}</Badge>
          ))}
        </div>
      </div>
      <table className="table-auto border-collapse border border-gray-300">
        <tbody>
          {splitedCategories.length > 0 && (
            <tr>
              <td className="text-nowrap border border-gray-300 px-4 py-2">
                카테고리
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  {splitedCategories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </td>
            </tr>
          )}
          {splitedRegions.length > 0 && (
            <tr>
              <td className="text-nowrap border border-gray-300 px-4 py-2">
                지역
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
                  {splitedRegions.map((region) => (
                    <Badge key={region} variant="outline">
                      {region}
                    </Badge>
                  ))}
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td className="text-nowrap border border-gray-300 px-4 py-2">
              UCI
            </td>
            <td className="border border-gray-300 px-4 py-2">{uci}</td>
          </tr>
          <tr>
            <td className="text-nowrap border border-gray-300 px-4 py-2">
              상세정보
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <Button variant="outline" size="sm">
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  바로가기
                </Link>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default MovieIdPage;
