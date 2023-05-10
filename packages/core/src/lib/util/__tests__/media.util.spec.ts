import { createMockCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { mockImageField } from '@staticcms/test/data/fields.mock';
import { selectMediaFolder } from '../media.util';

describe('media.util', () => {
  describe('selectMediaFolder', () => {
    const mockBaseCollection = createMockCollection({});
    const mockBaseEntry = createMockEntry({ data: {} });
    const mockBaseImageField = mockImageField;

    describe('top level', () => {
      it('should default to top level config media_folder', () => {
        const mockConfig = createMockConfig({
          collections: [mockBaseCollection],
          media_folder: 'path/to/media/folder',
        });

        expect(selectMediaFolder(mockConfig, undefined, undefined, undefined)).toBe(
          'path/to/media/folder',
        );
      });
    });

    describe('entry', () => {
      it('should default to top level config media_folder', () => {
        const mockConfig = createMockConfig({
          collections: [mockBaseCollection],
          media_folder: 'path/to/media/folder',
        });

        expect(
          selectMediaFolder(mockConfig, mockBaseCollection, mockBaseEntry, mockBaseImageField),
        ).toBe('path/to/media/folder');
      });

      describe('relative path', () => {
        it('should use collection media_folder if available', () => {
          const mockCollection = createMockCollection({
            folder: 'base/folder',
            media_folder: 'path/to/some/other/media/folder',
          });

          const mockConfig = createMockConfig({
            collections: [mockCollection],
            media_folder: 'path/to/media/folder',
          });

          const mockEntry = createMockEntry({ path: 'path/to/entry/index.md', data: {} });

          expect(selectMediaFolder(mockConfig, mockCollection, mockEntry, mockBaseImageField)).toBe(
            'path/to/entry/path/to/some/other/media/folder',
          );
        });
      });

      describe('absolute path', () => {
        it('should use collection media_folder if available', () => {
          const mockCollection = createMockCollection({
            folder: 'base/folder',
            media_folder: '/path/to/some/other/media/folder',
          });

          const mockConfig = createMockConfig({
            collections: [mockCollection],
            media_folder: 'path/to/media/folder',
          });

          expect(
            selectMediaFolder(mockConfig, mockCollection, mockBaseEntry, mockBaseImageField),
          ).toBe('path/to/some/other/media/folder');
        });

        describe('template variable', () => {
          it('should substitute field value', () => {
            const mockCollection = createMockCollection({
              folder: 'base/folder',
              media_folder: '/path/to/some/other/media/{{fields.title}}',
              fields: [
                {
                  name: 'title',
                  widget: 'string',
                },
              ],
            });

            const mockConfig = createMockConfig({
              collections: [mockCollection],
              media_folder: 'path/to/media/folder',
            });

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title' },
            });

            expect(
              selectMediaFolder(mockConfig, mockCollection, mockEntry, mockBaseImageField),
            ).toBe('path/to/some/other/media/i-am-a-title');
          });

          fit('should substitute slug', () => {
            const mockCollection = createMockCollection({
              folder: 'base/folder',
              media_folder: '/path/to/some/other/media/{{slug}}',
              slug: '{{fields.title}}-{{fields.name}}',
              fields: [
                {
                  name: 'title',
                  widget: 'string',
                },
                {
                  name: 'name',
                  widget: 'string',
                },
              ],
            });

            const mockConfig = createMockConfig({
              collections: [mockCollection],
              media_folder: 'path/to/media/folder',
            });

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(
              selectMediaFolder(mockConfig, mockCollection, mockEntry, mockBaseImageField),
            ).toBe('path/to/some/other/media/i-am-a-title-fish');
          });
        });
      });
    });
  });
});
