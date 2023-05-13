export default {
  properties: {
    default: {
      oneOf: [
        { type: 'boolean' },
        { type: 'string' },
        { type: 'number' },
        { type: 'object' },
        {
          type: 'array',
          minItems: 1,
          items: {
            oneOf: [
              { type: 'boolean' },
              { type: 'string' },
              { type: 'number' },
              { type: 'object' },
            ],
          },
        },
      ],
    },
    allow_add: { type: 'boolean' },
    collapsed: { type: 'boolean' },
    summary: { type: 'string' },
    label_singular: { type: 'string' },
    fields: { type: 'array', items: { type: 'object' } },
    max: { type: 'number' },
    min: { type: 'number' },
    i18n: { type: 'boolean' },
    add_to_top: { type: 'boolean' },
    types: { type: 'array', items: { type: 'object' } },
    type_key: { type: 'string' },
  },
};
