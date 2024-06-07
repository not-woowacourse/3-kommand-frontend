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
      {/* XXX: Firefox에서 sticky 요소에 backdrop-filter 적용 안 되는 문제 */}
      {/* https://bugzilla.mozilla.org/show_bug.cgi?id=1803813 */}
      <h2 className="sticky top-0 z-10 border-b border-base-200 bg-white/60 px-4 py-1.5 text-xs font-semibold text-base-600 backdrop-blur dark:border-base-dark-800 dark:bg-base-dark-900/50 dark:text-base-dark-400">
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
