import { Search as SearchIcon } from '@styled-icons/material/Search';
import React from 'react';

import type { ChangeEventHandler, KeyboardEventHandler } from 'react';

export interface MediaLibrarySearchProps {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  placeholder: string;
  disabled?: boolean;
}

const MediaLibrarySearch = ({
  value = '',
  onChange,
  onKeyDown,
  placeholder,
  disabled,
}: MediaLibrarySearchProps) => {
  return (
    <form
      className="
        flex-grow
        max-w-media-search
      "
    >
      <label
        htmlFor="default-search"
        className="text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="
            block
            w-full
            p-1.5
            pl-10
            text-sm
            text-gray-900
            border
            border-gray-300
            rounded-lg
            bg-gray-50
            focus-visible:outline-none
            focus:ring-4
            focus:ring-gray-200
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-slate-700
          "
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </form>
  );
};

export default MediaLibrarySearch;
