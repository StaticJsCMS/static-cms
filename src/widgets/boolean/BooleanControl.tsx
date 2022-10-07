import React from 'react';

import { Toggle } from '../../ui';

import type { CmsFieldBoolean, CmsWidgetControlProps } from '../../interface';

const BooleanControl = ({
  value,
  forID,
  onChange,
  classNameWrapper,
  setActiveStyle,
  setInactiveStyle,
}: CmsWidgetControlProps<boolean, CmsFieldBoolean>) => {
  return (
    <div className={classNameWrapper}>
      <Toggle
        id={forID}
        active={value ?? false}
        onChange={onChange}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      />
    </div>
  );
};

export default BooleanControl;
