import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
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
  value,
  onChange,
  onKeyDown,
  placeholder,
  disabled,
}: MediaLibrarySearchProps) => {
  return (
    <TextField
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      disabled={disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MediaLibrarySearch;
