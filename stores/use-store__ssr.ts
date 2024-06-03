import { useEffect, useState } from 'react';

/**
 * @reference https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
 */
const useStore_Ssr = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export { useStore_Ssr };
