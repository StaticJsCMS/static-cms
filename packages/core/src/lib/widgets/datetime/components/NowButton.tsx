import React, { useCallback } from 'react';

import Button from '@staticcms/core/components/common/button/Button';

import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';

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
    <div
      key="now-button-wrapper"
      className="absolute inset-y-1 right-3 flex items-center
    "
    >
      <Button
        key="now-button"
        data-testid="datetime-now"
        onClick={handleClick}
        disabled={disabled}
        variant="outlined"
      >
        {t('editor.editorWidgets.datetime.now')}
      </Button>
    </div>
  );
};

export default NowButton;
