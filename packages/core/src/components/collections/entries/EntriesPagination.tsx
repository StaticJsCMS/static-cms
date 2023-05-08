import React, { useMemo } from 'react';
import { ChevronLeft as ChevronLeftIcon } from '@styled-icons/material/ChevronLeft';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';

import EntriesPaginationPage from './EntriesPaginationPage';

import type { FC } from 'react';

export interface EntriesPaginationProps {
  page: number;
  total: number;
  onChange: (newPage: number) => void;
}

const EntriesPagination: FC<EntriesPaginationProps> = ({ page, total }) => {
  const pages = useMemo(() => {
    const minPage = page > 2 ? page - 2 : 0;
    const maxPage = total - page ? page - 2 : 0;

    console.log('min', minPage, 'max', maxPage);

    const pageNumbers = [];
    for (let i = minPage; i <= maxPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [page, total]);

  return (
    <nav className="self-center">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            className="
              flex
              h-[38px]
              px-3
              py-2
              ml-0
              leading-tight
              text-gray-500
              bg-white border
              border-gray-300
              rounded-l-lg
              hover:bg-gray-100
              hover:text-gray-700
              dark:bg-slate-800
              dark:border-slate-700
              dark:text-gray-400
              dark:hover:bg-slate-700
              dark:hover:text-white
            "
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" className="w-5 h-5" />
          </button>
        </li>
        {pages.map(p => (
          <EntriesPaginationPage key={p} page={p} onClick={() => {}} />
        ))}
        <li>
          <button
            className="
              flex
              h-[38px]
              px-3
              py-2
              ml-0
              leading-tight
              text-gray-500
              bg-white border
              border-gray-300
              rounded-r-lg
              hover:bg-gray-100
              hover:text-gray-700
              dark:bg-slate-800
              dark:border-slate-700
              dark:text-gray-400
              dark:hover:bg-slate-700
              dark:hover:text-white
            "
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default EntriesPagination;
