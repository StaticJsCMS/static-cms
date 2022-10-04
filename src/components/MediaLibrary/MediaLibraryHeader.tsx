import styled from '@emotion/styled';
import React from 'react';

import { transientOptions } from '../../lib';
import { buttons, colors, Icon, shadows } from '../../ui';

const CloseButton = styled.button`
  ${buttons.button};
  ${shadows.dropMiddle};
  position: absolute;
  margin-right: -40px;
  left: -40px;
  top: -40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LibraryTitleProps {
  $isPrivate: boolean;
}

const LibraryTitle = styled(
  'h1',
  transientOptions,
)<LibraryTitleProps>(
  ({ $isPrivate }) => `
    line-height: 36px;
    font-size: 22px;
    text-align: left;
    margin-bottom: 25px;
    ${$isPrivate ? `color: ${colors.textFieldBorder};` : ''}
  `,
);

interface MediaLibraryHeaderProps {
  onClose: () => void;
  title: string;
  isPrivate?: boolean;
}

const MediaLibraryHeader = ({ onClose, title, isPrivate = false }: MediaLibraryHeaderProps) => {
  return (
    <div>
      <CloseButton onClick={onClose}>
        <Icon type="close" />
      </CloseButton>
      <LibraryTitle $isPrivate={isPrivate}>{title}</LibraryTitle>
    </div>
  );
};

export default MediaLibraryHeader;
