import { styled } from '@mui/material/styles';
import { Editor } from '@toast-ui/react-editor';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import uuid from 'uuid';

import FieldLabel from '../../components/UI/FieldLabel';
import Outline from '../../components/UI/Outline';
import { IMAGE_EXTENSION_REGEX } from '../../constants/files';
import { doesUrlFileExist } from '../../lib/util/fetch.util';
import { isNotNullish } from '../../lib/util/null.util';
import { isNotEmpty } from '../../lib/util/string.util';
import useEditorOptions from './hooks/useEditorOptions';
import useToolbarItems from './hooks/useToolbarItems';
import useWidgetRules from './hooks/useWidgetRules';

import type { RefObject } from 'react';
import type { MarkdownField, MediaLibrary, WidgetControlProps } from '../../interface';

import '@toast-ui/editor/dist/toastui-editor.css';

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
  openMediaLibrary,
  mediaPaths,
  getAsset,
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

  const controlID: string = useMemo(() => uuid(), []);
  const mediaLibraryFieldOptions: MediaLibrary = useMemo(
    () => field.media_library ?? {},
    [field.media_library],
  );
  const handleOpenMedialLibrary = useCallback(
    (forImage: boolean) => {
      openMediaLibrary({
        controlID,
        forImage,
        privateUpload: false,
        allowMultiple: false,
        field,
        config: 'config' in mediaLibraryFieldOptions ? mediaLibraryFieldOptions.config : undefined,
      });
    },
    [controlID, field, mediaLibraryFieldOptions, openMediaLibrary],
  );

  const getMedia = useCallback(
    async (path: string) => {
      const { type, exists } = await doesUrlFileExist(path);
      if (!exists) {
        const asset = getAsset(path, field);
        if (isNotNullish(asset)) {
          return {
            type: IMAGE_EXTENSION_REGEX.test(path) ? 'image' : 'file',
            exists: false,
            url: asset.toString(),
          };
        }
      }

      return { url: path, type, exists };
    },
    [field, getAsset],
  );

  const mediaPath = mediaPaths[controlID];
  useEffect(() => {
    if (isEmpty(mediaPath) || Array.isArray(mediaPath)) {
      return;
    }

    const addMedia = async () => {
      const { type } = await getMedia(mediaPath);
      let content: string | undefined;
      const name = mediaPath.split('/').pop();
      if (type.startsWith('image')) {
        content = `![${name}](${mediaPath})`;
      } else {
        content = `[${name}](${mediaPath})`;
      }

      if (isNotEmpty(content)) {
        const editorInstance = editorRef.current?.getInstance();
        if (!editorInstance) {
          return;
        }

        editorInstance.focus();
        const isOnMarkdown = editorInstance.isMarkdownMode();
        if (!isOnMarkdown) {
          editorInstance.changeMode('markdown');
        }
        editorInstance.insertText(content);
        if (!isOnMarkdown) {
          editorInstance.changeMode('wysiwyg');
        }
        setTimeout(() => {
          handleOnChange();
        });
      }
    };

    addMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, mediaPath]);

  const { initialEditType, height, plugins, ...markdownEditorOptions } = useEditorOptions();
  const widgetRules = useWidgetRules(markdownEditorOptions.widgetRules, { getAsset, field });
  const toolbarItems = useToolbarItems(markdownEditorOptions.toolbarItems, handleOpenMedialLibrary);

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
        height={height}
        initialEditType={initialEditType}
        useCommandShortcut={true}
        onChange={handleOnChange}
        toolbarItems={toolbarItems}
        ref={editorRef}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autofocus={false}
        widgetRules={widgetRules}
        plugins={plugins}
      />
      <Outline key="markdown-control-outline" hasLabel hasError={hasErrors} />
    </StyledEditorWrapper>
  );
};

export default MarkdownControl;
