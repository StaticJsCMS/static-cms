import React from 'react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { Collection, MediaField } from '@staticcms/core/interface';

export interface ImageProps<F extends MediaField> {
  src?: string;
  alt?: string;
  className?: string;
  collection?: Collection<F>;
  field?: F;
  'data-testid'?: string;
}

const Image = <F extends MediaField>({
  src,
  alt,
  className,
  collection,
  field,
  'data-testid': dataTestId,
}: ImageProps<F>) => {
  const entry = useAppSelector(selectEditingDraft);

  const assetSource = useMediaAsset(src, collection, field, entry);

  console.log('src', src, 'assetSource', assetSource);

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

export const withMdxImage = <F extends MediaField>({
  collection,
  field,
}: Pick<ImageProps<F>, 'collection' | 'field'>) => {
  const MdxImage = (props: Omit<ImageProps<F>, 'collection' | 'field'>) => (
    <Image {...props} collection={collection} field={field} />
  );

  return MdxImage;
};

export default Image;
