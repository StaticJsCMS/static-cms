import { styled } from '@mui/material/styles';
import React from 'react';

import type { TemplatePreviewProps } from '@staticcms/core/interface';

const PreviewContainer = styled('div')`
  overflow-y: auto;
  height: 100%;
  padding: 24px;
  font-family: Roboto, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif;
`;

const Preview = ({ collection, fields, widgetFor }: TemplatePreviewProps) => {
  if (!collection || !fields) {
    return null;
  }

  return (
    <PreviewContainer>
      {fields.map(field => (
        <div key={field.name}>{widgetFor(field.name)}</div>
      ))}
    </PreviewContainer>
  );
};

export default Preview;
