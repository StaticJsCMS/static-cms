import { styled } from '@mui/material/styles';
import { Editor } from '@toast-ui/react-editor';
import React, { useCallback, useMemo, useState } from 'react';

import FieldLabel from '../../components/UI/FieldLabel';
import Outline from '../../components/UI/Outline';
import { sanitizeSlug } from '../../lib/urlHelper';
import { selectMediaFilePath } from '../../lib/util/media.util';
import { createAssetProxy } from '../../valueObjects/AssetProxy';

import type { RefObject } from 'react';
import type { MarkdownField, WidgetControlProps } from '../../interface';

import '@toast-ui/editor/dist/toastui-editor.css';
import uuid from 'uuid';

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

const MarkdownControl = ({
  label,
  value,
  onChange,
  hasErrors,
  field,
  addAsset,
  config,
  collection,
  entry,
}: WidgetControlProps<string, MarkdownField>) => {
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
    onChange(newValue);
  }, [editorRef, onChange]);

  const handleLabelClick = useCallback(() => {
    editorRef.current?.getInstance().focus();
  }, [editorRef]);

  const [imageInsertCallback, setImageInsertCallback] = useState<
    ((url: string, text?: string) => void) | null
  >(null);
  const imageUpload = useCallback(
    (blob: Blob | File, callback: (url: string, text?: string) => void) => {
      if (blob instanceof Blob) {
        blob = new File(blob, uuid());
      }
      const fileName = sanitizeSlug(blob.name.toLowerCase(), config.slug);
      const path = selectMediaFilePath(config, collection, entry, fileName, field);
      addAsset(
        createAssetProxy({
          url: URL.createObjectURL(blob),
          file: blob as File,
          path,
          field,
        }),
      );
      console.log(blob);
      setImageInsertCallback(callback);
    },
    [addAsset, collection, config, entry, field],
  );

  return (
    <StyledEditorWrapper key="markdown-control-wrapper">
      <FieldLabel
        key="markdown-control-label"
        isActive={hasFocus}
        hasErrors={hasErrors}
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
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        ref={editorRef}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        hooks={{
          addImageBlobHook: imageUpload,
        }}
        autofocus={false}
      />
      <Outline key="markdown-control-outline" hasLabel hasError={hasErrors} />
    </StyledEditorWrapper>
  );
};

export default MarkdownControl;
