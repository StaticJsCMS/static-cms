import React, { forwardRef, useCallback } from 'react';

import classNames from '@staticcms/core/lib/util/classNames.util';

import type { ChangeEventHandler, KeyboardEvent } from 'react';

export interface TextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const MIN_TEXT_AREA_HEIGHT = 80;
const MIN_BOTTOM_PADDING = 12;

const TextArea = forwardRef<HTMLTextAreaElement | null, TextAreaProps>(
  ({ value, onChange }, ref) => {
    const autoGrow = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!event.target) {
        return;
      }

      event.currentTarget.style.height = '5px';

      let height = event.currentTarget.scrollHeight;
      if (height < MIN_TEXT_AREA_HEIGHT) {
        height = MIN_TEXT_AREA_HEIGHT;
      }
      event.currentTarget.style.height = `${height}px`;

      if (height > MIN_TEXT_AREA_HEIGHT - MIN_BOTTOM_PADDING) {
        event.currentTarget.style.paddingBottom = `${MIN_BOTTOM_PADDING}px`;
      }
    }, []);

    return (
      <textarea
        ref={ref}
        data-testid={`textarea-input`}
        onInput={autoGrow}
        className={classNames(
          `w-full
          px-3
          bg-transparent
          outline-none
          text-sm
          font-medium
          text-gray-900
          dark:text-slate-100`,
        )}
        value={value}
        onChange={onChange}
        rows={4}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
