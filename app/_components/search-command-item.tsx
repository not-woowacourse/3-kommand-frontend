import Link from 'next/link';

import { type SearchMovieResponseDto } from '@/__generated__/data-contracts';
import { CommandItem } from '@/components/ui/command';
import { ROUTES } from '@/constants/routes';

type SearchCommandItemProps = {
  value: string;
  movie: SearchMovieResponseDto;
};

const SearchCommandItem = ({
  value,
  movie: { id, title, alternativeTitle, rights },
}: SearchCommandItemProps) => {
  return (
    <Link href={ROUTES.MOVIE_OF(id)}>
      <CommandItem
        value={value}
        className="flex items-start justify-between gap-2"
      >
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-xs text-neutral-600">{alternativeTitle}</span>
        </div>
        <span>{rights}</span>
      </CommandItem>
    </Link>
  );
};

export { SearchCommandItem };
