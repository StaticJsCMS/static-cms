import React from 'react';
import styled from '@emotion/styled';

import { WidgetPreviewContainer } from '../../ui';

import type { CmsFieldFileOrImage, CmsWidgetPreviewProps, GetAssetFunction } from '../../interface';

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
  field: CmsFieldFileOrImage;
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
}: CmsWidgetPreviewProps<string | string[], CmsFieldFileOrImage>) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return <FileLinkList values={value} getAsset={getAsset} field={field} />;
  }

  return <FileLink key={value} path={value} href={getAsset(value, field).toString()} />;
}

function FilePreview(props: CmsWidgetPreviewProps<string | string[], CmsFieldFileOrImage>) {
  return (
    <WidgetPreviewContainer>
      {props.value ? <FileContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
}

export default FilePreview;
