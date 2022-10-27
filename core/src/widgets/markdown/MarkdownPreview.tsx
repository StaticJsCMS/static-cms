import { Viewer } from '@toast-ui/react-editor';
import React, { useEffect, useRef } from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';
import useEditorOptions from './hooks/useEditorOptions';
import usePlugins from './hooks/usePlugins';

import type { MarkdownField, WidgetPreviewProps } from '../../interface';

const MarkdownPreview = ({ value, getAsset, field }: WidgetPreviewProps<string, MarkdownField>) => {
  const options = useEditorOptions();
  const plugins = usePlugins(options.plugins, { getAsset, field, mode: 'preview' });

  const viewer = useRef<Viewer | null>(null);

  useEffect(() => {
    viewer.current?.getInstance().setMarkdown(value ?? '');
  }, [value]);

  if (!value) {
    return null;
  }

  return (
    <WidgetPreviewContainer>
      <Viewer
        ref={viewer}
        initialValue={value}
        customHTMLSanitizer={(content: string) => content}
        plugins={plugins}
      />
    </WidgetPreviewContainer>
  );
};

export default MarkdownPreview;
