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
import type { MdastNode } from '../serialization';

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
  mdast: MdastNode;
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'A line of text',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 15, offset: 14 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 15, offset: 14 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 15, offset: 14 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'A line of text\nWith another in the same paragraph',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 2, column: 35, offset: 49 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 2, column: 35, offset: 49 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 35, offset: 49 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'A line of text',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 15, offset: 14 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 15, offset: 14 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'And a completely new paragraph',
                  position: {
                    start: { line: 3, column: 1, offset: 16 },
                    end: { line: 3, column: 31, offset: 46 },
                  },
                },
              ],
              position: {
                start: { line: 3, column: 1, offset: 16 },
                end: { line: 3, column: 31, offset: 46 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 31, offset: 46 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'heading',
              depth: 1,
              children: [
                {
                  type: 'text',
                  value: 'Header One',
                  position: {
                    start: { line: 1, column: 3, offset: 2 },
                    end: { line: 1, column: 13, offset: 12 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 13, offset: 12 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 13, offset: 12 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'heading',
              depth: 2,
              children: [
                {
                  type: 'text',
                  value: 'Header Two',
                  position: {
                    start: { line: 1, column: 4, offset: 3 },
                    end: { line: 1, column: 14, offset: 13 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 14, offset: 13 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 14, offset: 13 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'heading',
              depth: 3,
              children: [
                {
                  type: 'text',
                  value: 'Header Three',
                  position: {
                    start: { line: 1, column: 5, offset: 4 },
                    end: { line: 1, column: 17, offset: 16 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 17, offset: 16 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 17, offset: 16 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'heading',
              depth: 4,
              children: [
                {
                  type: 'text',
                  value: 'Header Four',
                  position: {
                    start: { line: 1, column: 6, offset: 5 },
                    end: { line: 1, column: 17, offset: 16 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 17, offset: 16 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 17, offset: 16 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'heading',
              depth: 5,
              children: [
                {
                  type: 'text',
                  value: 'Header Five',
                  position: {
                    start: { line: 1, column: 7, offset: 6 },
                    end: { line: 1, column: 18, offset: 17 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 18, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 18, offset: 17 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'heading',
              depth: 6,
              children: [
                {
                  type: 'text',
                  value: 'Header Six',
                  position: {
                    start: { line: 1, column: 8, offset: 7 },
                    end: { line: 1, column: 18, offset: 17 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 18, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 18, offset: 17 },
          },
        },
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
    },
  },

  blockquote: {
    both: {
      blockquote: {
        markdown: '> I am a block quote',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'blockquote',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      value: 'I am a block quote',
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 21, offset: 20 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 3, offset: 2 },
                    end: { line: 1, column: 21, offset: 20 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 21, offset: 20 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'blockquote',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      value: 'I am a block quote\nAnd another line',
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 2, column: 19, offset: 39 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 3, offset: 2 },
                    end: { line: 2, column: 19, offset: 39 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 2, column: 19, offset: 39 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 19, offset: 39 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'blockquote',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      value: 'I am a block quote',
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 21, offset: 20 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 3, offset: 2 },
                    end: { line: 1, column: 21, offset: 20 },
                  },
                },
                {
                  type: 'blockquote',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'And another line',
                          position: {
                            start: { line: 2, column: 5, offset: 25 },
                            end: { line: 2, column: 21, offset: 41 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 5, offset: 25 },
                        end: { line: 2, column: 21, offset: 41 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 3, offset: 23 },
                    end: { line: 2, column: 21, offset: 41 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 2, column: 21, offset: 41 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 21, offset: 41 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'inlineCode',
                  value:
                    "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 79, offset: 78 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 79, offset: 78 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 79, offset: 78 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'code',
              lang: null,
              meta: null,
              value: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 4, offset: 84 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 4, offset: 84 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'code',
              lang: 'javascript',
              meta: null,
              value: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 4, offset: 94 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 4, offset: 94 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'image',
                  title: null,
                  url: 'https://example.com/picture.png',
                  alt: 'Alt Text',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 45, offset: 44 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 45, offset: 44 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 45, offset: 44 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'image',
                  title: null,
                  url: 'https://example.com/picture.png',
                  alt: '',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 37, offset: 36 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 37, offset: 36 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 37, offset: 36 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'link',
                  title: null,
                  url: 'https://example.com/',
                  children: [
                    {
                      type: 'text',
                      value: 'Link Text',
                      position: {
                        start: { line: 1, column: 2, offset: 1 },
                        end: { line: 1, column: 11, offset: 10 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 34, offset: 33 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 34, offset: 33 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 34, offset: 33 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'list',
              ordered: false,
              start: null,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 1',
                          position: {
                            start: { line: 1, column: 3, offset: 2 },
                            end: { line: 1, column: 14, offset: 13 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 14, offset: 13 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 14, offset: 13 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 2',
                          position: {
                            start: { line: 2, column: 3, offset: 16 },
                            end: { line: 2, column: 14, offset: 27 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 3, offset: 16 },
                        end: { line: 2, column: 14, offset: 27 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 1, offset: 14 },
                    end: { line: 2, column: 14, offset: 27 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 3',
                          position: {
                            start: { line: 3, column: 3, offset: 30 },
                            end: { line: 3, column: 14, offset: 41 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 3, offset: 30 },
                        end: { line: 3, column: 14, offset: 41 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 3, column: 1, offset: 28 },
                    end: { line: 3, column: 14, offset: 41 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 14, offset: 41 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 14, offset: 41 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'list',
              ordered: false,
              start: null,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 1',
                          position: {
                            start: { line: 1, column: 3, offset: 2 },
                            end: { line: 1, column: 14, offset: 13 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 14, offset: 13 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 14, offset: 13 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 2',
                          position: {
                            start: { line: 2, column: 3, offset: 16 },
                            end: { line: 2, column: 14, offset: 27 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 3, offset: 16 },
                        end: { line: 2, column: 14, offset: 27 },
                      },
                    },
                    {
                      type: 'list',
                      ordered: false,
                      start: null,
                      spread: false,
                      children: [
                        {
                          type: 'listItem',
                          spread: false,
                          checked: null,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'List Item 3',
                                  position: {
                                    start: { line: 3, column: 5, offset: 32 },
                                    end: { line: 3, column: 16, offset: 43 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 3, column: 5, offset: 32 },
                                end: { line: 3, column: 16, offset: 43 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 3, column: 3, offset: 30 },
                            end: { line: 3, column: 16, offset: 43 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 3, offset: 30 },
                        end: { line: 3, column: 16, offset: 43 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 1, offset: 14 },
                    end: { line: 3, column: 16, offset: 43 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 16, offset: 43 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 16, offset: 43 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'list',
              ordered: false,
              start: null,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: false,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 1',
                          position: {
                            start: { line: 1, column: 7, offset: 6 },
                            end: { line: 1, column: 18, offset: 17 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 7, offset: 6 },
                        end: { line: 1, column: 18, offset: 17 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 18, offset: 17 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: true,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 2',
                          position: {
                            start: { line: 2, column: 7, offset: 24 },
                            end: { line: 2, column: 18, offset: 35 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 7, offset: 24 },
                        end: { line: 2, column: 18, offset: 35 },
                      },
                    },
                    {
                      type: 'list',
                      ordered: false,
                      start: null,
                      spread: false,
                      children: [
                        {
                          type: 'listItem',
                          spread: false,
                          checked: true,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'List Item 3',
                                  position: {
                                    start: { line: 3, column: 9, offset: 44 },
                                    end: { line: 3, column: 20, offset: 55 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 3, column: 9, offset: 44 },
                                end: { line: 3, column: 20, offset: 55 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 3, column: 3, offset: 38 },
                            end: { line: 3, column: 20, offset: 55 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 3, offset: 38 },
                        end: { line: 3, column: 20, offset: 55 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 1, offset: 18 },
                    end: { line: 3, column: 20, offset: 55 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 20, offset: 55 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 20, offset: 55 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'list',
              ordered: true,
              start: 1,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 1',
                          position: {
                            start: { line: 1, column: 4, offset: 3 },
                            end: { line: 1, column: 15, offset: 14 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 4, offset: 3 },
                        end: { line: 1, column: 15, offset: 14 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 15, offset: 14 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 2',
                          position: {
                            start: { line: 2, column: 4, offset: 18 },
                            end: { line: 2, column: 15, offset: 29 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 4, offset: 18 },
                        end: { line: 2, column: 15, offset: 29 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 1, offset: 15 },
                    end: { line: 2, column: 15, offset: 29 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 3',
                          position: {
                            start: { line: 3, column: 4, offset: 33 },
                            end: { line: 3, column: 15, offset: 44 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 4, offset: 33 },
                        end: { line: 3, column: 15, offset: 44 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 3, column: 1, offset: 30 },
                    end: { line: 3, column: 15, offset: 44 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 15, offset: 44 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 15, offset: 44 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'list',
              ordered: true,
              start: 1,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 1',
                          position: {
                            start: { line: 1, column: 4, offset: 3 },
                            end: { line: 1, column: 15, offset: 14 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 4, offset: 3 },
                        end: { line: 1, column: 15, offset: 14 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 15, offset: 14 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 2',
                          position: {
                            start: { line: 2, column: 4, offset: 18 },
                            end: { line: 2, column: 15, offset: 29 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 4, offset: 18 },
                        end: { line: 2, column: 15, offset: 29 },
                      },
                    },
                    {
                      type: 'list',
                      ordered: true,
                      start: 1,
                      spread: false,
                      children: [
                        {
                          type: 'listItem',
                          spread: false,
                          checked: null,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'List Item 3',
                                  position: {
                                    start: { line: 3, column: 7, offset: 36 },
                                    end: { line: 3, column: 18, offset: 47 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 3, column: 7, offset: 36 },
                                end: { line: 3, column: 18, offset: 47 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 3, column: 4, offset: 33 },
                            end: { line: 3, column: 18, offset: 47 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 4, offset: 33 },
                        end: { line: 3, column: 18, offset: 47 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 1, offset: 15 },
                    end: { line: 3, column: 18, offset: 47 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 18, offset: 47 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 18, offset: 47 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'list',
              ordered: true,
              start: 1,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: true,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 1',
                          position: {
                            start: { line: 1, column: 8, offset: 7 },
                            end: { line: 1, column: 19, offset: 18 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 8, offset: 7 },
                        end: { line: 1, column: 19, offset: 18 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 19, offset: 18 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: false,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 2',
                          position: {
                            start: { line: 2, column: 8, offset: 26 },
                            end: { line: 2, column: 19, offset: 37 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 8, offset: 26 },
                        end: { line: 2, column: 19, offset: 37 },
                      },
                    },
                    {
                      type: 'list',
                      ordered: true,
                      start: 1,
                      spread: false,
                      children: [
                        {
                          type: 'listItem',
                          spread: false,
                          checked: false,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'List Item 3',
                                  position: {
                                    start: { line: 3, column: 11, offset: 48 },
                                    end: { line: 3, column: 22, offset: 59 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 3, column: 11, offset: 48 },
                                end: { line: 3, column: 22, offset: 59 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 3, column: 4, offset: 41 },
                            end: { line: 3, column: 22, offset: 59 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 4, offset: 41 },
                        end: { line: 3, column: 22, offset: 59 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 1, offset: 19 },
                    end: { line: 3, column: 22, offset: 59 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 3, column: 22, offset: 59 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 22, offset: 59 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'list',
              ordered: false,
              start: null,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 1',
                          position: {
                            start: { line: 1, column: 3, offset: 2 },
                            end: { line: 1, column: 14, offset: 13 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 14, offset: 13 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 14, offset: 13 },
                  },
                },
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'List Item 2',
                          position: {
                            start: { line: 2, column: 3, offset: 16 },
                            end: { line: 2, column: 14, offset: 27 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 2, column: 3, offset: 16 },
                        end: { line: 2, column: 14, offset: 27 },
                      },
                    },
                    {
                      type: 'list',
                      ordered: true,
                      start: 1,
                      spread: false,
                      children: [
                        {
                          type: 'listItem',
                          spread: false,
                          checked: true,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'List Item 3',
                                  position: {
                                    start: { line: 3, column: 11, offset: 38 },
                                    end: { line: 3, column: 22, offset: 49 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 3, column: 11, offset: 38 },
                                end: { line: 3, column: 22, offset: 49 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 3, column: 4, offset: 31 },
                            end: { line: 3, column: 22, offset: 49 },
                          },
                        },
                        {
                          type: 'listItem',
                          spread: false,
                          checked: false,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'List Item 4',
                                  position: {
                                    start: { line: 4, column: 11, offset: 60 },
                                    end: { line: 4, column: 22, offset: 71 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 4, column: 11, offset: 60 },
                                end: { line: 4, column: 22, offset: 71 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 4, column: 4, offset: 53 },
                            end: { line: 4, column: 22, offset: 71 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 4, offset: 31 },
                        end: { line: 4, column: 22, offset: 71 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 2, column: 1, offset: 14 },
                    end: { line: 4, column: 22, offset: 71 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 4, column: 22, offset: 71 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 4, column: 22, offset: 71 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'text',
                      value: 'Italic',
                      position: {
                        start: { line: 1, column: 2, offset: 1 },
                        end: { line: 1, column: 8, offset: 7 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 9, offset: 8 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 9, offset: 8 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 9, offset: 8 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      value: 'Bold',
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 7, offset: 6 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 9, offset: 8 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 9, offset: 8 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 9, offset: 8 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'delete',
                  children: [
                    {
                      type: 'text',
                      value: 'Strikethrough',
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 16, offset: 15 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 18, offset: 17 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 18, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 18, offset: 17 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'html',
              value: "<p style={{ textAlign: 'center' }}>Align Center</p>",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 52, offset: 51 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 52, offset: 51 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'p',
                  attributes: [
                    {
                      type: 'mdxJsxAttribute',
                      name: 'style',
                      value: {
                        type: 'mdxJsxAttributeValueExpression',
                        value: "{ textAlign: 'left' }",
                      },
                    },
                  ],
                  children: [
                    {
                      type: 'text',
                      value: 'Align Left',
                      position: {
                        start: { line: 1, column: 34, offset: 33 },
                        end: { line: 1, column: 44, offset: 43 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 48, offset: 47 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 48, offset: 47 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 48, offset: 47 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'p',
                  attributes: [
                    {
                      type: 'mdxJsxAttribute',
                      name: 'style',
                      value: {
                        type: 'mdxJsxAttributeValueExpression',
                        value: "{ textAlign: 'center' }",
                      },
                    },
                  ],
                  children: [
                    {
                      type: 'text',
                      value: 'Align Center',
                      position: {
                        start: { line: 1, column: 36, offset: 35 },
                        end: { line: 1, column: 48, offset: 47 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 52, offset: 51 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 52, offset: 51 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 52, offset: 51 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'p',
                  attributes: [
                    {
                      type: 'mdxJsxAttribute',
                      name: 'style',
                      value: {
                        type: 'mdxJsxAttributeValueExpression',
                        value: "{ textAlign: 'right' }",
                      },
                    },
                  ],
                  children: [
                    {
                      type: 'text',
                      value: 'Align Right',
                      position: {
                        start: { line: 1, column: 35, offset: 34 },
                        end: { line: 1, column: 46, offset: 45 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 50, offset: 49 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 50, offset: 49 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 50, offset: 49 },
          },
        },
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
    markdown: {
      'subscript tag': {
        markdown: '<sub>Subscript</sub>',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '<sub>Subscript</sub>',
                  position: {
                    start: { line: 1, column: 6, offset: 5 },
                    end: { line: 1, column: 15, offset: 14 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 21, offset: 20 },
          },
        },
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: '<sub>Subscript</sub>',
              },
            ],
          },
        ],
      },
    },

    mdx: {
      'subscript tag': {
        markdown: '<sub>Subscript</sub>',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'sub',
                  attributes: [],
                  children: [
                    {
                      type: 'text',
                      value: 'Subscript',
                      position: {
                        start: { line: 1, column: 6, offset: 5 },
                        end: { line: 1, column: 15, offset: 14 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 21, offset: 20 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 21, offset: 20 },
          },
        },
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
    markdown: {
      'superscript tag': {
        markdown: '<sup>Superscript</sup>',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '<sup>Superscript</sup>',
                  position: {
                    start: { line: 1, column: 6, offset: 5 },
                    end: { line: 1, column: 17, offset: 16 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 23, offset: 22 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 23, offset: 22 },
          },
        },
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: '<sup>Superscript</sup>',
              },
            ],
          },
        ],
      },
    },

    mdx: {
      'superscript tag': {
        markdown: '<sup>Superscript</sup>',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'sup',
                  attributes: [],
                  children: [
                    {
                      type: 'text',
                      value: 'Superscript',
                      position: {
                        start: { line: 1, column: 6, offset: 5 },
                        end: { line: 1, column: 17, offset: 16 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 23, offset: 22 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 23, offset: 22 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 23, offset: 22 },
          },
        },
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
    markdown: {
      'underline tag': {
        markdown: '<u>Underlined</u>',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '<u>Underlined</u>',
                  position: {
                    start: { line: 1, column: 4, offset: 3 },
                    end: { line: 1, column: 14, offset: 13 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 18, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 18, offset: 17 },
          },
        },
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: '<u>Underlined</u>',
              },
            ],
          },
        ],
      },
    },

    mdx: {
      'underline tag': {
        markdown: '<u>Underlined</u>',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'u',
                  attributes: [],
                  children: [
                    {
                      type: 'text',
                      value: 'Underlined',
                      position: {
                        start: { line: 1, column: 4, offset: 3 },
                        end: { line: 1, column: 14, offset: 13 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 18, offset: 17 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 18, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 18, offset: 17 },
          },
        },
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
    markdown: {
      'font tag': {
        markdown: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value:
                    "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 70, offset: 69 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 77, offset: 76 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 77, offset: 76 },
          },
        },
        slate: [
          {
            type: ELEMENT_PARAGRAPH,
            children: [
              {
                text: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
              },
            ],
          },
        ],
      },
    },

    mdx: {
      'color and background color from style attribute of font tag': {
        markdown: "<font style={{ color: 'red', backgroundColor: 'black' }}>Colored Text</font>",
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'font',
                  attributes: [
                    {
                      type: 'mdxJsxAttribute',
                      name: 'style',
                      value: {
                        type: 'mdxJsxAttributeValueExpression',
                        value: "{ color: 'red', backgroundColor: 'black' }",
                      },
                    },
                  ],
                  children: [
                    {
                      type: 'text',
                      value: 'Colored Text',
                      position: {
                        start: { line: 1, column: 58, offset: 57 },
                        end: { line: 1, column: 70, offset: 69 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 77, offset: 76 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 77, offset: 76 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 77, offset: 76 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '[youtube|p6h-rYSVX90]',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 22, offset: 21 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
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

      'shortcode with no args': {
        markdown: '[youtube]',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '[youtube]',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 10, offset: 9 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 10, offset: 9 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '[youtube|p6h-rYSVX90|somethingElse|andOneMore]',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 47, offset: 46 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 47, offset: 46 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 47, offset: 46 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'Text before [youtube|p6h-rYSVX90]',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 34, offset: 33 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 34, offset: 33 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 34, offset: 33 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '[youtube|p6h-rYSVX90] and text after',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 37, offset: 36 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 37, offset: 36 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 37, offset: 36 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'Text before [youtube|p6h-rYSVX90] and text after',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 49, offset: 48 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 49, offset: 48 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 49, offset: 48 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'Text before [youtube|p6h-rYSVX90] and {{< twitter 917359331535966209 >}}',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 73, offset: 72 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 73, offset: 72 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 73, offset: 72 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value:
                    'Text before [youtube|p6h-rYSVX90], [youtube|p6h-rYSVX90], {{< twitter 917359331535966209 >}} and [youtube|p6h-rYSVX90]',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 119, offset: 118 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 119, offset: 118 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 119, offset: 118 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '[someOtherShortcode|andstuff]',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 30, offset: 29 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 30, offset: 29 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 30, offset: 29 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value:
                    'Text before [youtube|p6h-rYSVX90], [someOtherShortcode|andstuff] and {{< twitter 917359331535966209 >}}',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 104, offset: 103 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 104, offset: 103 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 104, offset: 103 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'Some text about something going on somewhere',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 45, offset: 44 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 45, offset: 44 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 45, offset: 44 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '[youtube|p6h-rYSVX90]',
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 22, offset: 21 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'table',
              align: [null, null],
              children: [
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Name',
                          position: {
                            start: { line: 1, column: 2, offset: 1 },
                            end: { line: 1, column: 6, offset: 5 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 1, offset: 0 },
                        end: { line: 1, column: 7, offset: 6 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Age',
                          position: {
                            start: { line: 1, column: 7, offset: 6 },
                            end: { line: 1, column: 10, offset: 9 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 7, offset: 6 },
                        end: { line: 1, column: 11, offset: 10 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 11, offset: 10 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Bob',
                          position: {
                            start: { line: 3, column: 2, offset: 22 },
                            end: { line: 3, column: 5, offset: 25 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 1, offset: 21 },
                        end: { line: 3, column: 6, offset: 26 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: '25',
                          position: {
                            start: { line: 3, column: 6, offset: 26 },
                            end: { line: 3, column: 8, offset: 28 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 3, column: 6, offset: 26 },
                        end: { line: 3, column: 9, offset: 29 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 3, column: 1, offset: 21 },
                    end: { line: 3, column: 9, offset: 29 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Billy',
                          position: {
                            start: { line: 4, column: 2, offset: 31 },
                            end: { line: 4, column: 7, offset: 36 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 4, column: 1, offset: 30 },
                        end: { line: 4, column: 8, offset: 37 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: '30',
                          position: {
                            start: { line: 4, column: 8, offset: 37 },
                            end: { line: 4, column: 10, offset: 39 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 4, column: 8, offset: 37 },
                        end: { line: 4, column: 11, offset: 40 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 4, column: 1, offset: 30 },
                    end: { line: 4, column: 11, offset: 40 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Sam',
                          position: {
                            start: { line: 5, column: 2, offset: 42 },
                            end: { line: 5, column: 5, offset: 45 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 5, column: 1, offset: 41 },
                        end: { line: 5, column: 6, offset: 46 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: '29',
                          position: {
                            start: { line: 5, column: 6, offset: 46 },
                            end: { line: 5, column: 8, offset: 48 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 5, column: 6, offset: 46 },
                        end: { line: 5, column: 9, offset: 49 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 5, column: 1, offset: 41 },
                    end: { line: 5, column: 9, offset: 49 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 5, column: 9, offset: 49 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 5, column: 9, offset: 49 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'heading',
              depth: 1,
              children: [
                {
                  type: 'text',
                  value: 'The post is number 1',
                  position: {
                    start: { line: 1, column: 3, offset: 2 },
                    end: { line: 1, column: 23, offset: 22 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 23, offset: 22 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'image',
                  title: null,
                  url: 'https://raw.githubusercontent.com/StaticJsCMS/static-cms/main/static-cms-logo.png',
                  alt: 'Static CMS',
                  position: {
                    start: { line: 3, column: 1, offset: 24 },
                    end: { line: 3, column: 97, offset: 120 },
                  },
                },
              ],
              position: {
                start: { line: 3, column: 1, offset: 24 },
                end: { line: 3, column: 97, offset: 120 },
              },
            },
            {
              type: 'heading',
              depth: 1,
              children: [
                {
                  type: 'text',
                  value: 'Awesome Editor!',
                  position: {
                    start: { line: 5, column: 3, offset: 124 },
                    end: { line: 5, column: 18, offset: 139 },
                  },
                },
              ],
              position: {
                start: { line: 5, column: 1, offset: 122 },
                end: { line: 5, column: 18, offset: 139 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'It was ',
                  position: {
                    start: { line: 7, column: 1, offset: 141 },
                    end: { line: 7, column: 8, offset: 148 },
                  },
                },
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'text',
                      value: 'released as open source in 2022',
                      position: {
                        start: { line: 7, column: 9, offset: 149 },
                        end: { line: 7, column: 40, offset: 180 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 7, column: 8, offset: 148 },
                    end: { line: 7, column: 41, offset: 181 },
                  },
                },
                {
                  type: 'text',
                  value: ' and is ',
                  position: {
                    start: { line: 7, column: 41, offset: 181 },
                    end: { line: 7, column: 49, offset: 189 },
                  },
                },
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'strong',
                      children: [
                        {
                          type: 'text',
                          value: 'continually',
                          position: {
                            start: { line: 7, column: 52, offset: 192 },
                            end: { line: 7, column: 63, offset: 203 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 7, column: 50, offset: 190 },
                        end: { line: 7, column: 65, offset: 205 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 7, column: 49, offset: 189 },
                    end: { line: 7, column: 66, offset: 206 },
                  },
                },
                {
                  type: 'text',
                  value: ' evolving to be the ',
                  position: {
                    start: { line: 7, column: 66, offset: 206 },
                    end: { line: 7, column: 86, offset: 226 },
                  },
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      value: 'best editor experience',
                      position: {
                        start: { line: 7, column: 88, offset: 228 },
                        end: { line: 7, column: 110, offset: 250 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 7, column: 86, offset: 226 },
                    end: { line: 7, column: 112, offset: 252 },
                  },
                },
                {
                  type: 'text',
                  value: ' available for static site generators.',
                  position: {
                    start: { line: 7, column: 112, offset: 252 },
                    end: { line: 7, column: 150, offset: 290 },
                  },
                },
              ],
              position: {
                start: { line: 7, column: 1, offset: 141 },
                end: { line: 7, column: 150, offset: 290 },
              },
            },
            {
              type: 'heading',
              depth: 2,
              children: [
                {
                  type: 'text',
                  value: 'MDX',
                  position: {
                    start: { line: 9, column: 4, offset: 295 },
                    end: { line: 9, column: 7, offset: 298 },
                  },
                },
              ],
              position: {
                start: { line: 9, column: 1, offset: 292 },
                end: { line: 9, column: 7, offset: 298 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'The output out this widget is ',
                  position: {
                    start: { line: 11, column: 1, offset: 300 },
                    end: { line: 11, column: 31, offset: 330 },
                  },
                },
                {
                  type: 'inlineCode',
                  value: 'mdx',
                  position: {
                    start: { line: 11, column: 31, offset: 330 },
                    end: { line: 11, column: 36, offset: 335 },
                  },
                },
                {
                  type: 'text',
                  value: ', a mixture of ',
                  position: {
                    start: { line: 11, column: 36, offset: 335 },
                    end: { line: 11, column: 51, offset: 350 },
                  },
                },
                {
                  type: 'inlineCode',
                  value: 'markdown',
                  position: {
                    start: { line: 11, column: 51, offset: 350 },
                    end: { line: 11, column: 61, offset: 360 },
                  },
                },
                {
                  type: 'text',
                  value: ' and ',
                  position: {
                    start: { line: 11, column: 61, offset: 360 },
                    end: { line: 11, column: 66, offset: 365 },
                  },
                },
                {
                  type: 'inlineCode',
                  value: 'javascript components',
                  position: {
                    start: { line: 11, column: 66, offset: 365 },
                    end: { line: 11, column: 89, offset: 388 },
                  },
                },
                {
                  type: 'text',
                  value: '. See ',
                  position: {
                    start: { line: 11, column: 89, offset: 388 },
                    end: { line: 11, column: 95, offset: 394 },
                  },
                },
                {
                  type: 'link',
                  title: null,
                  url: 'https://mdxjs.com/docs/',
                  children: [
                    {
                      type: 'text',
                      value: 'MDX documentation',
                      position: {
                        start: { line: 11, column: 96, offset: 395 },
                        end: { line: 11, column: 113, offset: 412 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 11, column: 95, offset: 394 },
                    end: { line: 11, column: 139, offset: 438 },
                  },
                },
                {
                  type: 'text',
                  value: '.',
                  position: {
                    start: { line: 11, column: 139, offset: 438 },
                    end: { line: 11, column: 140, offset: 439 },
                  },
                },
              ],
              position: {
                start: { line: 11, column: 1, offset: 300 },
                end: { line: 11, column: 140, offset: 439 },
              },
            },
            {
              type: 'code',
              lang: 'yaml',
              meta: null,
              value: 'name: body\nlabel: Blog post content\nwidget: markdown',
              position: {
                start: { line: 13, column: 1, offset: 441 },
                end: { line: 17, column: 4, offset: 505 },
              },
            },
            {
              type: 'code',
              lang: 'js',
              meta: null,
              value: "name: 'body',\nlabel: 'Blog post content',\nwidget: 'markdown',",
              position: {
                start: { line: 19, column: 1, offset: 507 },
                end: { line: 23, column: 4, offset: 578 },
              },
            },
            {
              type: 'blockquote',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      value:
                        'See the table below for default options\nMore API information can be found in the document',
                      position: {
                        start: { line: 25, column: 3, offset: 582 },
                        end: { line: 26, column: 52, offset: 673 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 25, column: 3, offset: 582 },
                    end: { line: 26, column: 52, offset: 673 },
                  },
                },
              ],
              position: {
                start: { line: 25, column: 1, offset: 580 },
                end: { line: 26, column: 52, offset: 673 },
              },
            },
            {
              type: 'table',
              align: [null, null, null, null],
              children: [
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Name',
                          position: {
                            start: { line: 28, column: 2, offset: 676 },
                            end: { line: 28, column: 6, offset: 680 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 28, column: 1, offset: 675 },
                        end: { line: 28, column: 7, offset: 681 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Type',
                          position: {
                            start: { line: 28, column: 7, offset: 681 },
                            end: { line: 28, column: 11, offset: 685 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 28, column: 7, offset: 681 },
                        end: { line: 28, column: 12, offset: 686 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Default',
                          position: {
                            start: { line: 28, column: 12, offset: 686 },
                            end: { line: 28, column: 19, offset: 693 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 28, column: 12, offset: 686 },
                        end: { line: 28, column: 20, offset: 694 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Description',
                          position: {
                            start: { line: 28, column: 20, offset: 694 },
                            end: { line: 28, column: 31, offset: 705 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 28, column: 20, offset: 694 },
                        end: { line: 28, column: 32, offset: 706 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 28, column: 1, offset: 675 },
                    end: { line: 28, column: 32, offset: 706 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'default',
                          position: {
                            start: { line: 30, column: 2, offset: 726 },
                            end: { line: 30, column: 9, offset: 733 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 30, column: 1, offset: 725 },
                        end: { line: 30, column: 10, offset: 734 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'string',
                          position: {
                            start: { line: 30, column: 10, offset: 734 },
                            end: { line: 30, column: 16, offset: 740 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 30, column: 10, offset: 734 },
                        end: { line: 30, column: 17, offset: 741 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'inlineCode',
                          value: "''",
                          position: {
                            start: { line: 30, column: 17, offset: 741 },
                            end: { line: 30, column: 21, offset: 745 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 30, column: 17, offset: 741 },
                        end: { line: 30, column: 22, offset: 746 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'emphasis',
                          children: [
                            {
                              type: 'text',
                              value: 'Optional',
                              position: {
                                start: { line: 30, column: 23, offset: 747 },
                                end: { line: 30, column: 31, offset: 755 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 30, column: 22, offset: 746 },
                            end: { line: 30, column: 32, offset: 756 },
                          },
                        },
                        {
                          type: 'text',
                          value: '. The default value for the field. Accepts markdown content',
                          position: {
                            start: { line: 30, column: 32, offset: 756 },
                            end: { line: 30, column: 91, offset: 815 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 30, column: 22, offset: 746 },
                        end: { line: 30, column: 92, offset: 816 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 30, column: 1, offset: 725 },
                    end: { line: 30, column: 92, offset: 816 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'media_library',
                          position: {
                            start: { line: 31, column: 2, offset: 818 },
                            end: { line: 31, column: 15, offset: 831 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 31, column: 1, offset: 817 },
                        end: { line: 31, column: 16, offset: 832 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Media Library Options',
                          position: {
                            start: { line: 31, column: 16, offset: 832 },
                            end: { line: 31, column: 37, offset: 853 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 31, column: 16, offset: 832 },
                        end: { line: 31, column: 38, offset: 854 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'inlineCode',
                          value: '{}',
                          position: {
                            start: { line: 31, column: 38, offset: 854 },
                            end: { line: 31, column: 42, offset: 858 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 31, column: 38, offset: 854 },
                        end: { line: 31, column: 43, offset: 859 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'emphasis',
                          children: [
                            {
                              type: 'text',
                              value: 'Optional',
                              position: {
                                start: { line: 31, column: 44, offset: 860 },
                                end: { line: 31, column: 52, offset: 868 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 31, column: 43, offset: 859 },
                            end: { line: 31, column: 53, offset: 869 },
                          },
                        },
                        {
                          type: 'text',
                          value:
                            '. Media library settings to apply when a media library is opened by the current widget. See ',
                          position: {
                            start: { line: 31, column: 53, offset: 869 },
                            end: { line: 31, column: 145, offset: 961 },
                          },
                        },
                        {
                          type: 'link',
                          title: null,
                          url: '#media-library-options',
                          children: [
                            {
                              type: 'text',
                              value: 'Media Library Options',
                              position: {
                                start: { line: 31, column: 146, offset: 962 },
                                end: { line: 31, column: 167, offset: 983 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 31, column: 145, offset: 961 },
                            end: { line: 31, column: 192, offset: 1008 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 31, column: 43, offset: 859 },
                        end: { line: 31, column: 193, offset: 1009 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 31, column: 1, offset: 817 },
                    end: { line: 31, column: 193, offset: 1009 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'media_folder',
                          position: {
                            start: { line: 32, column: 2, offset: 1011 },
                            end: { line: 32, column: 14, offset: 1023 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 32, column: 1, offset: 1010 },
                        end: { line: 32, column: 15, offset: 1024 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'string',
                          position: {
                            start: { line: 32, column: 15, offset: 1024 },
                            end: { line: 32, column: 21, offset: 1030 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 32, column: 15, offset: 1024 },
                        end: { line: 32, column: 22, offset: 1031 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [],
                      position: {
                        start: { line: 32, column: 22, offset: 1031 },
                        end: { line: 32, column: 24, offset: 1033 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'emphasis',
                          children: [
                            {
                              type: 'text',
                              value: 'Optional',
                              position: {
                                start: { line: 32, column: 25, offset: 1034 },
                                end: { line: 32, column: 33, offset: 1042 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 32, column: 24, offset: 1033 },
                            end: { line: 32, column: 34, offset: 1043 },
                          },
                        },
                        {
                          type: 'text',
                          value:
                            '. Specifies the folder path where uploaded files should be saved, relative to the base of the repo',
                          position: {
                            start: { line: 32, column: 34, offset: 1043 },
                            end: { line: 32, column: 132, offset: 1141 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 32, column: 24, offset: 1033 },
                        end: { line: 32, column: 133, offset: 1142 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 32, column: 1, offset: 1010 },
                    end: { line: 32, column: 133, offset: 1142 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'public_folder',
                          position: {
                            start: { line: 33, column: 2, offset: 1144 },
                            end: { line: 33, column: 15, offset: 1157 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 33, column: 1, offset: 1143 },
                        end: { line: 33, column: 16, offset: 1158 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'string',
                          position: {
                            start: { line: 33, column: 16, offset: 1158 },
                            end: { line: 33, column: 22, offset: 1164 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 33, column: 16, offset: 1158 },
                        end: { line: 33, column: 23, offset: 1165 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [],
                      position: {
                        start: { line: 33, column: 23, offset: 1165 },
                        end: { line: 33, column: 25, offset: 1167 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'emphasis',
                          children: [
                            {
                              type: 'text',
                              value: 'Optional',
                              position: {
                                start: { line: 33, column: 26, offset: 1168 },
                                end: { line: 33, column: 34, offset: 1176 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 33, column: 25, offset: 1167 },
                            end: { line: 33, column: 35, offset: 1177 },
                          },
                        },
                        {
                          type: 'text',
                          value:
                            '. Specifies the folder path where the files uploaded by the media library will be accessed, relative to the base of the built site',
                          position: {
                            start: { line: 33, column: 35, offset: 1177 },
                            end: { line: 33, column: 165, offset: 1307 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 33, column: 25, offset: 1167 },
                        end: { line: 33, column: 166, offset: 1308 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 33, column: 1, offset: 1143 },
                    end: { line: 33, column: 166, offset: 1308 },
                  },
                },
              ],
              position: {
                start: { line: 28, column: 1, offset: 675 },
                end: { line: 33, column: 166, offset: 1308 },
              },
            },
            {
              type: 'heading',
              depth: 3,
              children: [
                {
                  type: 'text',
                  value: 'Media Library Options',
                  position: {
                    start: { line: 35, column: 5, offset: 1314 },
                    end: { line: 35, column: 26, offset: 1335 },
                  },
                },
              ],
              position: {
                start: { line: 35, column: 1, offset: 1310 },
                end: { line: 35, column: 26, offset: 1335 },
              },
            },
            {
              type: 'table',
              align: [null, null, null, null],
              children: [
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Name',
                          position: {
                            start: { line: 37, column: 2, offset: 1338 },
                            end: { line: 37, column: 6, offset: 1342 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 37, column: 1, offset: 1337 },
                        end: { line: 37, column: 7, offset: 1343 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Type',
                          position: {
                            start: { line: 37, column: 7, offset: 1343 },
                            end: { line: 37, column: 11, offset: 1347 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 37, column: 7, offset: 1343 },
                        end: { line: 37, column: 12, offset: 1348 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Default',
                          position: {
                            start: { line: 37, column: 12, offset: 1348 },
                            end: { line: 37, column: 19, offset: 1355 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 37, column: 12, offset: 1348 },
                        end: { line: 37, column: 20, offset: 1356 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'Description',
                          position: {
                            start: { line: 37, column: 20, offset: 1356 },
                            end: { line: 37, column: 31, offset: 1367 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 37, column: 20, offset: 1356 },
                        end: { line: 37, column: 32, offset: 1368 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 37, column: 1, offset: 1337 },
                    end: { line: 37, column: 32, offset: 1368 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'allow_multiple',
                          position: {
                            start: { line: 39, column: 2, offset: 1388 },
                            end: { line: 39, column: 16, offset: 1402 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 39, column: 1, offset: 1387 },
                        end: { line: 39, column: 17, offset: 1403 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'boolean',
                          position: {
                            start: { line: 39, column: 17, offset: 1403 },
                            end: { line: 39, column: 24, offset: 1410 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 39, column: 17, offset: 1403 },
                        end: { line: 39, column: 25, offset: 1411 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'inlineCode',
                          value: 'true',
                          position: {
                            start: { line: 39, column: 25, offset: 1411 },
                            end: { line: 39, column: 31, offset: 1417 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 39, column: 25, offset: 1411 },
                        end: { line: 39, column: 32, offset: 1418 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'emphasis',
                          children: [
                            {
                              type: 'text',
                              value: 'Optional',
                              position: {
                                start: { line: 39, column: 33, offset: 1419 },
                                end: { line: 39, column: 41, offset: 1427 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 39, column: 32, offset: 1418 },
                            end: { line: 39, column: 42, offset: 1428 },
                          },
                        },
                        {
                          type: 'text',
                          value: '. When set to ',
                          position: {
                            start: { line: 39, column: 42, offset: 1428 },
                            end: { line: 39, column: 56, offset: 1442 },
                          },
                        },
                        {
                          type: 'inlineCode',
                          value: 'false',
                          position: {
                            start: { line: 39, column: 56, offset: 1442 },
                            end: { line: 39, column: 63, offset: 1449 },
                          },
                        },
                        {
                          type: 'text',
                          value:
                            ', prevents multiple selection for any media library extension, but must be supported by the extension in use',
                          position: {
                            start: { line: 39, column: 63, offset: 1449 },
                            end: { line: 39, column: 171, offset: 1557 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 39, column: 32, offset: 1418 },
                        end: { line: 39, column: 172, offset: 1558 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 39, column: 1, offset: 1387 },
                    end: { line: 39, column: 172, offset: 1558 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'config',
                          position: {
                            start: { line: 40, column: 2, offset: 1560 },
                            end: { line: 40, column: 8, offset: 1566 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 40, column: 1, offset: 1559 },
                        end: { line: 40, column: 9, offset: 1567 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'string',
                          position: {
                            start: { line: 40, column: 9, offset: 1567 },
                            end: { line: 40, column: 15, offset: 1573 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 40, column: 9, offset: 1567 },
                        end: { line: 40, column: 16, offset: 1574 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'inlineCode',
                          value: '{}',
                          position: {
                            start: { line: 40, column: 16, offset: 1574 },
                            end: { line: 40, column: 20, offset: 1578 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 40, column: 16, offset: 1574 },
                        end: { line: 40, column: 21, offset: 1579 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'emphasis',
                          children: [
                            {
                              type: 'text',
                              value: 'Optional',
                              position: {
                                start: { line: 40, column: 22, offset: 1580 },
                                end: { line: 40, column: 30, offset: 1588 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 40, column: 21, offset: 1579 },
                            end: { line: 40, column: 31, offset: 1589 },
                          },
                        },
                        {
                          type: 'text',
                          value:
                            '. A configuration object that will be passed directly to the media library being used - available options are determined by the library',
                          position: {
                            start: { line: 40, column: 31, offset: 1589 },
                            end: { line: 40, column: 166, offset: 1724 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 40, column: 21, offset: 1579 },
                        end: { line: 40, column: 167, offset: 1725 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 40, column: 1, offset: 1559 },
                    end: { line: 40, column: 167, offset: 1725 },
                  },
                },
                {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'choose_url',
                          position: {
                            start: { line: 41, column: 2, offset: 1727 },
                            end: { line: 41, column: 12, offset: 1737 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 41, column: 1, offset: 1726 },
                        end: { line: 41, column: 13, offset: 1738 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'text',
                          value: 'string',
                          position: {
                            start: { line: 41, column: 13, offset: 1738 },
                            end: { line: 41, column: 19, offset: 1744 },
                          },
                        },
                        {
                          type: 'html',
                          value: '<br />',
                          position: {
                            start: { line: 41, column: 19, offset: 1744 },
                            end: { line: 41, column: 25, offset: 1750 },
                          },
                        },
                        {
                          type: 'text',
                          value: '| boolean',
                          position: {
                            start: { line: 41, column: 25, offset: 1750 },
                            end: { line: 41, column: 35, offset: 1760 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 41, column: 13, offset: 1738 },
                        end: { line: 41, column: 36, offset: 1761 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'inlineCode',
                          value: 'true',
                          position: {
                            start: { line: 41, column: 36, offset: 1761 },
                            end: { line: 41, column: 42, offset: 1767 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 41, column: 36, offset: 1761 },
                        end: { line: 41, column: 43, offset: 1768 },
                      },
                    },
                    {
                      type: 'tableCell',
                      children: [
                        {
                          type: 'emphasis',
                          children: [
                            {
                              type: 'text',
                              value: 'Optional',
                              position: {
                                start: { line: 41, column: 44, offset: 1769 },
                                end: { line: 41, column: 52, offset: 1777 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 41, column: 43, offset: 1768 },
                            end: { line: 41, column: 53, offset: 1778 },
                          },
                        },
                        {
                          type: 'text',
                          value: '. When set to ',
                          position: {
                            start: { line: 41, column: 53, offset: 1778 },
                            end: { line: 41, column: 67, offset: 1792 },
                          },
                        },
                        {
                          type: 'inlineCode',
                          value: 'false',
                          position: {
                            start: { line: 41, column: 67, offset: 1792 },
                            end: { line: 41, column: 74, offset: 1799 },
                          },
                        },
                        {
                          type: 'text',
                          value: ', the "Insert from URL" button will be hidden',
                          position: {
                            start: { line: 41, column: 74, offset: 1799 },
                            end: { line: 41, column: 119, offset: 1844 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 41, column: 43, offset: 1768 },
                        end: { line: 41, column: 120, offset: 1845 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 41, column: 1, offset: 1726 },
                    end: { line: 41, column: 120, offset: 1845 },
                  },
                },
              ],
              position: {
                start: { line: 37, column: 1, offset: 1337 },
                end: { line: 41, column: 120, offset: 1845 },
              },
            },
            {
              type: 'heading',
              depth: 2,
              children: [
                {
                  type: 'text',
                  value: 'Features',
                  position: {
                    start: { line: 43, column: 4, offset: 1850 },
                    end: { line: 43, column: 12, offset: 1858 },
                  },
                },
              ],
              position: {
                start: { line: 43, column: 1, offset: 1847 },
                end: { line: 43, column: 12, offset: 1858 },
              },
            },
            {
              type: 'list',
              ordered: false,
              start: null,
              spread: false,
              children: [
                {
                  type: 'listItem',
                  spread: false,
                  checked: null,
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          value: 'CommonMark + GFM Specifications',
                          position: {
                            start: { line: 45, column: 3, offset: 1862 },
                            end: { line: 45, column: 34, offset: 1893 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 45, column: 3, offset: 1862 },
                        end: { line: 45, column: 34, offset: 1893 },
                      },
                    },
                    {
                      type: 'list',
                      ordered: false,
                      start: null,
                      spread: false,
                      children: [
                        {
                          type: 'listItem',
                          spread: false,
                          checked: null,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'Live ',
                                  position: {
                                    start: { line: 46, column: 5, offset: 1898 },
                                    end: { line: 46, column: 10, offset: 1903 },
                                  },
                                },
                                {
                                  type: 'inlineCode',
                                  value: 'Preview',
                                  position: {
                                    start: { line: 46, column: 10, offset: 1903 },
                                    end: { line: 46, column: 19, offset: 1912 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 46, column: 5, offset: 1898 },
                                end: { line: 46, column: 19, offset: 1912 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 46, column: 3, offset: 1896 },
                            end: { line: 46, column: 19, offset: 1912 },
                          },
                        },
                        {
                          type: 'listItem',
                          spread: false,
                          checked: null,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'Auto Indent',
                                  position: {
                                    start: { line: 47, column: 5, offset: 1917 },
                                    end: { line: 47, column: 16, offset: 1928 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 47, column: 5, offset: 1917 },
                                end: { line: 47, column: 16, offset: 1928 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 47, column: 3, offset: 1915 },
                            end: { line: 47, column: 16, offset: 1928 },
                          },
                        },
                        {
                          type: 'listItem',
                          spread: false,
                          checked: null,
                          children: [
                            {
                              type: 'paragraph',
                              children: [
                                {
                                  type: 'text',
                                  value: 'Syntax Highlight',
                                  position: {
                                    start: { line: 48, column: 5, offset: 1933 },
                                    end: { line: 48, column: 21, offset: 1949 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 48, column: 5, offset: 1933 },
                                end: { line: 48, column: 21, offset: 1949 },
                              },
                            },
                            {
                              type: 'list',
                              ordered: true,
                              start: 1,
                              spread: false,
                              children: [
                                {
                                  type: 'listItem',
                                  spread: false,
                                  checked: null,
                                  children: [
                                    {
                                      type: 'paragraph',
                                      children: [
                                        {
                                          type: 'text',
                                          value: 'Rich Editor',
                                          position: {
                                            start: { line: 49, column: 10, offset: 1959 },
                                            end: { line: 49, column: 21, offset: 1970 },
                                          },
                                        },
                                      ],
                                      position: {
                                        start: { line: 49, column: 10, offset: 1959 },
                                        end: { line: 49, column: 21, offset: 1970 },
                                      },
                                    },
                                  ],
                                  position: {
                                    start: { line: 49, column: 7, offset: 1956 },
                                    end: { line: 49, column: 21, offset: 1970 },
                                  },
                                },
                                {
                                  type: 'listItem',
                                  spread: false,
                                  checked: null,
                                  children: [
                                    {
                                      type: 'paragraph',
                                      children: [
                                        {
                                          type: 'text',
                                          value: 'Preview',
                                          position: {
                                            start: { line: 50, column: 10, offset: 1980 },
                                            end: { line: 50, column: 17, offset: 1987 },
                                          },
                                        },
                                      ],
                                      position: {
                                        start: { line: 50, column: 10, offset: 1980 },
                                        end: { line: 50, column: 17, offset: 1987 },
                                      },
                                    },
                                  ],
                                  position: {
                                    start: { line: 50, column: 7, offset: 1977 },
                                    end: { line: 50, column: 17, offset: 1987 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 49, column: 7, offset: 1956 },
                                end: { line: 50, column: 17, offset: 1987 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 48, column: 3, offset: 1931 },
                            end: { line: 50, column: 17, offset: 1987 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 46, column: 3, offset: 1896 },
                        end: { line: 50, column: 17, offset: 1987 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 45, column: 1, offset: 1860 },
                    end: { line: 50, column: 17, offset: 1987 },
                  },
                },
              ],
              position: {
                start: { line: 45, column: 1, offset: 1860 },
                end: { line: 50, column: 17, offset: 1987 },
              },
            },
            {
              type: 'heading',
              depth: 2,
              children: [
                {
                  type: 'text',
                  value: 'Formatting',
                  position: {
                    start: { line: 52, column: 4, offset: 1992 },
                    end: { line: 52, column: 14, offset: 2002 },
                  },
                },
              ],
              position: {
                start: { line: 52, column: 1, offset: 1989 },
                end: { line: 52, column: 14, offset: 2002 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      value: 'Bold',
                      position: {
                        start: { line: 54, column: 3, offset: 2006 },
                        end: { line: 54, column: 7, offset: 2010 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 54, column: 1, offset: 2004 },
                    end: { line: 54, column: 9, offset: 2012 },
                  },
                },
                {
                  type: 'text',
                  value: ', ',
                  position: {
                    start: { line: 54, column: 9, offset: 2012 },
                    end: { line: 54, column: 11, offset: 2014 },
                  },
                },
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'text',
                      value: 'Italic',
                      position: {
                        start: { line: 54, column: 12, offset: 2015 },
                        end: { line: 54, column: 18, offset: 2021 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 54, column: 11, offset: 2014 },
                    end: { line: 54, column: 19, offset: 2022 },
                  },
                },
                {
                  type: 'text',
                  value: ', ',
                  position: {
                    start: { line: 54, column: 19, offset: 2022 },
                    end: { line: 54, column: 21, offset: 2024 },
                  },
                },
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'strong',
                      children: [
                        {
                          type: 'text',
                          value: 'both',
                          position: {
                            start: { line: 54, column: 24, offset: 2027 },
                            end: { line: 54, column: 28, offset: 2031 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 54, column: 22, offset: 2025 },
                        end: { line: 54, column: 30, offset: 2033 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 54, column: 21, offset: 2024 },
                    end: { line: 54, column: 31, offset: 2034 },
                  },
                },
              ],
              position: {
                start: { line: 54, column: 1, offset: 2004 },
                end: { line: 54, column: 31, offset: 2034 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'delete',
                  children: [
                    {
                      type: 'text',
                      value: 'Strikethrough',
                      position: {
                        start: { line: 56, column: 3, offset: 2038 },
                        end: { line: 56, column: 16, offset: 2051 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 56, column: 1, offset: 2036 },
                    end: { line: 56, column: 18, offset: 2053 },
                  },
                },
              ],
              position: {
                start: { line: 56, column: 1, offset: 2036 },
                end: { line: 56, column: 18, offset: 2053 },
              },
            },
            {
              type: 'heading',
              depth: 2,
              children: [
                {
                  type: 'text',
                  value: 'Shortcodes',
                  position: {
                    start: { line: 58, column: 4, offset: 2058 },
                    end: { line: 58, column: 14, offset: 2068 },
                  },
                },
              ],
              position: {
                start: { line: 58, column: 1, offset: 2055 },
                end: { line: 58, column: 14, offset: 2068 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'Text ahead [youtube|p6h-rYSVX90] and behind',
                  position: {
                    start: { line: 60, column: 1, offset: 2070 },
                    end: { line: 60, column: 44, offset: 2113 },
                  },
                },
              ],
              position: {
                start: { line: 60, column: 1, offset: 2070 },
                end: { line: 60, column: 44, offset: 2113 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '{{< twitter 917359331535966209 >}} Only behind text',
                  position: {
                    start: { line: 62, column: 1, offset: 2115 },
                    end: { line: 62, column: 52, offset: 2166 },
                  },
                },
              ],
              position: {
                start: { line: 62, column: 1, offset: 2115 },
                end: { line: 62, column: 52, offset: 2166 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'Only text before {{< twitter 917359331535966209 >}}',
                  position: {
                    start: { line: 64, column: 1, offset: 2168 },
                    end: { line: 64, column: 52, offset: 2219 },
                  },
                },
              ],
              position: {
                start: { line: 64, column: 1, offset: 2168 },
                end: { line: 64, column: 52, offset: 2219 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: '[youtube|p6h-rYSVX90]',
                  position: {
                    start: { line: 66, column: 1, offset: 2221 },
                    end: { line: 66, column: 22, offset: 2242 },
                  },
                },
              ],
              position: {
                start: { line: 66, column: 1, offset: 2221 },
                end: { line: 66, column: 22, offset: 2242 },
              },
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value:
                    'Text ahead [youtube|p6h-rYSVX90] and behind and another {{< twitter 917359331535966209 >}} shortcode',
                  position: {
                    start: { line: 68, column: 1, offset: 2244 },
                    end: { line: 68, column: 101, offset: 2344 },
                  },
                },
              ],
              position: {
                start: { line: 68, column: 1, offset: 2244 },
                end: { line: 68, column: 101, offset: 2344 },
              },
            },
            {
              type: 'heading',
              depth: 2,
              children: [
                {
                  type: 'text',
                  value: 'Support',
                  position: {
                    start: { line: 70, column: 4, offset: 2349 },
                    end: { line: 70, column: 11, offset: 2356 },
                  },
                },
              ],
              position: {
                start: { line: 70, column: 1, offset: 2346 },
                end: { line: 70, column: 11, offset: 2356 },
              },
            },
            {
              type: 'blockquote',
              children: [
                {
                  type: 'list',
                  ordered: false,
                  start: null,
                  spread: false,
                  children: [
                    {
                      type: 'listItem',
                      spread: false,
                      checked: null,
                      children: [
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              value: 'Supports remark plugins',
                              position: {
                                start: { line: 72, column: 5, offset: 2362 },
                                end: { line: 72, column: 28, offset: 2385 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 72, column: 5, offset: 2362 },
                            end: { line: 72, column: 28, offset: 2385 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 72, column: 3, offset: 2360 },
                        end: { line: 72, column: 28, offset: 2385 },
                      },
                    },
                    {
                      type: 'listItem',
                      spread: false,
                      checked: null,
                      children: [
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              value: 'Supports wrappers',
                              position: {
                                start: { line: 73, column: 5, offset: 2390 },
                                end: { line: 73, column: 22, offset: 2407 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 73, column: 5, offset: 2390 },
                            end: { line: 73, column: 22, offset: 2407 },
                          },
                        },
                        {
                          type: 'list',
                          ordered: true,
                          start: 1,
                          spread: false,
                          children: [
                            {
                              type: 'listItem',
                              spread: false,
                              checked: true,
                              children: [
                                {
                                  type: 'paragraph',
                                  children: [
                                    {
                                      type: 'text',
                                      value: 'React',
                                      position: {
                                        start: { line: 74, column: 13, offset: 2420 },
                                        end: { line: 74, column: 18, offset: 2425 },
                                      },
                                    },
                                  ],
                                  position: {
                                    start: { line: 74, column: 13, offset: 2420 },
                                    end: { line: 74, column: 18, offset: 2425 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 74, column: 6, offset: 2413 },
                                end: { line: 74, column: 18, offset: 2425 },
                              },
                            },
                            {
                              type: 'listItem',
                              spread: false,
                              checked: false,
                              children: [
                                {
                                  type: 'paragraph',
                                  children: [
                                    {
                                      type: 'text',
                                      value: 'More coming soon',
                                      position: {
                                        start: { line: 75, column: 13, offset: 2438 },
                                        end: { line: 75, column: 29, offset: 2454 },
                                      },
                                    },
                                  ],
                                  position: {
                                    start: { line: 75, column: 13, offset: 2438 },
                                    end: { line: 75, column: 29, offset: 2454 },
                                  },
                                },
                              ],
                              position: {
                                start: { line: 75, column: 6, offset: 2431 },
                                end: { line: 75, column: 29, offset: 2454 },
                              },
                            },
                          ],
                          position: {
                            start: { line: 74, column: 6, offset: 2413 },
                            end: { line: 75, column: 29, offset: 2454 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 73, column: 3, offset: 2388 },
                        end: { line: 75, column: 29, offset: 2454 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 72, column: 3, offset: 2360 },
                    end: { line: 75, column: 29, offset: 2454 },
                  },
                },
              ],
              position: {
                start: { line: 72, column: 1, offset: 2358 },
                end: { line: 75, column: 29, offset: 2454 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 75, column: 29, offset: 2454 },
          },
        },
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
  italic: {
    both: {
      'italic (using *)': {
        markdown: '*Italic*',
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'text',
                      value: 'Italic',
                      position: {
                        start: { line: 1, column: 2, offset: 1 },
                        end: { line: 1, column: 8, offset: 7 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 9, offset: 8 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 9, offset: 8 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 9, offset: 8 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      value: 'Bold',
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 7, offset: 6 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 9, offset: 8 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 9, offset: 8 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 9, offset: 8 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'strong',
                      children: [
                        {
                          type: 'text',
                          value: 'Bold and Italic',
                          position: {
                            start: { line: 1, column: 4, offset: 3 },
                            end: { line: 1, column: 19, offset: 18 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 2, offset: 1 },
                        end: { line: 1, column: 21, offset: 20 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 22, offset: 21 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'emphasis',
                      children: [
                        {
                          type: 'text',
                          value: 'Bold and Italic',
                          position: {
                            start: { line: 1, column: 4, offset: 3 },
                            end: { line: 1, column: 19, offset: 18 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 20, offset: 19 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 22, offset: 21 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'emphasis',
                      children: [
                        {
                          type: 'text',
                          value: 'Bold and Italic',
                          position: {
                            start: { line: 1, column: 4, offset: 3 },
                            end: { line: 1, column: 19, offset: 18 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 3, offset: 2 },
                        end: { line: 1, column: 20, offset: 19 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 22, offset: 21 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'emphasis',
                  children: [
                    {
                      type: 'strong',
                      children: [
                        {
                          type: 'text',
                          value: 'Bold and Italic',
                          position: {
                            start: { line: 1, column: 4, offset: 3 },
                            end: { line: 1, column: 19, offset: 18 },
                          },
                        },
                      ],
                      position: {
                        start: { line: 1, column: 2, offset: 1 },
                        end: { line: 1, column: 21, offset: 20 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 22, offset: 21 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'font',
                  attributes: [{ type: 'mdxJsxAttribute', name: 'color', value: 'red' }],
                  children: [
                    {
                      type: 'text',
                      value: 'Colored Text',
                      position: {
                        start: { line: 1, column: 19, offset: 18 },
                        end: { line: 1, column: 31, offset: 30 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 38, offset: 37 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 38, offset: 37 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 38, offset: 37 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'font',
                  attributes: [
                    { type: 'mdxJsxAttribute', name: 'color', value: 'blue' },
                    {
                      type: 'mdxJsxAttribute',
                      name: 'style',
                      value: {
                        type: 'mdxJsxAttributeValueExpression',
                        value: "{ color: 'red', backgroundColor: 'black' }",
                      },
                    },
                  ],
                  children: [
                    {
                      type: 'text',
                      value: 'Colored Text',
                      position: {
                        start: { line: 1, column: 71, offset: 70 },
                        end: { line: 1, column: 83, offset: 82 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 90, offset: 89 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 90, offset: 89 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 90, offset: 89 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'p',
                  attributes: [{ type: 'mdxJsxAttribute', name: 'align', value: 'left' }],
                  children: [
                    {
                      type: 'text',
                      value: 'Aligned Left',
                      position: {
                        start: { line: 1, column: 17, offset: 16 },
                        end: { line: 1, column: 29, offset: 28 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 33, offset: 32 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 33, offset: 32 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 33, offset: 32 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'mdxJsxTextElement',
                  name: 'p',
                  attributes: [
                    { type: 'mdxJsxAttribute', name: 'align', value: 'center' },
                    {
                      type: 'mdxJsxAttribute',
                      name: 'style',
                      value: {
                        type: 'mdxJsxAttributeValueExpression',
                        value: "{ textAlign: 'center' }",
                      },
                    },
                  ],
                  children: [
                    {
                      type: 'text',
                      value: 'Aligned Center',
                      position: {
                        start: { line: 1, column: 51, offset: 50 },
                        end: { line: 1, column: 65, offset: 64 },
                      },
                    },
                  ],
                  position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 1, column: 69, offset: 68 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 69, offset: 68 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 69, offset: 68 },
          },
        },
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
        mdast: {
          type: 'root',
          children: [
            {
              type: 'mdxJsxFlowElement',
              name: 'br',
              attributes: [],
              children: [],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 7, offset: 6 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 7, offset: 6 },
          },
        },
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
      }
      if (data.mdx) {
        runSectionSerializationTests('mdx', 'mdx', data.mdx, testCallback);
      }
    });
  });
}
