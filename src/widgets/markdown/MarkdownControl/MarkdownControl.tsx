import React, { useCallback, useMemo } from 'react';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

import type { RefObject } from 'react';
import type { FieldMarkdown, WidgetControlProps } from '../../../interface';

const MarkdownControl = ({
  path,
  field,
  value,
  onChange,
}: WidgetControlProps<string, FieldMarkdown>) => {
  const editorRef = useMemo(() => React.createRef(), []) as RefObject<Editor>;

  const handleOnChange = useCallback(() => {
    const newValue = editorRef.current?.getInstance().getMarkdown();
    onChange(path, field, newValue ?? '');
  }, [editorRef, field, onChange, path]);

  return (
    <Editor
      initialValue={value ?? ''}
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      onChange={handleOnChange}
      ref={editorRef}
    />
  );
};

export default MarkdownControl;
