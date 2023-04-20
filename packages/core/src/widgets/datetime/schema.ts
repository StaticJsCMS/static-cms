export default {
  properties: {
    default: { type: 'string' },
    format: { type: 'string' },
    date_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
    time_format: { oneOf: [{ type: 'string' }, { type: 'boolean' }] },
    picker_utc: { type: 'boolean' },
  },
};
