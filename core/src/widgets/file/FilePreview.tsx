import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FileOrImageField, GetAssetFunction, WidgetPreviewProps } from '../../interface';

interface FileLinkProps {
  value: string;
  getAsset: GetAssetFunction;
  field: FileOrImageField;
}

const FileLink = ({ value, getAsset, field }: FileLinkProps) => {
  const [assetSource, setAssetSource] = useState('');
  useEffect(() => {
    if (!value || Array.isArray(value)) {
      return;
    }

    setAssetSource(getAsset(value, field)?.toString() ?? '');
  }, [field, getAsset, value]);

  return (
    <a href={assetSource} rel="noopener noreferrer" target="_blank">
      {value}
    </a>
  );
};

const StyledFileLink = styled(FileLink)`
  display: block;
`;

interface FileLinkListProps {
  values: string[];
  getAsset: GetAssetFunction;
  field: FileOrImageField;
}

function FileLinkList({ values, getAsset, field }: FileLinkListProps) {
  return (
    <div>
      {values.map(value => (
        <StyledFileLink key={value} value={value} getAsset={getAsset} field={field} />
      ))}
    </div>
  );
}

function FileContent({
  value,
  getAsset,
  field,
}: WidgetPreviewProps<string | string[], FileOrImageField>) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return <FileLinkList values={value} getAsset={getAsset} field={field} />;
  }

  return <StyledFileLink key={value} value={value} getAsset={getAsset} field={field} />;
}

function FilePreview(props: WidgetPreviewProps<string | string[], FileOrImageField>) {
  return (
    <WidgetPreviewContainer>
      {props.value ? <FileContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
}

export default FilePreview;
