import {
  deserializationOnlyTestData,
  runSerializationTests,
  testShortcodeConfigs as shortcodeConfigs,
} from '../../tests-util/serializationTests.util';
import { markdownToSlate } from '../useMarkdownToSlate';

import type { SerializationTestData } from '../../tests-util/serializationTests.util';
import type { UseMarkdownToSlateOptions } from '../useMarkdownToSlate';

jest.unmock('remark-gfm');
jest.unmock('remark-mdx');
jest.unmock('remark-parse');
jest.unmock('unified');

async function expectNodes(
  markdown: string,
  options: UseMarkdownToSlateOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[],
) {
  expect(await markdownToSlate(markdown, options)).toEqual(children);
}

function sanitizeHtmlInMarkdown(markdown: string) {
  return markdown
    .replace('</font>', '<\\/font>')
    .replace('<u>', '<u\\>')
    .replace('</u>', '<\\/u>')
    .replace('<sub>', '<sub\\>')
    .replace('</sub>', '<\\/sub>')
    .replace('<sup>', '<sup\\>')
    .replace('</sup>', '<\\/sup>');
}

function testRunner(key: string, mode: 'markdown' | 'mdx' | 'both', data: SerializationTestData) {
  it(`deserializes ${key}`, async () => {
    await expectNodes(
      mode === 'markdown' ? sanitizeHtmlInMarkdown(data.markdown) : data.markdown,
      { shortcodeConfigs, useMdx: mode === 'mdx' },
      data.slate,
    );
  });
}

describe('markdownToSlate', () => {
  runSerializationTests(testRunner);
  runSerializationTests(testRunner, deserializationOnlyTestData);
});
