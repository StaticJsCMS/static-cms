import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { SelectField, WidgetPreviewProps } from '../../interface';

interface ListPreviewProps {
  values: (string | number)[];
}

const ListPreview = ({ values }: ListPreviewProps) => {
  return (
    <ul>
      {values.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  );
};

const SelectPreview = ({
  value,
}: WidgetPreviewProps<string | number | (string | number)[], SelectField>) => {
  if (!value) {
    return <WidgetPreviewContainer />;
  }

  return (
    <WidgetPreviewContainer>
      {typeof value === 'string' || typeof value === 'number' ? (
        value
      ) : (
        <ListPreview values={value} />
      )}
    </WidgetPreviewContainer>
  );
};

export default SelectPreview;
