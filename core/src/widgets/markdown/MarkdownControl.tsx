import { styled } from '@mui/material/styles';
import React, { useCallback, useMemo, useState } from 'react';

import FieldLabel from '@staticcms/core/components/UI/FieldLabel';
import Outline from '@staticcms/core/components/UI/Outline';
import useDebounce from '../../lib/hooks/useDebounce';
import useMarkdownToSlate from './plate/hooks/useMarkdownToSlate';
import PlateEditor from './plate/PlateEditor';
import serialize from './plate/serialization/serializerMarkdown';

import type { MarkdownField, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import type { MdValue } from './plate/plateTypes';
import type { BlockType, LeafType } from './plate/serialization/slate/ast-types';

const StyledEditorWrapper = styled('div')`
  position: relative;
  width: 100%;

  .toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor {
    width: 100%;
  }

  .toastui-editor-main .toastui-editor-md-splitter {
    display: none;
  }

  .toastui-editor-md-preview {
    display: none;
  }

  .toastui-editor-defaultUI {
    border: none;
  }
`;

const MarkdownControl: FC<WidgetControlProps<string, MarkdownField>> = ({
  label,
  value,
  onChange,
  hasErrors,
  collection,
  entry,
  field,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [hasFocus, setHasFocus] = useState(false);
  const debouncedFocus = useDebounce(hasFocus, 150);

  const handleOnFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  const handleOnChange = useCallback(
    (slateValue: MdValue) => {
      const newValue = slateValue.map(v => serialize(v as BlockType | LeafType)).join('\n');
      // console.log('[Plate] slateValue', slateValue, 'newMarkdownValue', newValue);
      if (newValue !== internalValue) {
        setInternalValue(newValue);
        onChange(newValue);
      }
    },
    [internalValue, onChange],
  );

  const handleLabelClick = useCallback(() => {
    // editorRef.current?.getInstance().focus();
  }, []);

  const [slateValue, loaded] = useMarkdownToSlate(internalValue);

  // console.log('[Plate] slateValue', slateValue);

  return useMemo(
    () => (
      <StyledEditorWrapper key="markdown-control-wrapper">
        <FieldLabel
          key="markdown-control-label"
          isActive={hasFocus}
          hasErrors={hasErrors}
          onClick={handleLabelClick}
        >
          {label}
        </FieldLabel>
        {loaded ? (
          <PlateEditor
            initialValue={slateValue}
            collection={collection}
            entry={entry}
            field={field}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
        ) : null}
        <Outline
          key="markdown-control-outline"
          hasLabel
          hasError={hasErrors}
          active={hasFocus || debouncedFocus}
        />
      </StyledEditorWrapper>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasErrors, hasFocus, label, loaded, slateValue],
  );
};

export default MarkdownControl;
