import { Viewer } from '@toast-ui/react-editor';
import React, { useEffect, useRef } from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';
import useEditorOptions from './hooks/useEditorOptions';

import type { MarkdownField, WidgetPreviewProps } from '../../interface';

const MarkdownPreview = ({ value }: WidgetPreviewProps<string, MarkdownField>) => {
  const { plugins } = useEditorOptions();
  const viewer = useRef<Viewer | null>(null);

  useEffect(() => {
    viewer.current?.getInstance().setMarkdown(value ?? '');
  }, [value]);

  if (!value) {
    return null;
  }

  return (
    <WidgetPreviewContainer>
      <Viewer ref={viewer} initialValue={value} plugins={plugins} />
    </WidgetPreviewContainer>
  );
};

export default MarkdownPreview;
