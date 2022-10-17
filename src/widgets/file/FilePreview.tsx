import React from 'react';
import { styled } from '@mui/material/styles';

import WidgetPreviewContainer from '../../components/UI/WidgetPreviewContainer';

import type { FieldFileOrImage, WidgetPreviewProps, GetAssetFunction } from '../../interface';

interface FileLinkProps {
  href: string;
  path: string;
}

const FileLink = styled(({ href, path }: FileLinkProps) => (
  <a href={href} rel="noopener noreferrer" target="_blank">
    {path}
  </a>
))`
  display: block;
`;

interface FileLinkListProps {
  values: string[];
  getAsset: GetAssetFunction;
  field: FieldFileOrImage;
}

function FileLinkList({ values, getAsset, field }: FileLinkListProps) {
  return (
    <div>
      {values.map(value => (
        <FileLink key={value} path={value} href={getAsset(value, field).toString()} />
      ))}
    </div>
  );
}

function FileContent({
  value,
  getAsset,
  field,
}: WidgetPreviewProps<string | string[], FieldFileOrImage>) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return <FileLinkList values={value} getAsset={getAsset} field={field} />;
  }

  return <FileLink key={value} path={value} href={getAsset(value, field).toString()} />;
}

function FilePreview(props: WidgetPreviewProps<string | string[], FieldFileOrImage>) {
  return (
    <WidgetPreviewContainer>
      {props.value ? <FileContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
}

export default FilePreview;
