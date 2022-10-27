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

interface StyledImageAsset {
  getAsset: GetAssetFunction;
  value: string;
  field: FileOrImageField;
}

function StyledImageAsset({ getAsset, value, field }: StyledImageAsset) {
  const [assetSource, setAssetSource] = useState('');
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

function ImagePreview(props: WidgetPreviewProps<string | string[], FileOrImageField>) {
  return (
    <WidgetPreviewContainer>
      {props.value ? <ImagePreviewContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
}

export default ImagePreview;
