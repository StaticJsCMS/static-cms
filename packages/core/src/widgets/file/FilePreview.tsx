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

interface FileLinkProps {
  value: string;
  collection: Collection<FileOrImageField>;
  field: FileOrImageField;
  entry: Entry;
}

const FileLink: FC<FileLinkProps> = ({ value, collection, field, entry }) => {
  const assetSource = useMediaAsset(value, collection, field, entry);

  return (
    <a href={assetSource} rel="noopener noreferrer" target="_blank">
      {value}
    </a>
  );
};

const FileContent: FC<WidgetPreviewProps<string | string[], FileOrImageField>> = ({
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
      <div>
        {value.map(link => (
          <FileLink key={link} value={link} collection={collection} field={field} entry={entry} />
        ))}
      </div>
    );
  }

  return <FileLink key={value} value={value} collection={collection} field={field} entry={entry} />;
};

const FilePreview: FC<WidgetPreviewProps<string | string[], FileOrImageField>> = props => {
  return (
    <WidgetPreviewContainer>
      {props.value ? <FileContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
};

export default FilePreview;
