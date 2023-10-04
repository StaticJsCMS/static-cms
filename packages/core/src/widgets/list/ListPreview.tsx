import React from 'react';

import { isNullish } from '@staticcms/core/lib/util/null.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { ListField, ValueOrNestedValue, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';

const classes = generateClassNames('WidgetListPreview', ['root']);

function renderNestedList(
  value: ValueOrNestedValue[] | ValueOrNestedValue | null | undefined,
): ReactNode {
  if (isNullish(value)) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <ul style={{ marginTop: 0 }}>
        {value.map((item, index) => (
          <li key={index}>{renderNestedList(item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === 'object') {
    if (value instanceof Date) {
      return value.toISOString();
    }

    return Object.keys(value).map((key, index) => (
      <div key={index}>
        <strong>{key}:</strong> {renderNestedList(value[key])}
      </div>
    ));
  }

  return value;
}

const ListPreview: FC<WidgetPreviewProps<ValueOrNestedValue[], ListField>> = ({ field, value }) => {
  if (!Array.isArray(value)) {
    return null;
  }

  return (
    <div style={{ marginTop: '12px' }} className={classes.root}>
      <label>
        <strong>{field.label ?? field.name}:</strong>
      </label>
      {(field.fields &&
        field.fields.length === 1 &&
        !['object', 'list'].includes(field.fields[0].widget)) ||
      (!field.fields && !field.types) ? (
        <ul style={{ marginTop: 0 }}>
          {value?.map((item, index) => <li key={index}>{String(item)}</li>)}
        </ul>
      ) : (
        renderNestedList(value)
      )}
    </div>
  );
};

export default ListPreview;
