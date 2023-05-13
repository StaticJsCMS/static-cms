import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_LINK,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
  ELEMENT_UL,
} from '@udecode/plate';
import React from 'react';

import { ELEMENT_SHORTCODE } from '../plateTypes';

import type { ShortcodeConfig } from '@staticcms/core/interface';
import type { MdValue } from '../plateTypes';

export const testShortcodeConfigs: Record<string, ShortcodeConfig> = {
  twitter: {
    openTag: '{{< ',
    closeTag: ' >}}',
    separator: ' ',
    control: () => <div>twitter control</div>,
    preview: () => <div>twitter preview</div>,
  },
  youtube: {
    openTag: '[',
    closeTag: ']',
    separator: '|',
    control: () => <div>youtube control</div>,
    preview: () => <div>youtube preview</div>,
  },
};

export interface SerializationTestData {
  markdown: string;
  // mdast: MdastNode;
  slate: MdValue;
}

interface SerializationMarkdownMdxSplitTests {
  markdown?: Record<string, SerializationTestData>;
  mdx?: Record<string, SerializationTestData>;
  both?: Record<string, SerializationTestData>;
}

type SerializationTests = Record<string, SerializationMarkdownMdxSplitTests>;

const serializationTestData: SerializationTests = {
  'plain text': {
    both: {
      paragraph: {
        markdown: 'A line of text',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'A line of text',
              },
            ],
          },
        ] as MdValue,
      },

      'paragraph with line break': {
        markdown: `A line of text
With another in the same paragraph`,
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'A line of text\nWith another in the same paragraph',
              },
            ],
          },
        ],
      },

      'two paragraphs': {
        markdown: `A line of text

And a completely new paragraph`,
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'A line of text',
              },
            ],
          },
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'And a completely new paragraph',
              },
            ],
          },
        ],
      },
    },
  },

  headers: {
    both: {
      'header 1': {
        markdown: '# Header One',
        slate: [
          {
            type: ELEMENT_H1,
            children: [
              {
                text: 'Header One',
              },
            ],
          },
        ],
      },

      'header 2': {
        markdown: '## Header Two',
        slate: [
          {
            type: ELEMENT_H2,
            children: [
              {
                text: 'Header Two',
              },
            ],
          },
        ],
      },

      'header 3': {
        markdown: '### Header Three',
        slate: [
          {
            type: ELEMENT_H3,
            children: [
              {
                text: 'Header Three',
              },
            ],
          },
        ],
      },

      'header 4': {
        markdown: '#### Header Four',
        slate: [
          {
            type: ELEMENT_H4,
            children: [
              {
                text: 'Header Four',
              },
            ],
          },
        ],
      },

      'header 5': {
        markdown: '##### Header Five',
        slate: [
          {
            type: ELEMENT_H5,
            children: [
              {
                text: 'Header Five',
              },
            ],
          },
        ],
      },

      'header 6': {
        markdown: '###### Header Six',
        slate: [
          {
            type: ELEMENT_H6,
            children: [
              {
                text: 'Header Six',
              },
            ],
          },
        ],
      },

      'Multiline Header': {
        markdown: `# Line One\
 Line Two`,
        slate: [
          {
            type: ELEMENT_H1,
            children: [
              {
                text: 'Line One Line Two',
              },
            ],
          },
        ],
      },
    },
  },

  blockquote: {
    both: {
      blockquote: {
        markdown: '> I am a block quote',
        slate: [
          {
            type: ELEMENT_BLOCKQUOTE,
            children: [
              {
                text: 'I am a block quote',
              },
            ],
          },
        ],
      },

      'multiline blockquote': {
        markdown: '> I am a block quote\n> And another line',
        slate: [
          {
            type: ELEMENT_BLOCKQUOTE,
            children: [
              {
                text: 'I am a block quote\nAnd another line',
              },
            ],
          },
        ],
      },

      'nested blockquote': {
        markdown: '> I am a block quote\n> > And another line',
        slate: [
          {
            type: ELEMENT_BLOCKQUOTE,
            children: [
              {
                text: 'I am a block quote',
              },
              {
                type: ELEMENT_BLOCKQUOTE,
                children: [
                  {
                    text: 'And another line',
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },
    },
  },

  code: {
    both: {
      'inline code': {
        markdown: "`<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>`",
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                code: true,
                text: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
              },
            ],
          },
        ],
      },
    },
  },

  'code block': {
    both: {
      'code block': {
        markdown:
          "```\n<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>\n```",
        slate: [
          {
            type: ELEMENT_CODE_BLOCK,
            code: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
            lang: null,
            children: [
              {
                text: '',
              },
            ],
          },
        ] as MdValue,
      },

      'code block with language': {
        markdown:
          "```javascript\n<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>\n```",
        slate: [
          {
            type: ELEMENT_CODE_BLOCK,
            code: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
            lang: 'javascript',
            children: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    },
  },

  image: {
    both: {
      image: {
        markdown: '![Alt Text](https://example.com/picture.png)',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_IMAGE,
                url: 'https://example.com/picture.png',
                alt: 'Alt Text',
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },

      'image without alt text': {
        markdown: '![](https://example.com/picture.png)',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_IMAGE,
                url: 'https://example.com/picture.png',
                alt: '',
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },

  link: {
    both: {
      links: {
        markdown: '[Link Text](https://example.com/)',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_LINK,
                url: 'https://example.com/',
                children: [
                  {
                    text: 'Link Text',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },

  list: {
    both: {
      'unordered list': {
        markdown: `- List Item 1
- List Item 2
- List Item 3`,
        slate: [
          {
            type: ELEMENT_UL,
            children: [
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 1',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 2',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 3',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },

      'nested unordered list': {
        markdown: `- List Item 1
- List Item 2
  - List Item 3`,
        slate: [
          {
            type: ELEMENT_UL,
            children: [
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 1',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 2',
                      },
                    ],
                  },
                  {
                    type: ELEMENT_UL,
                    children: [
                      {
                        type: ELEMENT_LI,
                        checked: null,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [
                              {
                                text: 'List Item 3',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },

      'todo unordered list': {
        markdown: `- [ ] List Item 1
- [x] List Item 2
  - [x] List Item 3`,
        slate: [
          {
            type: ELEMENT_UL,
            children: [
              {
                type: ELEMENT_LI,
                checked: false,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 1',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: true,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 2',
                      },
                    ],
                  },
                  {
                    type: ELEMENT_UL,
                    children: [
                      {
                        type: ELEMENT_LI,
                        checked: true,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [
                              {
                                text: 'List Item 3',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },

      'ordered list': {
        markdown: `1. List Item 1
1. List Item 2
1. List Item 3`,
        slate: [
          {
            type: ELEMENT_OL,
            children: [
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 1',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 2',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 3',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },

      'nested ordered list': {
        markdown: `1. List Item 1
1. List Item 2
   1. List Item 3`,
        slate: [
          {
            type: ELEMENT_OL,
            children: [
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 1',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 2',
                      },
                    ],
                  },
                  {
                    type: ELEMENT_OL,
                    children: [
                      {
                        type: ELEMENT_LI,
                        checked: null,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [
                              {
                                text: 'List Item 3',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },

      'nested todo ordered list': {
        markdown: `1. [x] List Item 1
1. [ ] List Item 2
   1. [ ] List Item 3`,
        slate: [
          {
            type: ELEMENT_OL,
            children: [
              {
                type: ELEMENT_LI,
                checked: true,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 1',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: false,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 2',
                      },
                    ],
                  },
                  {
                    type: ELEMENT_OL,
                    children: [
                      {
                        type: ELEMENT_LI,
                        checked: false,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [
                              {
                                text: 'List Item 3',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },

      'nested mixed list': {
        markdown: `- List Item 1
- List Item 2
   1. [x] List Item 3
   1. [ ] List Item 4`,
        slate: [
          {
            type: ELEMENT_UL,
            children: [
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 1',
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                checked: null,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [
                      {
                        text: 'List Item 2',
                      },
                    ],
                  },
                  {
                    type: ELEMENT_OL,
                    children: [
                      {
                        type: ELEMENT_LI,
                        checked: true,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [
                              {
                                text: 'List Item 3',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: ELEMENT_LI,
                        checked: false,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [
                              {
                                text: 'List Item 4',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },
    },
  },

  italic: {
    both: {
      'italic (using _)': {
        markdown: '_Italic_',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                italic: true,
                text: 'Italic',
              },
            ],
          },
        ],
      },
    },
  },

  bold: {
    both: {
      'bold (using **)': {
        markdown: '**Bold**',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                bold: true,
                text: 'Bold',
              },
            ],
          },
        ],
      },
    },
  },

  strikethrough: {
    both: {
      strikethrough: {
        markdown: '~~Strikethrough~~',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                strikethrough: true,
                text: 'Strikethrough',
              },
            ],
          },
        ],
      },
    },
  },

  align: {
    markdown: {
      align: {
        markdown: "<p style={{ textAlign: 'center' }}>Align Center</p>",
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: "<p style={{ textAlign: 'center' }}>Align Center</p>",
              },
            ],
          },
        ] as MdValue,
      },
    },

    mdx: {
      'align left': {
        markdown: "<p style={{ textAlign: 'left' }}>Align Left</p>",
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            align: 'left',
            children: [
              {
                text: 'Align Left',
              },
            ],
          },
        ],
      },

      'align center': {
        markdown: "<p style={{ textAlign: 'center' }}>Align Center</p>",
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            align: 'center',
            children: [
              {
                text: 'Align Center',
              },
            ],
          },
        ],
      },

      'align right': {
        markdown: "<p style={{ textAlign: 'right' }}>Align Right</p>",
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            align: 'right',
            children: [
              {
                text: 'Align Right',
              },
            ],
          },
        ],
      },
    },
  },

  subscript: {
    mdx: {
      'subscript tag': {
        markdown: '<sub>Subscript</sub>',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                subscript: true,
                text: 'Subscript',
              },
            ],
          },
        ],
      },
    },
  },

  superscript: {
    mdx: {
      'superscript tag': {
        markdown: '<sup>Superscript</sup>',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                superscript: true,
                text: 'Superscript',
              },
            ],
          },
        ],
      },
    },
  },

  underline: {
    mdx: {
      'underline tag': {
        markdown: '<u>Underlined</u>',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                underline: true,
                text: 'Underlined',
              },
            ],
          },
        ],
      },
    },
  },

  'font tags': {
    mdx: {
      'color and background color from style attribute of font tag': {
        markdown: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                color: 'red',
                backgroundColor: 'black',
                text: 'Colored Text',
              },
            ],
          },
        ],
      },
    },
  },

  shortcodes: {
    markdown: {
      shortcode: {
        markdown: '[youtube|p6h-rYSVX90]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'shortcode with url': {
        markdown: '[youtube|https://www.youtube.com/watch?v=p6h-rYSVX90]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['https://www.youtube.com/watch?v=p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'shortcode with no args': {
        markdown: '[youtube]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: [],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'shortcode with multiple args': {
        markdown: '[youtube|p6h-rYSVX90|somethingElse|andOneMore]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90', 'somethingElse', 'andOneMore'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'shortcode with text before': {
        markdown: 'Text before [youtube|p6h-rYSVX90]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'Text before ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'shortcode with text after': {
        markdown: '[youtube|p6h-rYSVX90] and text after',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' and text after',
              },
            ],
          },
        ],
      },

      'shortcode with text before and after': {
        markdown: 'Text before [youtube|p6h-rYSVX90] and text after',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'Text before ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' and text after',
              },
            ],
          },
        ],
      },

      'multiple shortcodes': {
        markdown: 'Text before [youtube|p6h-rYSVX90] and {{< twitter 917359331535966209 >}}',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'Text before ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' and ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'twitter',
                args: ['917359331535966209'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'multiple of the same shortcodes': {
        markdown:
          'Text before [youtube|p6h-rYSVX90], [youtube|p6h-rYSVX90], {{< twitter 917359331535966209 >}} and [youtube|p6h-rYSVX90]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'Text before ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ', ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ', ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'twitter',
                args: ['917359331535966209'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' and ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'unrecognized shortcode': {
        markdown: '[someOtherShortcode|andstuff]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: '[someOtherShortcode|andstuff]',
              },
            ],
          },
        ],
      },

      'unrecognized shortcode surrounded by recognized shortcodes': {
        markdown:
          'Text before [youtube|p6h-rYSVX90], [someOtherShortcode|andstuff] and {{< twitter 917359331535966209 >}}',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'Text before ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ', [someOtherShortcode|andstuff] and ',
              },
              {
                type: ELEMENT_SHORTCODE,
                shortcode: 'twitter',
                args: ['917359331535966209'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },

      'plain text': {
        markdown: 'Some text about something going on somewhere',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'Some text about something going on somewhere',
              },
            ],
          },
        ],
      },
    },

    mdx: {
      shortcode: {
        markdown: '[youtube|p6h-rYSVX90]',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: '[youtube|p6h-rYSVX90]',
              },
            ],
          },
        ],
      },
    },
  },

  table: {
    both: {
      table: {
        markdown: `|Name|Age|
|---|---|
|Bob|25|
|Billy|30|
|Sam|29|`,
        slate: [
          {
            type: ELEMENT_TABLE,
            children: [
              {
                type: ELEMENT_TR,
                children: [
                  {
                    type: ELEMENT_TH,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: 'Name',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: ELEMENT_TH,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: 'Age',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_TR,
                children: [
                  {
                    type: ELEMENT_TD,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: 'Bob',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: ELEMENT_TD,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: '25',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_TR,
                children: [
                  {
                    type: ELEMENT_TD,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: 'Billy',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: ELEMENT_TD,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: '30',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_TR,
                children: [
                  {
                    type: ELEMENT_TD,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: 'Sam',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: ELEMENT_TD,
                    children: [
                      {
                        type: ELEMENT_PARAGRAPH,
                        children: [
                          {
                            text: '29',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },
    },
  },

  'kitchen sink': {
    markdown: {
      'kitchen sink': {
        markdown: `# The post is number 1

![Static CMS](https://raw.githubusercontent.com/StaticJsCMS/static-cms/main/static-cms-logo.png)

# Awesome Editor!

It was _released as open source in 2022_ and is ***continually*** evolving to be the **best editor experience** available for static site generators.

## MDX

The output out this widget is \`mdx\`, a mixture of \`markdown\` and \`javascript components\`. See [MDX documentation](https://mdxjs.com/docs/).

\`\`\`yaml
name: body
label: Blog post content
widget: markdown
\`\`\`

\`\`\`js
name: 'body',
label: 'Blog post content',
widget: 'markdown',
\`\`\`

> See the table below for default options
> More API information can be found in the document

|Name|Type|Default|Description|
|---|---|---|---|
|default|string|\`''\`|_Optional_. The default value for the field. Accepts markdown content|
|media_library|Media Library Options|\`{}\`|_Optional_. Media library settings to apply when a media library is opened by the current widget. See [Media Library Options](#media-library-options)|
|media_folder|string| |_Optional_. Specifies the folder path where uploaded files should be saved, relative to the base of the repo|
|public_folder|string| |_Optional_. Specifies the folder path where the files uploaded by the media library will be accessed, relative to the base of the built site|

### Media Library Options

|Name|Type|Default|Description|
|---|---|---|---|
|allow_multiple|boolean|\`true\`|_Optional_. When set to \`false\`, prevents multiple selection for any media library extension, but must be supported by the extension in use|
|config|string|\`{}\`|_Optional_. A configuration object that will be passed directly to the media library being used - available options are determined by the library|
|choose_url|string<br />\\| boolean|\`true\`|_Optional_. When set to \`false\`, the "Insert from URL" button will be hidden|

## Features

- CommonMark + GFM Specifications
  - Live \`Preview\`
  - Auto Indent
  - Syntax Highlight
      1. Rich Editor
      1. Preview

## Formatting

**Bold**, _Italic_, ***both***

~~Strikethrough~~

## Shortcodes

Text ahead [youtube|p6h-rYSVX90] and behind

{{< twitter 917359331535966209 >}} Only behind text

Only text before {{< twitter 917359331535966209 >}}

[youtube|p6h-rYSVX90]

Text ahead [youtube|p6h-rYSVX90] and behind and another {{< twitter 917359331535966209 >}} shortcode

## Support

> - Supports remark plugins
> - Supports wrappers
>    1. [x] React
>    1. [ ] More coming soon`,
        slate: [
          {
            type: 'h1',
            children: [
              {
                text: 'The post is number 1',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                type: 'img',
                children: [
                  {
                    text: '',
                  },
                ],
                url: 'https://raw.githubusercontent.com/StaticJsCMS/static-cms/main/static-cms-logo.png',
                alt: 'Static CMS',
              },
            ],
          },
          {
            type: 'h1',
            children: [
              {
                text: 'Awesome Editor!',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'It was ',
              },
              {
                italic: true,
                text: 'released as open source in 2022',
              },
              {
                text: ' and is ',
              },
              {
                bold: true,
                text: 'continually',
                italic: true,
              },
              {
                text: ' evolving to be the ',
              },
              {
                bold: true,
                text: 'best editor experience',
              },
              {
                text: ' available for static site generators.',
              },
            ],
          },
          {
            type: 'h2',
            children: [
              {
                text: 'MDX',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'The output out this widget is ',
              },
              {
                code: true,
                text: 'mdx',
              },
              {
                text: ', a mixture of ',
              },
              {
                code: true,
                text: 'markdown',
              },
              {
                text: ' and ',
              },
              {
                code: true,
                text: 'javascript components',
              },
              {
                text: '. See ',
              },
              {
                type: 'a',
                url: 'https://mdxjs.com/docs/',
                children: [
                  {
                    text: 'MDX documentation',
                  },
                ],
              },
              {
                text: '.',
              },
            ],
          },
          {
            type: 'code_block',
            lang: 'yaml',
            code: 'name: body\nlabel: Blog post content\nwidget: markdown',
            children: [
              {
                text: '',
              },
            ],
          },
          {
            type: 'code_block',
            lang: 'js',
            code: "name: 'body',\nlabel: 'Blog post content',\nwidget: 'markdown',",
            children: [
              {
                text: '',
              },
            ],
          },
          {
            type: 'blockquote',
            children: [
              {
                text: 'See the table below for default options\nMore API information can be found in the document',
              },
            ],
          },
          {
            type: 'table',
            children: [
              {
                type: 'tr',
                children: [
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Name',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Type',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Default',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Description',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tr',
                children: [
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'default',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'string',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            code: true,
                            text: "''",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            italic: true,
                            text: 'Optional',
                          },
                          {
                            text: '. The default value for the field. Accepts markdown content',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tr',
                children: [
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'media_library',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Media Library Options',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            code: true,
                            text: '{}',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            italic: true,
                            text: 'Optional',
                          },
                          {
                            text: '. Media library settings to apply when a media library is opened by the current widget. See ',
                          },
                          {
                            type: 'a',
                            url: '#media-library-options',
                            children: [
                              {
                                text: 'Media Library Options',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tr',
                children: [
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'media_folder',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'string',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: '',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            italic: true,
                            text: 'Optional',
                          },
                          {
                            text: '. Specifies the folder path where uploaded files should be saved, relative to the base of the repo',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tr',
                children: [
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'public_folder',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'string',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: '',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            italic: true,
                            text: 'Optional',
                          },
                          {
                            text: '. Specifies the folder path where the files uploaded by the media library will be accessed, relative to the base of the built site',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'h3',
            children: [
              {
                text: 'Media Library Options',
              },
            ],
          },
          {
            type: 'table',
            children: [
              {
                type: 'tr',
                children: [
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Name',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Type',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Default',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'th',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Description',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tr',
                children: [
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'allow_multiple',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'boolean',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            code: true,
                            text: 'true',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            italic: true,
                            text: 'Optional',
                          },
                          {
                            text: '. When set to ',
                          },
                          {
                            code: true,
                            text: 'false',
                          },
                          {
                            text: ', prevents multiple selection for any media library extension, but must be supported by the extension in use',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tr',
                children: [
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'config',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'string',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            code: true,
                            text: '{}',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            italic: true,
                            text: 'Optional',
                          },
                          {
                            text: '. A configuration object that will be passed directly to the media library being used - available options are determined by the library',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tr',
                children: [
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'choose_url',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'string',
                          },
                          {
                            type: 'p',
                            children: [
                              {
                                text: '<br />',
                              },
                            ],
                          },
                          {
                            text: '| boolean',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            code: true,
                            text: 'true',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'td',
                    children: [
                      {
                        type: 'p',
                        children: [
                          {
                            italic: true,
                            text: 'Optional',
                          },
                          {
                            text: '. When set to ',
                          },
                          {
                            code: true,
                            text: 'false',
                          },
                          {
                            text: ', the "Insert from URL" button will be hidden',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'h2',
            children: [
              {
                text: 'Features',
              },
            ],
          },
          {
            type: 'ul',
            children: [
              {
                type: 'li',
                checked: null,
                children: [
                  {
                    type: 'lic',
                    children: [
                      {
                        text: 'CommonMark + GFM Specifications',
                      },
                    ],
                  },
                  {
                    type: 'ul',
                    children: [
                      {
                        type: 'li',
                        checked: null,
                        children: [
                          {
                            type: 'lic',
                            children: [
                              {
                                text: 'Live ',
                              },
                              {
                                code: true,
                                text: 'Preview',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'li',
                        checked: null,
                        children: [
                          {
                            type: 'lic',
                            children: [
                              {
                                text: 'Auto Indent',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'li',
                        checked: null,
                        children: [
                          {
                            type: 'lic',
                            children: [
                              {
                                text: 'Syntax Highlight',
                              },
                            ],
                          },
                          {
                            type: 'ol',
                            children: [
                              {
                                type: 'li',
                                checked: null,
                                children: [
                                  {
                                    type: 'lic',
                                    children: [
                                      {
                                        text: 'Rich Editor',
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                type: 'li',
                                checked: null,
                                children: [
                                  {
                                    type: 'lic',
                                    children: [
                                      {
                                        text: 'Preview',
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'h2',
            children: [
              {
                text: 'Formatting',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                bold: true,
                text: 'Bold',
              },
              {
                text: ', ',
              },
              {
                italic: true,
                text: 'Italic',
              },
              {
                text: ', ',
              },
              {
                italic: true,
                text: 'both',
                bold: true,
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                strikethrough: true,
                text: 'Strikethrough',
              },
            ],
          },
          {
            type: 'h2',
            children: [
              {
                text: 'Shortcodes',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'Text ahead ',
              },
              {
                type: 'shortcode',
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' and behind',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                type: 'shortcode',
                shortcode: 'twitter',
                args: ['917359331535966209'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' Only behind text',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'Only text before ',
              },
              {
                type: 'shortcode',
                shortcode: 'twitter',
                args: ['917359331535966209'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                type: 'shortcode',
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'Text ahead ',
              },
              {
                type: 'shortcode',
                shortcode: 'youtube',
                args: ['p6h-rYSVX90'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' and behind and another ',
              },
              {
                type: 'shortcode',
                shortcode: 'twitter',
                args: ['917359331535966209'],
                children: [
                  {
                    text: '',
                  },
                ],
              },
              {
                text: ' shortcode',
              },
            ],
          },
          {
            type: 'h2',
            children: [
              {
                text: 'Support',
              },
            ],
          },
          {
            type: 'blockquote',
            children: [
              {
                type: 'ul',
                children: [
                  {
                    type: 'li',
                    checked: null,
                    children: [
                      {
                        type: 'lic',
                        children: [
                          {
                            text: 'Supports remark plugins',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'li',
                    checked: null,
                    children: [
                      {
                        type: 'lic',
                        children: [
                          {
                            text: 'Supports wrappers',
                          },
                        ],
                      },
                      {
                        type: 'ol',
                        children: [
                          {
                            type: 'li',
                            checked: true,
                            children: [
                              {
                                type: 'lic',
                                children: [
                                  {
                                    text: 'React',
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: 'li',
                            checked: false,
                            children: [
                              {
                                type: 'lic',
                                children: [
                                  {
                                    text: 'More coming soon',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ] as MdValue,
      },
    },
  },
};

export const deserializationOnlyTestData: SerializationTests = {
  paragraph: {
    markdown: {
      'paragraph with link': {
        markdown:
          'A line of text with a link https://www.youtube.com/watch?v=p6h-rYSVX90 and some more text',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: 'A line of text with a link ',
              },
              {
                type: ELEMENT_LINK,
                url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
                children: [
                  {
                    text: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
                  },
                ],
              },
              {
                text: ' and some more text',
              },
            ],
          },
        ] as MdValue,
      },
    },
  },

  italic: {
    both: {
      'italic (using *)': {
        markdown: '*Italic*',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                italic: true,
                text: 'Italic',
              },
            ],
          },
        ],
      },
    },
  },

  bold: {
    both: {
      'bold (using __)': {
        markdown: '__Bold__',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                bold: true,
                text: 'Bold',
              },
            ],
          },
        ],
      },
    },
  },

  'bold and italic': {
    both: {
      'bold and italic (using ___)': {
        markdown: '___Bold and Italic___',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                bold: true,
                italic: true,
                text: 'Bold and Italic',
              },
            ],
          },
        ],
      },

      'bold and italic (using **_)': {
        markdown: '**_Bold and Italic_**',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                bold: true,
                italic: true,
                text: 'Bold and Italic',
              },
            ],
          },
        ],
      },

      'bold and italic (using __*)': {
        markdown: '__*Bold and Italic*__',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                bold: true,
                italic: true,
                text: 'Bold and Italic',
              },
            ],
          },
        ],
      },

      'bold and italic (using *__)': {
        markdown: '*__Bold and Italic__*',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                bold: true,
                italic: true,
                text: 'Bold and Italic',
              },
            ],
          },
        ],
      },
    },
  },

  color: {
    mdx: {
      'color attribute of font tag': {
        markdown: '<font color="red">Colored Text</font>',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                color: 'red',
                text: 'Colored Text',
              },
            ],
          },
        ],
      },

      'color and style attributes of font tag together (favoring color)': {
        markdown:
          "<font color=\"blue\" style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                color: 'blue',
                backgroundColor: 'black',
                text: 'Colored Text',
              },
            ],
          },
        ],
      },
    },
  },

  align: {
    mdx: {
      'align attribute of paragraph tag': {
        markdown: '<p align="left">Aligned Left</p>',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            align: 'left',
            children: [
              {
                text: 'Aligned Left',
              },
            ],
          },
        ],
      },

      'align and style attributes of font paragraph together (favoring align)': {
        markdown: '<p align="center" style={{ textAlign: \'center\' }}>Aligned Center</p>',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            align: 'center',
            children: [
              {
                text: 'Aligned Center',
              },
            ],
          },
        ],
      },
    },
  },

  break: {
    mdx: {
      'break tag': {
        markdown: '<br />',
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    },
  },
};

function runSectionSerializationTests(
  sectionKey: string,
  mode: 'markdown' | 'mdx' | 'both',
  tests: Record<string, SerializationTestData>,
  testCallback: (
    key: string,
    mode: 'markdown' | 'mdx' | 'both',
    data: SerializationTestData,
  ) => void,
) {
  describe(sectionKey, () => {
    Object.keys(tests).forEach(key => testCallback(key, mode, tests[key]));
  });
}

export function runSerializationTests(
  testCallback: (
    key: string,
    mode: 'markdown' | 'mdx' | 'both',
    data: SerializationTestData,
  ) => void,
  testData = serializationTestData,
) {
  Object.keys(testData).forEach(key => {
    const data = testData[key];

    describe(key, () => {
      if (data.markdown) {
        runSectionSerializationTests('markdown', 'markdown', data.markdown, testCallback);
      } else if (data.mdx) {
        runSectionSerializationTests('mdx', 'mdx', data.mdx, testCallback);
      } else if (data.both) {
        runSectionSerializationTests('markdown', 'markdown', data.both, testCallback);
        runSectionSerializationTests('mdx', 'mdx', data.both, testCallback);
      }
    });
  });
}
