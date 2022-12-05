import yamlFormatter from '../YamlFormatter';

const json = {
  keyF: 'valueF',
  keyA: 'valueA',
  keyB: 'valueB',
  keyD: 'valueD',
  keyC: 'valueC',
  keyE: 'valueE',
};

const unsortedYaml = `keyF: valueF
keyA: valueA
keyB: valueB
keyD: valueD
keyC: valueC
keyE: valueE
`;

const sortedYaml = `keyA: valueA
keyB: valueB
keyC: valueC
keyD: valueD
keyE: valueE
keyF: valueF
`;

const sortedCommentedYaml = `keyA: valueA
# New comment here
keyB: valueB
keyC: valueC
keyD: valueD
keyE: valueE
# Last comment
keyF: valueF
`;

describe('YamlFormatter', () => {
  describe('toFile', () => {
    it('should convert json to yaml', () => {
      expect(yamlFormatter.toFile(json)).toEqual(unsortedYaml);
    });

    it('should sort yaml', () => {
      expect(yamlFormatter.toFile(json, ['keyA', 'keyB', 'keyC', 'keyD', 'keyE', 'keyF'])).toEqual(
        sortedYaml,
      );
    });

    it('should add comments', () => {
      expect(
        yamlFormatter.toFile(json, ['keyA', 'keyB', 'keyC', 'keyD', 'keyE', 'keyF'], {
          keyB: 'New comment here',
          keyF: 'Last comment',
        }),
      ).toEqual(sortedCommentedYaml);
    });
  });

  describe('fromFile', () => {
    it('should convert yaml to json', () => {
      expect(yamlFormatter.fromFile(unsortedYaml)).toEqual(json);
    });

    it('should handle yaml with comments', () => {
      expect(yamlFormatter.fromFile(sortedCommentedYaml)).toEqual(json);
    });
  });
});
