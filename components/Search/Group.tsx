import type { MoviesControllerFindOneData } from '@/__generated__/data-contracts';
import { Item } from '@/components/Search/Item';
import type { MatchedFields } from '@/states/searchApi';

interface GroupProps {
  title: MatchedFields | (string & {});
  items: MoviesControllerFindOneData[];
}

export function Group({ title, items }: GroupProps) {
  if (items.length === 0) return null;

  const formattedTitle = (() => {
    switch (title) {
      case 'title':
        return '제목';
      case 'alternativeTitle':
        return '다른 제목';
      case 'rights':
        return '저작권자';
      default:
        return title.toLocaleUpperCase();
    }
  })();

  return (
    <div>
      <h2 className="sticky top-0 z-10 border-b border-base-200 bg-white px-4 py-1.5 text-xs font-semibold text-base-500 dark:border-base-dark-800 dark:bg-base-dark-900 dark:text-base-dark-500">
        {formattedTitle}
      </h2>
      <ul className="divide-y divide-base-200 dark:divide-base-dark-800">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
