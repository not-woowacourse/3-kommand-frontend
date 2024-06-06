export function GroupSkeleton() {
  return (
    <div>
      <div className="sr-only">로딩 중…</div>
      <div className="sticky top-0 z-10 border-b border-base-200 bg-white/60 px-4 py-1.5 backdrop-blur dark:border-base-dark-800 dark:bg-base-dark-900/50">
        <div className="my-0.5 h-3 w-1/5 animate-pulse rounded bg-base-200 dark:bg-base-dark-800" />
      </div>
      <div className="divide-y divide-base-200 dark:divide-base-dark-800">
        {Array.from({ length: 7 }, (_, i) => i).map((index) => (
          <ItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function ItemSkeleton() {
  return (
    <div>
      <div className="flex flex-wrap items-end gap-2 bg-white p-4 outline-none dark:bg-base-dark-900">
        <div className="flex grow flex-col">
          <div className="mb-0.5 h-5 w-4/5 animate-pulse rounded bg-base-200 dark:bg-base-dark-800" />
          <div className="my-0.5 h-4 w-1/2 animate-pulse rounded bg-base-200 dark:bg-base-dark-800" />
          <div className="my-0.5 h-4 w-1/3 animate-pulse rounded bg-base-200 dark:bg-base-dark-800" />
        </div>
        <div className="ml-auto flex h-fit translate-x-0.5 translate-y-0.5 flex-wrap justify-end gap-1">
          <div className="h-6 w-12 animate-pulse rounded-full bg-base-200 px-2 py-1 dark:bg-base-dark-800" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-base-200 px-2 py-1 dark:bg-base-dark-800" />
        </div>
      </div>
    </div>
  );
}
