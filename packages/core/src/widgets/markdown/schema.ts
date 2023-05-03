import {
  FONT_TOOLBAR_BUTTON,
  SHORTCODE_TOOLBAR_BUTTON,
  BLOCKQUOTE_TOOLBAR_BUTTON,
  BOLD_TOOLBAR_BUTTON,
  CODE_BLOCK_TOOLBAR_BUTTON,
  CODE_TOOLBAR_BUTTON,
  DECREASE_IDENT_TOOLBAR_BUTTON,
  DELETE_COLUMN_TOOLBAR_BUTTON,
  DELETE_ROW_TOOLBAR_BUTTON,
  DELETE_TABLE_TOOLBAR_BUTTON,
  INCRASE_IDENT_TOOLBAR_BUTTON,
  INSERT_COLUMN_TOOLBAR_BUTTON,
  IMAGE_TOOLBAR_BUTTON,
  FILE_LINK_TOOLBAR_BUTTON,
  INSERT_ROW_TOOLBAR_BUTTON,
  INSERT_TABLE_TOOLBAR_BUTTON,
  ITALIC_TOOLBAR_BUTTON,
  ORDERED_LIST_TOOLBAR_BUTTON,
  STRIKETHROUGH_TOOLBAR_BUTTON,
  UNORDERED_LIST_TOOLBAR_BUTTON,
} from '@staticcms/core/constants/toolbar_buttons';

const LowLevelButtonsArrayField = {
  type: 'array',
  items: {
    type: 'string',
    enum: [
      BLOCKQUOTE_TOOLBAR_BUTTON,
      BOLD_TOOLBAR_BUTTON,
      CODE_BLOCK_TOOLBAR_BUTTON,
      CODE_TOOLBAR_BUTTON,
      DECREASE_IDENT_TOOLBAR_BUTTON,
      DELETE_COLUMN_TOOLBAR_BUTTON,
      DELETE_ROW_TOOLBAR_BUTTON,
      DELETE_TABLE_TOOLBAR_BUTTON,
      INCRASE_IDENT_TOOLBAR_BUTTON,
      INSERT_COLUMN_TOOLBAR_BUTTON,
      IMAGE_TOOLBAR_BUTTON,
      FILE_LINK_TOOLBAR_BUTTON,
      INSERT_ROW_TOOLBAR_BUTTON,
      INSERT_TABLE_TOOLBAR_BUTTON,
      ITALIC_TOOLBAR_BUTTON,
      ORDERED_LIST_TOOLBAR_BUTTON,
      STRIKETHROUGH_TOOLBAR_BUTTON,
      UNORDERED_LIST_TOOLBAR_BUTTON,
    ],
  },
};

const MarkdownToolbarItemField = {
  type: 'array',
  items: {
    anyOf: [
      {
        type: 'string',
        enum: [
          FONT_TOOLBAR_BUTTON,
          SHORTCODE_TOOLBAR_BUTTON,
          BLOCKQUOTE_TOOLBAR_BUTTON,
          BOLD_TOOLBAR_BUTTON,
          CODE_BLOCK_TOOLBAR_BUTTON,
          CODE_TOOLBAR_BUTTON,
          DECREASE_IDENT_TOOLBAR_BUTTON,
          DELETE_COLUMN_TOOLBAR_BUTTON,
          DELETE_ROW_TOOLBAR_BUTTON,
          DELETE_TABLE_TOOLBAR_BUTTON,
          INCRASE_IDENT_TOOLBAR_BUTTON,
          INSERT_COLUMN_TOOLBAR_BUTTON,
          IMAGE_TOOLBAR_BUTTON,
          FILE_LINK_TOOLBAR_BUTTON,
          INSERT_ROW_TOOLBAR_BUTTON,
          INSERT_TABLE_TOOLBAR_BUTTON,
          ITALIC_TOOLBAR_BUTTON,
          ORDERED_LIST_TOOLBAR_BUTTON,
          STRIKETHROUGH_TOOLBAR_BUTTON,
          UNORDERED_LIST_TOOLBAR_BUTTON,
        ],
      },
      {
        type: 'object',
        properties: {
          label: { type: 'string' },
          icon: { type: 'string' },
          groups: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                items: LowLevelButtonsArrayField,
              },
              required: ['items'],
            },
          },
        },
        required: ['label', 'groups'],
      },
    ],
  },
};

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
        main: MarkdownToolbarItemField,
        empty: MarkdownToolbarItemField,
        selection: MarkdownToolbarItemField,
        table_empty: MarkdownToolbarItemField,
        table_select: MarkdownToolbarItemField,
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
