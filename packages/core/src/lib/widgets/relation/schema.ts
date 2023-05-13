export default {
  properties: {
    default: {
      oneOf: [
        { type: 'string' },
        {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      ],
    },
    collection: { type: 'string' },
    value_field: { type: 'string' },
    search_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
    file: { type: 'string' },
    display_fields: { type: 'array', minItems: 1, items: { type: 'string' } },
    multiple: { type: 'boolean' },
    min: { type: 'integer' },
    max: { type: 'integer' },
    options_length: { type: 'integer' },
  },
  oneOf: [
    {
      required: ['collection', 'value_field', 'search_fields'],
    },
    {
      required: ['collection', 'valueField', 'searchFields'],
    },
  ],
};
