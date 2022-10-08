import React from 'react';
import styled from '@emotion/styled';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldFileOrImage, CmsWidgetPreviewProps, GetAssetFunction } from '../../interface';

interface StyledImageProps {
  src: string;
}

const StyledImage = styled(({ src }: StyledImageProps) => (
  <img src={src || ''} role="presentation" />
))`
  display: block;
  max-width: 100%;
  height: auto;
`;

interface StyledImageAsset {
  getAsset: GetAssetFunction;
  value: string;
  field: CmsFieldFileOrImage;
}

function StyledImageAsset({ getAsset, value, field }: StyledImageAsset) {
  return <StyledImage src={getAsset(value, field).toString()} />;
}

function ImagePreviewContent({
  value,
  getAsset,
  field,
}: CmsWidgetPreviewProps<string | string[], CmsFieldFileOrImage>) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <>
        {value.map(val => (
          <StyledImageAsset key={val} value={val} getAsset={getAsset} field={field} />
        ))}
      </>
    );
  }

  return <StyledImageAsset value={value} getAsset={getAsset} field={field} />;
}

function ImagePreview(props: CmsWidgetPreviewProps<string | string[], CmsFieldFileOrImage>) {
  return (
    <WidgetPreviewContainer>
      {props.value ? <ImagePreviewContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
}

export default ImagePreview;
