import React from 'react';
import styled from '@emotion/styled';

import type { CmsField, CmsTemplatePreviewProps } from '../../../interface';

function isVisible(field: CmsField) {
  return field.widget !== 'hidden';
}

const PreviewContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  font-family: Roboto, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif;
`;

const Preview = ({ collection, fields, widgetFor }: CmsTemplatePreviewProps) => {
  if (!collection || !fields) {
    return null;
  }

  return (
    <PreviewContainer>
      {fields.filter(isVisible).map(field => (
        <div key={field.name}>{widgetFor(field.name)}</div>
      ))}
    </PreviewContainer>
  );
};

export default Preview;
