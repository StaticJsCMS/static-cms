import React from 'react';

import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { CollectionWithDefaults, MediaField } from '@staticcms/core';
import type { FC } from 'react';

export interface LinkProps<F extends MediaField> {
  href: string | undefined | null;
  children: string;
  collection?: CollectionWithDefaults<F>;
  field?: F;
  'data-testid'?: string;
}

const Link = <F extends MediaField>({
  href,
  children,
  collection,
  field,
  'data-testid': dataTestId,
}: LinkProps<F>) => {
  const entry = useAppSelector(selectEditingDraft);

  const assetSource = useMediaAsset(href, collection, field, entry);

  return (
    <a key="link" href={assetSource} data-testid={dataTestId ?? 'link'}>
      {children}
    </a>
  );
};

export const withMdxLink = <F extends MediaField>({
  collection,
  field,
}: Pick<LinkProps<F>, 'collection' | 'field'>) => {
  const MdxLink: FC<Omit<LinkProps<F>, 'collection' | 'field'>> = ({ children, ...props }) => (
    <Link {...props} collection={collection} field={field}>
      {children}
    </Link>
  );

  return MdxLink;
};

export default Link;
