import { SearchCommand } from '@/app/_components/search-command';

const RootPage = () => {
  return (
    <main className="flex flex-col items-center gap-10">
      <p className="mt-20 text-7xl font-bold">🎬</p>
      <div className="px-2">
        <SearchCommand />
      </div>
    </main>
  );
};

export default RootPage;
