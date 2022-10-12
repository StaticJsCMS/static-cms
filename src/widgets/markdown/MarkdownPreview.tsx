import DOMPurify from 'dompurify';
import React from 'react';

import { WidgetPreviewContainer } from '../../ui';
import { markdownToHtml } from './serializers';

import type { CmsFieldMarkdown, CmsWidgetPreviewProps } from '../../interface';

const MarkdownPreview = ({
  value,
  getAsset,
  field,
  getRemarkPlugins,
}: CmsWidgetPreviewProps<string, CmsFieldMarkdown>) => {
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
