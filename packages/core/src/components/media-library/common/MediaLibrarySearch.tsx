import { Search as SearchIcon } from '@styled-icons/material/Search';
import React from 'react';

import mediaLibraryClasses from './MediaLibrary.classes';

import type { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';

export interface MediaLibrarySearchProps {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  placeholder: string;
  disabled?: boolean;
}

const MediaLibrarySearch: FC<MediaLibrarySearchProps> = ({
  value = '',
  onChange,
  onKeyDown,
  placeholder,
  disabled,
}) => {
  return (
    <form className={mediaLibraryClasses['search-form']}>
      <label htmlFor="default-search" className={mediaLibraryClasses['search-label']}>
        Search
      </label>
      <div className="relative">
        <div className={mediaLibraryClasses['search-icon-wrapper']}>
          <SearchIcon className={mediaLibraryClasses['search-icon']} />
        </div>
        <input
          type="search"
          id="default-search"
          className={mediaLibraryClasses['search-input']}
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
