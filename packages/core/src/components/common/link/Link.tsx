import React from 'react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { Collection, MediaField } from '@staticcms/core/interface';

export interface LinkProps<F extends MediaField> {
  src?: string;
  children: string;
  collection?: Collection<F>;
  field?: F;
}

const Link = <F extends MediaField>({ src, children, collection, field }: LinkProps<F>) => {
  const entry = useAppSelector(selectEditingDraft);

  const assetSource = useMediaAsset(src, collection, field, entry);

  return <a key="link" href={assetSource}>{children}</a>;
};

export const withMdxLink = <F extends MediaField>({
  collection,
  field,
}: Omit<LinkProps<F>, 'src' | 'children'>) => {
  const MdxLink = ({ src, children }: Pick<LinkProps<F>, 'src' | 'children'>) => (
    <Link src={src} collection={collection} field={field}>{children}</Link>
  );

  return MdxLink;
};

export default Link;
