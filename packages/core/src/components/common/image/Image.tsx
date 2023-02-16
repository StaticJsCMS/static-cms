import React from 'react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { Collection, MediaField } from '@staticcms/core/interface';

export interface ImageProps<F extends MediaField> {
  src?: string;
  alt?: string;
  collection?: Collection<F>;
  field?: F;
}

const Image = <F extends MediaField>({ src, alt, collection, field }: ImageProps<F>) => {
  const entry = useAppSelector(selectEditingDraft);

  const assetSource = useMediaAsset(src, collection, field, entry);

  return <img key="image" role="presentation" src={assetSource} alt={alt} />;
};

export const withMdxImage = <F extends MediaField>({
  collection,
  field,
}: Omit<ImageProps<F>, 'src' | 'alt'>) => {
  const MdxImage = ({ src, alt }: Pick<ImageProps<F>, 'src' | 'alt'>) => (
    <Image src={src} alt={alt} collection={collection} field={field} />
  );

  return MdxImage;
};

export default Image;
