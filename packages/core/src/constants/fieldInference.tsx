import React from 'react';

import type { InferredField } from '../interface';

export type InferrableField = 'title' | 'shortTitle' | 'author' | 'date' | 'description' | 'image';

export const IDENTIFIER_FIELDS = ['title', 'path'] as const;

export const SORTABLE_FIELDS = ['title', 'date', 'author', 'description'] as InferrableField[];

export const INFERABLE_FIELDS: Record<InferrableField, InferredField> = {
  title: {
    type: 'string',
    secondaryTypes: [],
    synonyms: ['title', 'name', 'label', 'headline', 'header'],
    defaultPreview: value => <h1>{value}</h1>, // eslint-disable-line react/display-name
    fallbackToFirstField: true,
    showError: true,
  },
  shortTitle: {
    type: 'string',
    secondaryTypes: [],
    synonyms: ['short_title', 'shortTitle', 'short'],
    defaultPreview: value => <h2>{value}</h2>, // eslint-disable-line react/display-name
    fallbackToFirstField: false,
    showError: false,
  },
  author: {
    type: 'string',
    secondaryTypes: [],
    synonyms: ['author', 'name', 'by', 'byline', 'owner'],
    defaultPreview: value => <strong>{value}</strong>, // eslint-disable-line react/display-name
    fallbackToFirstField: false,
    showError: false,
  },
  date: {
    type: 'datetime',
    secondaryTypes: ['date'],
    synonyms: ['date', 'publishDate', 'publish_date'],
    defaultPreview: value => value,
    fallbackToFirstField: false,
    showError: false,
  },
  description: {
    type: 'string',
    secondaryTypes: ['text', 'markdown'],
    synonyms: [
      'shortDescription',
      'short_description',
      'shortdescription',
      'description',
      'intro',
      'introduction',
      'brief',
      'content',
      'biography',
      'bio',
      'summary',
    ],
    defaultPreview: value => value,
    fallbackToFirstField: false,
    showError: false,
  },
  image: {
    type: 'image',
    secondaryTypes: [],
    synonyms: [
      'image',
      'thumbnail',
      'thumb',
      'picture',
      'avatar',
      'photo',
      'cover',
      'hero',
      'logo',
      'cover_image',
      'cover-image',
      'coverimage',
    ],
    defaultPreview: value => value,
    fallbackToFirstField: false,
    showError: false,
  },
};
