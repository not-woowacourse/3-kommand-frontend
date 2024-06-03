import Link from 'next/link';

import { type ReadMovieResponseDto } from '@/__generated__/data-contracts';
import { Badge } from '@/components/ui/badge';
import { CommandItem } from '@/components/ui/command';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

type SearchCommandItemProps = {
  variant?: 'default' | 'seen';
  value: string;
  movie: ReadMovieResponseDto;
};

const SearchCommandItem = ({
  variant,
  value,
  movie: { id, title, alternativeTitle, rights },
}: SearchCommandItemProps) => {
  const splitedRights = rights?.split(',') ?? [];

  return (
    <Link href={ROUTES.MOVIE_OF(id)}>
      <CommandItem
        value={value}
        className="flex items-start justify-between gap-2"
      >
        <div className="flex flex-col">
          <span className={cn(variant === 'seen' && 'text-purple-900')}>
            {title}
          </span>
          <span
            className={cn(
              'text-xs',
              variant === 'default' && 'text-neutral-600',
              variant === 'seen' && 'text-purple-900',
            )}
          >
            {alternativeTitle}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-end gap-0.5">
            {splitedRights.map((right, index) => (
              <Badge key={index} variant="outline">
                {right}
              </Badge>
            ))}
          </div>
        </div>
      </CommandItem>
    </Link>
  );
};

export { SearchCommandItem };
