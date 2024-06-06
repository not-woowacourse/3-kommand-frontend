import type { LucideIcon } from 'lucide-react';

interface ErrorProps {
  icon: LucideIcon;
  text: string;
}

export function Error({ icon: Icon, text }: ErrorProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-balance p-8 text-center text-sm font-medium text-base-500 dark:text-base-500">
      <Icon size={36} />
      <p>{text}</p>
    </div>
  );
}
