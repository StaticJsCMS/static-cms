import React from 'react';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldSelect, CmsWidgetPreviewProps } from '../../interface';

interface ListPreviewProps {
  values: string[];
}

const ListPreview = ({ values }: ListPreviewProps) => {
  return (
    <ul>
      {(values as string[]).map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  );
};

const SelectPreview = ({ value }: CmsWidgetPreviewProps<string | string[], CmsFieldSelect>) => {
  if (!value) {
    return <WidgetPreviewContainer />;
  }

  return (
    <WidgetPreviewContainer>
      {typeof value === 'string' ? value : <ListPreview values={value} />}
    </WidgetPreviewContainer>
  );
};

export default SelectPreview;
