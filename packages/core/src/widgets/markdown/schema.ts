export default {
  properties: {
    default: { type: 'string' },
    media_folder: { type: 'string' },
    public_folder: { type: 'string' },
    choose_url: { type: 'boolean' },
    multiple: { type: 'boolean' },
    toolbar_buttons: {
      type: 'object',
      properties: {
        main: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        selection: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        table_empty: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        table_select: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        insert: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
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
