import React, { useCallback } from 'react';

import type { FC, MouseEventHandler, MouseEvent } from 'react';

export interface EntriesPaginationPageProps {
  page: number;
  onClick: (page: number, event: MouseEvent) => void;
}

const EntriesPaginationPage: FC<EntriesPaginationPageProps> = ({ page, onClick }) => {
  const handleClick: MouseEventHandler = useCallback(
    event => {
      onClick(page, event);
    },
    [onClick, page],
  );

  return (
    <li>
      <button
        className="
          px-3
          py-2
          leading-tight
          h-[38px]
          flex
          text-gray-500
          bg-white border
          border-gray-300
          hover:bg-gray-100
          hover:text-gray-700
          dark:bg-slate-800
          dark:border-slate-700
          dark:text-gray-400
          dark:hover:bg-slate-700
          dark:hover:text-white
        "
        onClick={handleClick}
      >
        {page}
      </button>
    </li>
  );
};

export default EntriesPaginationPage;
