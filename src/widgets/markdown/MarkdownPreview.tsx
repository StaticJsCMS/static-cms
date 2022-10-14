import DOMPurify from 'dompurify';
import React from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';
import { markdownToHtml } from './serializers';

import type { FieldMarkdown, WidgetPreviewProps } from '../../interface';

const MarkdownPreview = ({
  value,
  getAsset,
  field,
  getRemarkPlugins,
}: WidgetPreviewProps<string, FieldMarkdown>) => {
  if (!value) {
    return null;
  }

  const html = markdownToHtml(value, {
    getAsset,
    remarkPlugins: getRemarkPlugins(),
  });
  const toRender = field.sanitize_preview ?? false ? DOMPurify.sanitize(html) : html;

  return <WidgetPreviewContainer dangerouslySetInnerHTML={{ __html: toRender }} />;
};

export default MarkdownPreview;
