export default {
  properties: {
    default: {
      oneOf: [
        { type: 'string' },
        { type: 'number' },
        {
          type: 'array',
          items: {
            oneOf: [{ type: 'string' }, { type: 'number' }],
          },
        },
      ],
    },
    options: {
      type: 'array',
      items: {
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          {
            type: 'object',
            properties: {
              label: { type: 'string' },
              value: { oneOf: [{ type: 'string' }, { type: 'number' }] },
            },
            required: ['label', 'value'],
          },
        ],
      },
    },
    multiple: { type: 'boolean' },
    min: { type: 'integer' },
    max: { type: 'integer' },
  },
  required: ['options'],
};
