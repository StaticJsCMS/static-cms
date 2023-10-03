import React, { useCallback } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { DateTimeField } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

import './NowButton.css';

const classes = generateClassNames('WidgetDateTime_NowButton', ['root', 'button']);

export interface NowButtonProps {
  handleChange: (value: Date) => void;
  field: DateTimeField;
  disabled: boolean;
}

const NowButton: FC<NowButtonProps> = ({ disabled, field, handleChange }) => {
  const t = useTranslate();

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      handleChange(new Date());
    },
    [handleChange],
  );

  return (
    <div key="now-button-wrapper" className={classes.root}>
      <Button
        key="now-button"
        data-testid="datetime-now"
        onClick={handleClick}
        disabled={disabled}
        color="secondary"
        variant="outlined"
        className={classes.button}
        aria-label={`set ${field.label ?? field.name} to now`}
      >
        {t('editor.editorWidgets.datetime.now')}
      </Button>
    </div>
  );
};

export default NowButton;
