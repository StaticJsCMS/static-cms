import React from 'react';

import { Toggle } from '../../ui';

import type { CmsFieldBoolean, CmsWidgetControlProps } from '../../interface';

const BooleanControl = ({
  value,
  forID,
  onChange,
  onBlur
}: CmsWidgetControlProps<boolean, CmsFieldBoolean>) => {
  return (
    <div>
      <Toggle
        id={forID}
        active={value ?? false}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default BooleanControl;
