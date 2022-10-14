import { styled } from '@mui/material/styles';
import { Editor } from '@toast-ui/react-editor';
import React, { useCallback, useMemo, useState } from 'react';

import FieldLabel from '../../components/UI/FieldLabel';
import { transientOptions } from '../../lib';

import type { RefObject } from 'react';
import type { FieldMarkdown, WidgetControlProps } from '../../interface';

import '@toast-ui/editor/dist/toastui-editor.css';

const StyledEditorWrapper = styled('div')`
  position: relative;

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

interface StyledOutlineProps {
  $isActive: boolean;
}

const StyledOutline = styled(
  'div',
  transientOptions,
)<StyledOutlineProps>(
  ({ $isActive }) => `
    position: absolute;
    bottom: 0;
    right: 0;
    top: 22px;
    left: 0;
    margin: 0;
    padding: 0 8px;
    pointer-events: none;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    min-width: 0%;
    border-color: rgba(0, 0, 0, 0.23);
    ${
      $isActive
        ? `
          border-color: #1976d2;
          border-width: 2px;
        `
        : ''
    }
  `,
);

const MarkdownControl = ({
  label,
  path,
  field,
  value,
  fieldsErrors,
  onChange,
}: WidgetControlProps<string, FieldMarkdown>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const editorRef = useMemo(() => React.createRef(), []) as RefObject<Editor>;
  const [hasFocus, setHasFocus] = useState(false);

  const handleOnFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  const handleOnChange = useCallback(() => {
    const newValue = editorRef.current?.getInstance().getMarkdown() ?? '';
    setInternalValue(newValue);
    onChange(path, field, newValue);
  }, [editorRef, field, onChange, path]);

  const errors = useMemo(() => fieldsErrors[path] ?? [], [fieldsErrors, path]);

  const handleLabelClick = useCallback(() => {
    editorRef.current?.getInstance().focus();
  }, [editorRef]);

  return (
    <StyledEditorWrapper>
      <FieldLabel isActive={hasFocus} hasErrors={errors.length > 0} onClick={handleLabelClick}>
        {label}
      </FieldLabel>
      <Editor
        initialValue={internalValue}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={handleOnChange}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'link'],
          ['code', 'codeblock'],
        ]}
        ref={editorRef}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <StyledOutline $isActive={hasFocus} />
    </StyledEditorWrapper>
  );
};

export default MarkdownControl;
