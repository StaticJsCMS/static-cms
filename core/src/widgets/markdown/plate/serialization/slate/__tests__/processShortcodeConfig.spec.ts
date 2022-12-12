import { processShortcodeConfigToMdx } from '../processShortcodeConfig';
import { testShortcodeConfigs } from '../../../tests-util/serializationTests.util';

describe('processShortcodeConfig', () => {
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

    it('shortcode with text before', () => {
      const markdown = 'Text before [youtube|p6h-rYSVX90]';
      const mdx = 'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('shortcode with text after', () => {
      const markdown = '[youtube|p6h-rYSVX90] and text after';
      const mdx = '<Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} /> and text after';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('shortcode with text before and after', () => {
      const markdown = 'Text before [youtube|p6h-rYSVX90] and text after';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} /> and text after';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('multiple shortcodes', () => {
      const markdown = 'Text before [youtube|p6h-rYSVX90] and {{< twitter 917359331535966209 >}}';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} /> and <Shortcode shortcode="twitter" args={[\'917359331535966209\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('multiple of the same shortcodes', () => {
      const markdown =
        'Text before [youtube|p6h-rYSVX90], [youtube|p6h-rYSVX90], {{< twitter 917359331535966209 >}} and [youtube|p6h-rYSVX90]';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />, <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />, <Shortcode shortcode="twitter" args={[\'917359331535966209\']} /> and <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('unrecognized shortcode', () => {
      const markdown = '[someOtherShortcode|andstuff]';
      const mdx = '[someOtherShortcode|andstuff]';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('unrecognized shortcode surrounded by recognized shortcodes', () => {
      const markdown =
        'Text before [youtube|p6h-rYSVX90], [someOtherShortcode|andstuff] and {{< twitter 917359331535966209 >}}';
      const mdx =
        'Text before <Shortcode shortcode="youtube" args={[\'p6h-rYSVX90\']} />, [someOtherShortcode|andstuff] and <Shortcode shortcode="twitter" args={[\'917359331535966209\']} />';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });

    it('plain text', () => {
      const markdown = 'Some text about something going on somewhere';
      const mdx = 'Some text about something going on somewhere';

      expect(processShortcodeConfigToMdx(testShortcodeConfigs, markdown)).toBe(mdx);
    });
  });
});
