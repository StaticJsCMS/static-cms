import React from 'react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { BaseField, Collection, MediaField, UnknownField } from '@staticcms/core/interface';

export interface ImageProps<EF extends BaseField> {
  src?: string;
  alt?: string;
  className?: string;
  collection?: Collection<EF>;
  field?: MediaField;
  'data-testid'?: string;
}

const Image = <EF extends BaseField = UnknownField>({
  src,
  alt,
  className,
  collection,
  field,
  'data-testid': dataTestId,
}: ImageProps<EF>) => {
  const entry = useAppSelector(selectEditingDraft);

  const assetSource = useMediaAsset(src, collection, field, entry);

  return (
    <img
      key="image"
      role="presentation"
      src={assetSource}
      alt={alt}
      data-testid={dataTestId ?? 'image'}
      className={classNames('object-cover max-w-full overflow-hidden', className)}
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
