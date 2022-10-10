import React, { useCallback, useMemo } from 'react';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

import type { RefObject } from 'react';
import type { CmsFieldMarkdown, CmsWidgetControlProps } from '../../../interface';

const MarkdownControl = ({
  value,
  setActiveStyle,
  onChange,
  setInactiveStyle,
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
      onFocus={() => setActiveStyle()}
      onBlur={() => setInactiveStyle()}
      onChange={handleOnChange}
      ref={editorRef}
    />
  );
};

export default MarkdownControl;
