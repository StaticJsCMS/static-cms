import { styled } from '@mui/material/styles';
import { Editor } from '@toast-ui/react-editor';
import mime from 'mime-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import uuid from 'uuid';

import FieldLabel from '../../components/UI/FieldLabel';
import Outline from '../../components/UI/Outline';
import useImagePlugin from '../../editor-components/editorPlugin';
import { sanitizeSlug } from '../../lib/urlHelper';
import { selectMediaFilePath } from '../../lib/util/media.util';
import { createAssetProxy } from '../../valueObjects/AssetProxy';

import type { RefObject } from 'react';
import type { MarkdownField, MediaLibrary, WidgetControlProps } from '../../interface';

import '@toast-ui/editor/dist/toastui-editor.css';
import isEmpty from 'lodash/isEmpty';
import { doesUrlFileExist } from '../../lib/util/fetch.util';
import { isNotNullish } from '../../lib/util/null.util';

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
  addDraftEntryMediaFile,
  openMediaLibrary,
  config,
  collection,
  entry,
  mediaPaths,
  getAsset
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

  const [imagePlugin, imageToolbarButton] = useImagePlugin({ openMediaLibrary: handleOpenMedialLibrary });

  const getMedia = useCallback(
    async (path: string) => {
      const { type, exists } = await doesUrlFileExist(path);
      if (!exists) {
        const asset = getAsset(path, field);
        if (isNotNullish(asset)) {
          return {
            type: IMAGE_EXTENSION_REGEX.test(path) ? 'image' : 'file',
            exists: false,
            url: asset.toString()
          };
        }
      }

      return { url: path, type, exists };
    },
    [field, getAsset]
  );

  const mediaPath = mediaPaths[controlID];
  useEffect(() => {
    if (isEmpty(mediaPath) || Array.isArray(mediaPath)) {
      return;
    }

    const addMedia = async () => {
      const { type, exists, url } = await getMedia(mediaPath);
      let content: string | undefined;
      if (type.startsWith('image')) {
        if (exists) {
          content = `<img src="${mediaPath}" />`;
        } else {
          content = `<img data-asset="${mediaPath}" src="${url}" />`;
        }
      } else {
        const name = mediaPath.split('/').pop();
        if (exists) {
          content = `<a target="_blank" href="${mediaPath}">${name}</a>`;
        } else {
          content = `<a data-asset="${mediaPath}" target="_blank" href="${url}">${name}</a>`;
        }
      }

      if (isNotEmpty(content)) {
        editorRef.current.focus();
        editorRef.current.selection.setContent(content);
        onChange(editorRef.current.getContent());
      }
    };

    addMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, mediaPath]);

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
        plugins={[imagePlugin]}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', imageToolbarButton, 'link'],
          ['code', 'codeblock'],
        ]}
        ref={editorRef}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autofocus={false}
      />
      <Outline key="markdown-control-outline" hasLabel hasError={hasErrors} />
    </StyledEditorWrapper>
  );
};

export default MarkdownControl;
