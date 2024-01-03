import React from 'react';

import mediaLibraryClasses from './MediaLibrary.classes';

import type { FC } from 'react';

export interface EmptyMessageProps {
  content: string;
}

const EmptyMessage: FC<EmptyMessageProps> = ({ content }) => {
  return (
    <div className={mediaLibraryClasses.empty}>
      <h3>{content}</h3>
    </div>
  );
};

export default EmptyMessage;
