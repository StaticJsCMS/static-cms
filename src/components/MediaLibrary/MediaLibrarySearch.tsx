import styled from '@emotion/styled';
import React from 'react';

import { colors, Icon, lengths, zIndex } from '../../ui';

import type { ChangeEventHandler, KeyboardEventHandler } from 'react';

const SearchContainer = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  position: relative;
  width: 400px;
`;

const SearchInput = styled.input`
  background-color: #eff0f4;
  border-radius: ${lengths.borderRadius};

  font-size: 14px;
  padding: 10px 6px 10px 32px;
  width: 100%;
  position: relative;
  z-index: ${zIndex.zIndex1};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${colors.active};
  }
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 6px;
  z-index: ${zIndex.zIndex2};
  transform: translate(0, -50%);
`;

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
    <SearchContainer>
      <SearchIcon type="search" size="small" />
      <SearchInput
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
    </SearchContainer>
  );
};

export default MediaLibrarySearch;
