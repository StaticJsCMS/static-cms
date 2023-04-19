import { autoLinkToSlate } from '../autoLinkUrls';

import type { MdastNode } from '../ast-types';

describe('processShortcodeConfig', () => {
  describe('autoLinkToSlate', () => {
    it('converts url to anchor node', () => {
      const nodes: MdastNode[] = [
        { type: 'text', value: 'https://www.youtube.com/watch?v=p6h-rYSVX90' },
      ];
      const slate: MdastNode[] = [
        {
          type: 'a',
          url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
          children: [{ text: 'https://www.youtube.com/watch?v=p6h-rYSVX90' }],
        },
      ];

      expect(autoLinkToSlate(nodes)).toEqual(slate);
    });

    it('does not convert url in shortcode node', () => {
      const nodes: MdastNode[] = [
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['https://www.youtube.com/watch?v=p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        { type: 'text', value: 'https://www.youtube.com/watch?v=p6h-rYSVX90' },
      ];
      const slate: MdastNode[] = [
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['https://www.youtube.com/watch?v=p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        {
          type: 'a',
          url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
          children: [{ text: 'https://www.youtube.com/watch?v=p6h-rYSVX90' }],
        },
      ];

      expect(autoLinkToSlate(nodes)).toEqual(slate);
    });

    it('converts url with text before', () => {
      const nodes: MdastNode[] = [
        { type: 'text', value: 'Text before https://www.youtube.com/watch?v=p6h-rYSVX90' },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'a',
          url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
          children: [{ text: 'https://www.youtube.com/watch?v=p6h-rYSVX90' }],
        },
      ];

      expect(autoLinkToSlate(nodes)).toEqual(slate);
    });

    it('converts url with text after', () => {
      const nodes: MdastNode[] = [
        { type: 'text', value: 'https://www.youtube.com/watch?v=p6h-rYSVX90 and text after' },
      ];
      const slate: MdastNode[] = [
        {
          type: 'a',
          url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
          children: [{ text: 'https://www.youtube.com/watch?v=p6h-rYSVX90' }],
        },
        {
          type: 'text',
          value: ' and text after',
        },
      ];

      expect(autoLinkToSlate(nodes)).toEqual(slate);
    });

    it('converts url with text before and after', () => {
      const nodes: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before https://www.youtube.com/watch?v=p6h-rYSVX90 and text after',
        },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'a',
          url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
          children: [{ text: 'https://www.youtube.com/watch?v=p6h-rYSVX90' }],
        },
        {
          type: 'text',
          value: ' and text after',
        },
      ];

      expect(autoLinkToSlate(nodes)).toEqual(slate);
    });

    it('converts multiple urls', () => {
      const nodes: MdastNode[] = [
        {
          type: 'text',
          value:
            'Text before https://www.youtube.com/watch?v=p6h-rYSVX90 and https://www.youtube.com/watch?v=p6h-rYSVX90 text after',
        },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'a',
          url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
          children: [{ text: 'https://www.youtube.com/watch?v=p6h-rYSVX90' }],
        },
        {
          type: 'text',
          value: ' and ',
        },
        {
          type: 'a',
          url: 'https://www.youtube.com/watch?v=p6h-rYSVX90',
          children: [{ text: 'https://www.youtube.com/watch?v=p6h-rYSVX90' }],
        },
        {
          type: 'text',
          value: ' text after',
        },
      ];

      expect(autoLinkToSlate(nodes)).toEqual(slate);
    });

    it('does not convert plain text', () => {
      const nodes: MdastNode[] = [
        {
          type: 'text',
          value: 'Some text about something going on somewhere',
        },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Some text about something going on somewhere',
        },
      ];

      expect(autoLinkToSlate(nodes)).toEqual(slate);
    });
  });
});
