import {
  deserializationOnlyTestData,
  runSerializationTests,
  testShortcodeConfigs as shortcodeConfigs,
} from '../../../tests-util/serializationTests.util';
import { slateCompiler } from '../toSlatePlugin';

import type { SerializationTestData } from '../../../tests-util/serializationTests.util';
import type { MdastNode } from '../ast-types';

async function expectNodes(
  mdast: MdastNode,
  useMdx: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[],
) {
  const compiler = slateCompiler({ useMdx, shortcodeConfigs });

  expect(compiler(mdast)).toEqual(children);
}

function testRunner(key: string, mode: 'markdown' | 'mdx' | 'both', data: SerializationTestData) {
  it(`deserializes ${key}`, async () => {
    await expectNodes(data.mdast, mode === 'mdx', data.slate);
  });
}

describe('markdownToSlate', () => {
  runSerializationTests(testRunner);
  runSerializationTests(testRunner, deserializationOnlyTestData);
});
