import React from 'react';

import mediaLibraryClasses from './MediaLibrary.classes';

export interface EmptyMessageProps {
  content: string;
}

const EmptyMessage = ({ content }: EmptyMessageProps) => {
  return (
    <div className={mediaLibraryClasses.empty}>
      <h3>{content}</h3>
    </div>
  );
};

export default EmptyMessage;
