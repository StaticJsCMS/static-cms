export default {
  properties: {
    default: { type: 'string' },
    media_folder: { type: 'string' },
    public_folder: { type: 'string' },
    choose_url: { type: 'boolean' },
    multiple: { type: 'boolean' },
    toolbar_buttons: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    media_library: {
      type: 'object',
      properties: {
        max_file_size: { type: 'number' },
        folder_support: { type: 'boolean' },
      },
    },
  },
};
