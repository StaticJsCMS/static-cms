import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';

import type { ListField, ValueOrNestedValue, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const ListPreview: FC<WidgetPreviewProps<ValueOrNestedValue[], ListField>> = ({ field, value }) => {
  if (field.fields && field.fields.length === 1) {
    return (
      <WidgetPreviewContainer>
        <label>
          <strong>{field.name}:</strong>
        </label>
        <ul style={{ marginTop: 0 }}>
          {value?.map(item => (
            <li key={String(item)}>{String(item)}</li>
          ))}
        </ul>
      </WidgetPreviewContainer>
    );
  }

  return <WidgetPreviewContainer>{field.renderedFields ?? null}</WidgetPreviewContainer>;
};

export default ListPreview;
