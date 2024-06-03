import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type ReadMovieResponseDto } from '@/__generated__/data-contracts';

type SearchRecordState = {
  records: Record<number, ReadMovieResponseDto>;
  addRecord: (record: ReadMovieResponseDto) => void;
  removeRecord: (recordId: number) => void;
};

const useSearchRecordStore = create<SearchRecordState>()(
  persist(
    (set, get) => ({
      records: {},
      addRecord: (record: ReadMovieResponseDto) => {
        const { records } = get();

        set({
          records: {
            ...records,
            [record.id]: record,
          },
        });
      },
      removeRecord: (recordId: number) => {
        const { records } = get();

        delete records[recordId];

        set({
          records,
        });
      },
    }),
    {
      name: 'search-record',
    },
  ),
);

export { useSearchRecordStore };
