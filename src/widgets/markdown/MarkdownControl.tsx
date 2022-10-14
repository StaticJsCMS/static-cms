import React, { useCallback, useMemo, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { styled } from '@mui/material/styles';

import '@toast-ui/editor/dist/toastui-editor.css';

import type { RefObject } from 'react';
import type { FieldMarkdown, WidgetControlProps } from '../../interface';

const StyledEditorWrapper = styled('div')`
  .toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor {
    width: 100%;
  }

  .toastui-editor-main .toastui-editor-md-splitter {
    display: none;
  }

  .toastui-editor-md-preview {
    display: none;
  }
`;

const MarkdownControl = ({
  path,
  field,
  value,
  onChange,
}: WidgetControlProps<string, FieldMarkdown>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const editorRef = useMemo(() => React.createRef(), []) as RefObject<Editor>;

  const handleOnChange = useCallback(() => {
    const newValue = editorRef.current?.getInstance().getMarkdown() ?? '';
    setInternalValue(newValue);
    onChange(path, field, newValue);
  }, [editorRef, field, onChange, path]);

  return (
    <StyledEditorWrapper>
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
      />
    </StyledEditorWrapper>
  );
};

export default MarkdownControl;
