export default {
  properties: {
    default: {
      oneOf: [
        { type: 'boolean' },
        { type: 'string' },
        { type: 'number' },
        {
          type: 'array',
          minItems: 1,
          items: { oneOf: [{ type: 'boolean' }, { type: 'string' }, { type: 'number' }] },
        },
      ],
    },
    allow_add: { type: 'boolean' },
    collapsed: { type: 'boolean' },
    summary: { type: 'string' },
    label_singular: { type: 'string' },
    fields: { type: 'object' },
    max: { type: 'number' },
    min: { type: 'number' },
    i18n: { type: 'boolean' },
    add_to_top: { type: 'boolean' },
    types: { type: 'object' },
    type_key: { type: 'string' },
  },
};
