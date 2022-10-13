import React, { useCallback, useMemo } from 'react';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

import type { RefObject } from 'react';
import type { CmsFieldMarkdown, CmsWidgetControlProps } from '../../../interface';

const MarkdownControl = ({
  value,
  onChange,
  onBlur
}: CmsWidgetControlProps<string, CmsFieldMarkdown>) => {
  const editorRef = useMemo(() => React.createRef(), []) as RefObject<Editor>;

  const handleOnChange = useCallback(() => {
    const newValue = editorRef.current?.getInstance().getMarkdown();
    onChange(newValue ?? '');
  }, [editorRef, onChange]);

  return (
    <Editor
      initialValue={value ?? ''}
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      onChange={handleOnChange}
      onBlur={() => onBlur()}
      ref={editorRef}
    />
  );
};

export default MarkdownControl;
