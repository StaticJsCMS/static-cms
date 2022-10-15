import { styled } from '@mui/material/styles';
import { Editor } from '@toast-ui/react-editor';
import React, { useCallback, useMemo, useState } from 'react';

import FieldLabel from '../../components/UI/FieldLabel';
import Outline from '../../components/UI/Outline';

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
    <StyledEditorWrapper key="markdown-control-wrapper">
      <FieldLabel
        key="markdown-control-label"
        isActive={hasFocus}
        hasErrors={errors.length > 0}
        onClick={handleLabelClick}
      >
        {label}
      </FieldLabel>
      <Editor
        key="markdown-control-editor"
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
      <Outline key="markdown-control-outline" active={hasFocus} hasLabel />
    </StyledEditorWrapper>
  );
};

export default MarkdownControl;
