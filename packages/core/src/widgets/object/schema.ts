export default {
  properties: {
    default: { type: 'object' },
    collapsed: { type: 'boolean' },
    summary: { type: 'string' },
    i18n: { type: 'boolean' },
    fields: { type: 'array', items: { type: 'object' } },
  },
};
