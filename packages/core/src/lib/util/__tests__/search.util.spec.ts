import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { fileSearch } from '../search.util';

const rightIcon = {
  name: 'right',
  type: 'control',
  icon: '/src/icons/right.svg',
};

const leftIcon = {
  name: 'left',
  type: 'control',
  icon: '/src/icons/left.svg',
};

const zoomIcon = {
  name: 'zoom',
  type: 'action',
  icon: '/src/icons/zoom.svg',
};

const downloadIcon = {
  name: 'download',
  type: 'action',
  icon: '/src/icons/download.svg',
};

const nestedList = createMockEntry({
  data: {
    icons: [rightIcon, leftIcon, downloadIcon, zoomIcon],
  },
});

describe('search.util', () => {
  describe('fileSearch', () => {
    it('filters nested array', () => {
      expect(fileSearch(nestedList, ['icons.*.name'], 'zoom')).toEqual([
        createMockEntry({
          data: {
            icons: [zoomIcon],
          },
          raw: nestedList.raw,
        }),
      ]);

      expect(fileSearch(nestedList, ['icons.*.name'], 'bad input')).toEqual([
        createMockEntry({
          data: {
            icons: [],
          },
          raw: nestedList.raw,
        }),
      ]);
    });

    it('filters nested array on multiple search fields', () => {
      expect(fileSearch(nestedList, ['icons.*.name', 'icons.*.type'], 'action')).toEqual([
        createMockEntry({
          data: {
            icons: [downloadIcon, zoomIcon],
          },
          raw: nestedList.raw,
        }),
      ]);

      expect(fileSearch(nestedList, ['icons.*.name', 'icons.*.type'], 'down')).toEqual([
        createMockEntry({
          data: {
            icons: [downloadIcon],
          },
          raw: nestedList.raw,
        }),
      ]);
    });
  });
});
