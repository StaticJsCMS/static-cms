import React from 'react';
import { Image as ImageIcon } from '@styled-icons/material-outlined/Image';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { isEmpty } from '@staticcms/core/lib/util/string.util';

import type {
  BaseField,
  Collection,
  Entry,
  MediaField,
  UnknownField,
} from '@staticcms/core/interface';
import type { CSSProperties } from 'react';

export interface ImageProps<EF extends BaseField> {
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  collection?: Collection<EF>;
  field?: MediaField;
  entry?: Entry;
  'data-testid'?: string;
}

const Image = <EF extends BaseField = UnknownField>({
  src,
  alt,
  className,
  style,
  collection,
  field,
  entry,
  'data-testid': dataTestId,
}: ImageProps<EF>) => {
  const editingDraft = useAppSelector(selectEditingDraft);

  const assetSource = useMediaAsset(src, collection, field, entry ?? editingDraft);

  if (isEmpty(src)) {
    return (
      <ImageIcon
        className="
          p-10
          rounded-md
          border
          max-w-full
          border-gray-200/75
          dark:border-slate-600/75
        "
      />
    );
  }

  return (
    <img
      key="image"
      role="presentation"
      src={assetSource}
      alt={alt}
      data-testid={dataTestId ?? 'image'}
      className={classNames('object-cover max-w-full overflow-hidden', className)}
      style={style}
    />
  );
};

export const withMdxImage = <EF extends BaseField = UnknownField>({
  collection,
  field,
}: Pick<ImageProps<EF>, 'collection' | 'field'>) => {
  const MdxImage = (props: Omit<ImageProps<EF>, 'collection' | 'field'>) => (
    <Image {...props} collection={collection} field={field} />
  );

  return MdxImage;
};

export default Image;
