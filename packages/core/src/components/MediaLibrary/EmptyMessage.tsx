import { styled } from '@mui/material/styles';
import React from 'react';

const EmptyMessageContainer = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface EmptyMessageProps {
  content: string;
}

const EmptyMessage = ({ content }: EmptyMessageProps) => {
  return (
    <EmptyMessageContainer>
      <h1>{content}</h1>
    </EmptyMessageContainer>
  );
};

export default EmptyMessage;
