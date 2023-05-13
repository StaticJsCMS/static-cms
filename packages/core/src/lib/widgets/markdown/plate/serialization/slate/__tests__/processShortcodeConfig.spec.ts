import {
  processShortcodeConfigToMdx,
  processShortcodeConfigsToSlate,
} from '../processShortcodeConfig';
import { testShortcodeConfigs } from '../../../tests-util/serializationTests.util';

import type { MdastNode } from '../ast-types';

describe('processShortcodeConfig', () => {
  describe('processShortcodeConfigsToSlate', () => {
    it('converts shortcode', () => {
      const nodes: MdastNode[] = [{ type: 'text', value: '[youtube|p6h-rYSVX90]' }];
      const slate: MdastNode[] = [
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('converts shortcode with no args', () => {
      const nodes: MdastNode[] = [{ type: 'text', value: '[youtube]' }];
      const slate: MdastNode[] = [
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: [],
          children: [{ text: '' }],
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('converts shortcode with multiple args', () => {
      const nodes: MdastNode[] = [
        { type: 'text', value: '[youtube|p6h-rYSVX90|somethingElse|andOneMore]' },
      ];
      const slate: MdastNode[] = [
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90', 'somethingElse', 'andOneMore'],
          children: [{ text: '' }],
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('converts shortcode with text before', () => {
      const nodes: MdastNode[] = [{ type: 'text', value: 'Text before [youtube|p6h-rYSVX90]' }];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('converts shortcode with text after', () => {
      const nodes: MdastNode[] = [{ type: 'text', value: '[youtube|p6h-rYSVX90] and text after' }];
      const slate: MdastNode[] = [
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        {
          type: 'text',
          value: ' and text after',
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('converts shortcode with text before and after', () => {
      const nodes: MdastNode[] = [
        { type: 'text', value: 'Text before [youtube|p6h-rYSVX90] and text after' },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        {
          type: 'text',
          value: ' and text after',
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('converts multiple shortcodes', () => {
      const nodes: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before [youtube|p6h-rYSVX90] and {{< twitter 917359331535966209 >}}',
        },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        {
          type: 'text',
          value: ' and ',
        },
        {
          type: 'shortcode',
          shortcode: 'twitter',
          args: ['917359331535966209'],
          children: [{ text: '' }],
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('converts multiple of the same shortcodes', () => {
      const nodes: MdastNode[] = [
        {
          type: 'text',
          value:
            'Text before [youtube|p6h-rYSVX90], [youtube|p6h-rYSVX90], {{< twitter 917359331535966209 >}} and [youtube|p6h-rYSVX90]',
        },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        {
          type: 'text',
          value: ', ',
        },
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        {
          type: 'text',
          value: ', ',
        },
        {
          type: 'shortcode',
          shortcode: 'twitter',
          args: ['917359331535966209'],
          children: [{ text: '' }],
        },
        {
          type: 'text',
          value: ' and ',
        },
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('does not convert unrecognized shortcode', () => {
      const nodes: MdastNode[] = [{ type: 'text', value: '[someOtherShortcode|andstuff]' }];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: '[someOtherShortcode|andstuff]',
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('does not convert unrecognized shortcode surrounded by recognized shortcodes', () => {
      const nodes: MdastNode[] = [
        {
          type: 'text',
          value:
            'Text before [youtube|p6h-rYSVX90], [someOtherShortcode|andstuff] and {{< twitter 917359331535966209 >}}',
        },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Text before ',
        },
        {
          type: 'shortcode',
          shortcode: 'youtube',
          args: ['p6h-rYSVX90'],
          children: [{ text: '' }],
        },
        {
          type: 'text',
          value: ', [someOtherShortcode|andstuff] and ',
        },
        {
          type: 'shortcode',
          shortcode: 'twitter',
          args: ['917359331535966209'],
          children: [{ text: '' }],
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });

    it('does not convert plain text', () => {
      const nodes: MdastNode[] = [
        { type: 'text', value: 'Some text about something going on somewhere' },
      ];
      const slate: MdastNode[] = [
        {
          type: 'text',
          value: 'Some text about something going on somewhere',
        },
      ];

      expect(processShortcodeConfigsToSlate(testShortcodeConfigs, nodes)).toEqual(slate);
    });
  });

  describe('processShortcodeConfigToMdx', () => {
    it('converts to mdx', () => {
      const markdown = '[youtube|p6h-rYSVX90]';
      const mdx = '<Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('converts shortcode with no args', () => {
      const markdown = '[youtube]';
      const mdx = '<Shortcode shortcode="youtube" args={[]} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('converts shortcode with multiple args', () => {
      const markdown = '[youtube|p6h-rYSVX90|somethingElse|andOneMore]';
      const mdx =
        "<Shortcode shortcode=\"youtube\" args={['p6h-rYSVX90', 'somethingElse', 'andOneMore']} />";

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('converts shortcode with text before', () => {
      const markdown = 'Text before [youtube|p6h-rYSVX90]';
      const mdx = 'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('converts shortcode with text after', () => {
      const markdown = '[youtube|p6h-rYSVX90] and text after';
      const mdx = '<Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} /> and text after';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('converts shortcode with text before and after', () => {
      const markdown = 'Text before [youtube|p6h-rYSVX90] and text after';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} /> and text after';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('converts multiple shortcodes', () => {
      const markdown = 'Text before [youtube|p6h-rYSVX90] and {{< twitter 917359331535966209 >}}';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} /> and <Shortcode shortcode="twitter" args={[\'917359331535966209\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('converts multiple of the same shortcodes', () => {
      const markdown =
        'Text before [youtube|p6h-rYSVX90], [youtube|p6h-rYSVX90], {{< twitter 917359331535966209 >}} and [youtube|p6h-rYSVX90]';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />, <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />, <Shortcode shortcode="twitter" args={[\'917359331535966209\']} /> and <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('does not convert unrecognized shortcode', () => {
      const markdown = '[someOtherShortcode|andstuff]';
      const mdx = '[someOtherShortcode|andstuff]';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('does not convert unrecognized shortcode surrounded by recognized shortcodes', () => {
      const markdown =
        'Text before [youtube|p6h-rYSVX90], [someOtherShortcode|andstuff] and {{< twitter 917359331535966209 >}}';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />, [someOtherShortcode|andstuff] and <Shortcode shortcode="twitter" args={[\'917359331535966209\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('does not convert plain text', () => {
      const markdown = 'Some text about something going on somewhere';
      const mdx = 'Some text about something going on somewhere';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });
  });
});
