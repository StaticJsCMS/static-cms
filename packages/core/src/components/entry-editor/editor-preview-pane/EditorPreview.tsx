import React from 'react';

import type { ObjectValue, TemplatePreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const Preview: FC<TemplatePreviewProps<ObjectValue>> = ({ collection, fields, widgetFor }) => {
  if (!collection || !fields) {
    return null;
  }

  return (
    <div>
      {fields.map(field => (
        <div key={field.name}>{widgetFor(field.name)}</div>
      ))}
    </div>
  );
};

export default Preview;
