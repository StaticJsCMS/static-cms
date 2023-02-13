import type {
  BooleanField,
  DateTimeField,
  MarkdownField,
  NumberField,
  RelationField,
  SelectField,
  StringOrTextField,
} from '@staticcms/core';

export const mockBooleanField: BooleanField = {
  label: 'Boolean',
  name: 'mock_boolean',
  widget: 'boolean',
};

export const mockDateTimeField: DateTimeField = {
  label: 'DateTime',
  name: 'mock_datetime',
  widget: 'datetime',
};

export const mockMarkdownField: MarkdownField = {
  label: 'Body',
  name: 'body',
  widget: 'markdown',
  hint: 'Main content goes here.',
};

export const mockNumberField: NumberField = {
  label: 'Number',
  name: 'mock_number',
  widget: 'number',
};

export const mockRelationField: RelationField = {
  label: 'Relation',
  name: 'relation',
  widget: 'relation',
  collection: 'posts',
  display_fields: ['title', 'date'],
  search_fields: ['title', 'body'],
  value_field: 'title',
};

export const mockSelectField: SelectField = {
  label: 'Select',
  name: 'mock_select',
  widget: 'select',
  options: ['Option 1', 'Option 2', 'Option 3'],
};

export const mockStringField: StringOrTextField = {
  label: 'String',
  name: 'mock_string',
  widget: 'string',
};

export const mockTextField: StringOrTextField = {
  label: 'Text',
  name: 'mock_text',
  widget: 'text',
};
