import React from 'react';

export interface EmptyMessageProps {
  content: string;
}

const EmptyMessage = ({ content }: EmptyMessageProps) => {
  return (
    <div
      className="
        relative
        flex-grow
        p-5
        pb-20
        flex
        items-center
        justify-center
        dark:text-gray-100
      "
    >
      <h3 className="">{content}</h3>
    </div>
  );
};

export default EmptyMessage;
