import React from 'react';

import Image from '../image/Image';
import cardClasses from './Card.classes';

import type {
  BaseField,
  CollectionWithDefaults,
  Entry,
  MediaField,
  UnknownField,
} from '@staticcms/core';

export interface CardMediaProps<EF extends BaseField> {
  image: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
  collection?: CollectionWithDefaults<EF>;
  field?: MediaField;
  entry?: Entry;
}

const CardMedia = <EF extends BaseField = UnknownField>({
  image,
  width,
  height,
  alt = '',
  collection,
  field,
  entry,
}: CardMediaProps<EF>) => {
  return (
    <Image
      className={cardClasses.media}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
      src={image}
      alt={alt}
      collection={collection}
      field={field}
      entry={entry}
    />
  );
};

export default CardMedia;
