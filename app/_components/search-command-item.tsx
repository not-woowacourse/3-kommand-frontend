import { type ReadMovieResponseDto } from '@/__generated__/data-contracts';
import { Badge } from '@/components/ui/badge';
import { CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

type SearchCommandItemProps = {
  variant?: 'default' | 'seen';
  value: string;
  movie: ReadMovieResponseDto;
  onSelect?: (value: string) => void;
};

const SearchCommandItem = ({
  variant,
  value,
  movie: { id, title, alternativeTitle, rights },
  onSelect,
}: SearchCommandItemProps) => {
  const splitedRights = rights?.split(',') ?? [];

  return (
    <CommandItem
      value={value}
      className="flex items-start justify-between gap-2"
      onSelect={onSelect}
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
  );
};

export { SearchCommandItem };
