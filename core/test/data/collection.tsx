import type { Collection, MarkdownField } from '@staticcms/core';

export const mockMarkdownField: MarkdownField = {
  label: 'Body',
  name: 'body',
  widget: 'markdown',
  hint: 'Main content goes here.',
};

export const mockMarkdownCollection: Collection<MarkdownField> = {
  name: 'posts',
  label: 'Posts',
  label_singular: 'Post',
  description:
    'The description is a great place for tone setting, high level information, and editing guidelines that are specific to a collection.\n',
  folder: '_posts',
  slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
  summary: '{{title}} -- {{year}}/{{month}}/{{day}}',
  sortable_fields: {
    fields: ['title', 'date'],
    default: {
      field: 'title',
    },
  },
  create: true,
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Draft',
      name: 'draft',
      widget: 'boolean',
      default: false,
    },
    {
      label: 'Publish Date',
      name: 'date',
      widget: 'datetime',
      date_format: 'yyyy-MM-dd',
      time_format: 'HH:mm',
      format: "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
    },
    {
      label: 'Cover Image',
      name: 'image',
      widget: 'image',
      required: false,
    },
    mockMarkdownField,
  ],
};
