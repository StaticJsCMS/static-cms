export default {
  properties: {
    allow_multiple: { type: 'boolean' },
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
  },
};
