import React from 'react';

import type { ObjectValue, TemplatePreviewProps } from '@staticcms/core/interface';

const Preview = ({ collection, fields, widgetFor }: TemplatePreviewProps<ObjectValue>) => {
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
