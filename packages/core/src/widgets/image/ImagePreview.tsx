import { styled } from '@mui/material/styles';
import React from 'react';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';

import type {
  Collection,
  Entry,
  FileOrImageField,
  WidgetPreviewProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';

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
  value: string;
  collection: Collection<FileOrImageField>;
  field: FileOrImageField;
  entry: Entry;
}

const ImageAsset: FC<ImageAssetProps> = ({ value, collection, field, entry }) => {
  const assetSource = useMediaAsset(value, collection, field, entry);

  return <StyledImage src={assetSource} />;
};

const ImagePreviewContent: FC<WidgetPreviewProps<string | string[], FileOrImageField>> = ({
  value,
  collection,
  field,
  entry,
}) => {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <>
        {value.map(val => (
          <ImageAsset key={val} value={val} collection={collection} field={field} entry={entry} />
        ))}
      </>
    );
  }

  return <ImageAsset value={value} collection={collection} field={field} entry={entry} />;
};

const ImagePreview: FC<WidgetPreviewProps<string | string[], FileOrImageField>> = props => {
  return (
    <WidgetPreviewContainer>
      {props.value ? <ImagePreviewContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
};

export default ImagePreview;
