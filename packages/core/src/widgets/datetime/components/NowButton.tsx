import React, { useCallback } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

import './NowButton.css';

const classes = generateClassNames('WidgetDate_NowButton', ['root', 'button']);

export interface NowButtonProps {
  handleChange: (value: Date) => void;
  disabled: boolean;
}

const NowButton: FC<TranslatedProps<NowButtonProps>> = ({ disabled, t, handleChange }) => {
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
        variant="outlined"
        className={classes.button}
      >
        {t('editor.editorWidgets.datetime.now')}
      </Button>
    </div>
  );
};

export default NowButton;
