import type { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

export function ResultsContainer({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ delay: 0.05, mass: 0.3 }}
      className="flex w-full max-w-96 shrink overflow-hidden rounded-lg border border-base-200 shadow-sm transition-[height] sm:max-h-[40rem] dark:border-base-dark-800"
    >
      <div className="w-full shrink divide-y-4 divide-base-200 overflow-auto bg-white dark:divide-base-dark-800 dark:bg-base-dark-900">
        {children}
      </div>
    </motion.div>
  );
}
