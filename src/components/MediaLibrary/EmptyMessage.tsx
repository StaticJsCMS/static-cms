import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../components/UI/styles';
import { transientOptions } from '../../lib';

interface EmptyMessageContainerProps {
  $isPrivate: boolean;
}

const EmptyMessageContainer = styled(
  'div',
  transientOptions,
)<EmptyMessageContainerProps>(
  ({ $isPrivate }) => `
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${$isPrivate ? `color: ${colors.textFieldBorder};` : ''}
  `,
);

interface EmptyMessageProps {
  content: string;
  isPrivate?: boolean;
}

const EmptyMessage = ({ content, isPrivate = false }: EmptyMessageProps) => {
  return (
    <EmptyMessageContainer $isPrivate={isPrivate}>
      <h1>{content}</h1>
    </EmptyMessageContainer>
  );
};

export default EmptyMessage;
