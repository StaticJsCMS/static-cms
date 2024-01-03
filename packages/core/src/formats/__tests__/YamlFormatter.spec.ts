import { createMockConfig } from '@staticcms/test/data/config.mock';
import yamlFormatter from '../YamlFormatter';

import type { ConfigWithDefaults } from '@staticcms/core';

jest.unmock('yaml');

const json = {
  keyF: 'valueF',
  keyA: 'valueA',
  keyB: 'valueB',
  keyD: 'valueD',
  keyC: {
    subKeyC1: 'valueC1',
    subKeyC2: {
      subC2SubKeyC1: 'subC2ValueC1',
    },
  },
  keyE: ['valueE1', 'valueE2', 'valueE3', 'valueE4'],
};

const unsortedYaml = `keyF: valueF
keyA: valueA
keyB: valueB
keyD: valueD
keyC:
  subKeyC1: valueC1
  subKeyC2:
    subC2SubKeyC1: subC2ValueC1
keyE:
  - valueE1
  - valueE2
  - valueE3
  - valueE4
`;

const sortedYaml = `keyA: valueA
keyB: valueB
keyC:
  subKeyC1: valueC1
  subKeyC2:
    subC2SubKeyC1: subC2ValueC1
keyD: valueD
keyE:
  - valueE1
  - valueE2
  - valueE3
  - valueE4
keyF: valueF
`;

const sortedCommentedYaml = `keyA: valueA
# New comment here
keyB: valueB
keyC:
  subKeyC1: valueC1
  subKeyC2:
    subC2SubKeyC1: subC2ValueC1
keyD: valueD
keyE:
  - valueE1
  - valueE2
  - valueE3
  - valueE4
# Last comment
keyF: valueF
`;

const doubleQuotedYaml = `"keyF": "valueF"
"keyA": "valueA"
"keyB": "valueB"
"keyD": "valueD"
"keyC":
  "subKeyC1": "valueC1"
  "subKeyC2":
    "subC2SubKeyC1": "subC2ValueC1"
"keyE":
  - "valueE1"
  - "valueE2"
  - "valueE3"
  - "valueE4"
`;

const noIdentSeqYaml = `keyF: valueF
keyA: valueA
keyB: valueB
keyD: valueD
keyC:
  subKeyC1: valueC1
  subKeyC2:
    subC2SubKeyC1: subC2ValueC1
keyE:
- valueE1
- valueE2
- valueE3
- valueE4
`;

const flowStyleYaml = `{
  keyF: valueF,
  keyA: valueA,
  keyB: valueB,
  keyD: valueD,
  keyC:
    {
      subKeyC1: valueC1,
      subKeyC2: { subC2SubKeyC1: subC2ValueC1 }
    },
  keyE: [ valueE1, valueE2, valueE3, valueE4 ]
}
`;

describe('YamlFormatter', () => {
  const config = createMockConfig({ collections: [] }) as ConfigWithDefaults;

  describe('toFile', () => {
    it('should convert json to yaml', () => {
      expect(yamlFormatter.toFile(json, config)).toEqual(unsortedYaml);
    });

    it('should sort yaml', () => {
      expect(
        yamlFormatter.toFile(json, config, ['keyA', 'keyB', 'keyC', 'keyD', 'keyE', 'keyF']),
      ).toEqual(sortedYaml);
    });

    it('should add comments', () => {
      expect(
        yamlFormatter.toFile(json, config, ['keyA', 'keyB', 'keyC', 'keyD', 'keyE', 'keyF'], {
          keyB: 'New comment here',
          keyF: 'Last comment',
        }),
      ).toEqual(sortedCommentedYaml);
    });

    describe('options', () => {
      it('should convert json to yaml with double quotes', () => {
        const optionsConfig = createMockConfig({
          collections: [],
          yaml: {
            toStringOptions: { defaultStringType: 'QUOTE_DOUBLE' },
          },
        }) as ConfigWithDefaults;

        expect(yamlFormatter.toFile(json, optionsConfig)).toEqual(doubleQuotedYaml);
      });

      it('should convert json to yaml without additional idents for block sequences', () => {
        const optionsConfig = createMockConfig({
          collections: [],
          yaml: {
            toStringOptions: { indentSeq: false },
          },
        }) as ConfigWithDefaults;

        expect(yamlFormatter.toFile(json, optionsConfig)).toEqual(noIdentSeqYaml);
      });

      it('should convert json to yaml flow style', () => {
        const optionsConfig = createMockConfig({
          collections: [],
          yaml: {
            createNodeOptions: { flow: true },
          },
        }) as ConfigWithDefaults;

        expect(yamlFormatter.toFile(json, optionsConfig)).toEqual(flowStyleYaml);
      });
    });
  });

  describe('fromFile', () => {
    it('should convert yaml to json', () => {
      expect(yamlFormatter.fromFile(unsortedYaml, config)).toEqual(json);
    });

    it('should handle yaml with comments', () => {
      expect(yamlFormatter.fromFile(sortedCommentedYaml, config)).toEqual(json);
    });
  });
});
