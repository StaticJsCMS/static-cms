import React, { useCallback, useMemo, useState } from 'react';
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
  const [internalValue, setInternalValue] = useState(value ?? '');
  const editorRef = useMemo(() => React.createRef(), []) as RefObject<Editor>;

  const handleOnChange = useCallback(() => {
    const newValue = editorRef.current?.getInstance().getMarkdown() ?? '';
    setInternalValue(newValue);
    onChange(path, field, newValue);
  }, [editorRef, field, onChange, path]);

  return (
    <Editor
      initialValue={internalValue}
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
