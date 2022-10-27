import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FileOrImageField, GetAssetFunction, WidgetPreviewProps } from '../../interface';

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

interface ImageAssetProps {
  getAsset: GetAssetFunction;
  value: string;
  field: FileOrImageField;
}

function ImageAsset({ getAsset, value, field }: ImageAssetProps) {
  const [assetSource, setAssetSource] = useState('');
  console.log('value', `"${value}"`, 'assetSource', `"${assetSource}"`);
  useEffect(() => {
    setAssetSource(getAsset(value, field)?.toString() ?? '');
  }, [field, getAsset, value]);

  return <StyledImage src={assetSource} />;
}

function ImagePreviewContent({
  value,
  getAsset,
  field,
}: WidgetPreviewProps<string | string[], FileOrImageField>) {
  console.log('[ImagePreviewContent] value', `"${value}"`);
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <>
        {value.map(val => (
          <ImageAsset key={val} value={val} getAsset={getAsset} field={field} />
        ))}
      </>
    );
  }

  return <ImageAsset value={value} getAsset={getAsset} field={field} />;
}

function ImagePreview(props: WidgetPreviewProps<string | string[], FileOrImageField>) {
  console.log('[ImagePreview] value', `"${props.value}"`);
  return (
    <WidgetPreviewContainer>
      {props.value ? <ImagePreviewContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
}

export default ImagePreview;
