export default {
  properties: {
    default: {
      oneOf: [{ type: 'string' }, { type: 'object' }],
    },
    default_language: { type: 'string' },
    allow_language_selection: { type: 'boolean' },
    keys: {
      type: 'object',
      properties: { code: { type: 'string' }, lang: { type: 'string' } },
    },
    output_code_only: { type: 'boolean' },
    code_mirror_config: { type: 'object' },
  },
};
