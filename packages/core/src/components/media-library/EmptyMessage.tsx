import React from 'react';

interface EmptyMessageProps {
  content: string;
}

const EmptyMessage = ({ content }: EmptyMessageProps) => {
  return (
    <div>
      <h1>{content}</h1>
    </div>
  );
};

export default EmptyMessage;
