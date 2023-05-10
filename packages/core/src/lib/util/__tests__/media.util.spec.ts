import { createMockCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { mockImageField as mockBaseImageField } from '@staticcms/test/data/fields.mock';
import { selectMediaFolder } from '../media.util';

import type { FileOrImageField, FolderCollection, UnknownField } from '@staticcms/core/interface';

describe('media.util', () => {
  describe('selectMediaFolder', () => {
    const mockBaseCollection = createMockCollection<UnknownField>({
      fields: [
        {
          name: 'title',
          widget: 'string',
        },
      ],
    });

    const mockBaseEntry = createMockEntry({
      path: 'path/to/entry/index.md',
      data: {
        title: 'I am a title',
      },
    });

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

        const mockCollection = mockConfig.collections[0];
        const mockImageField = (mockConfig.collections[0] as FolderCollection)
          .fields[3] as FileOrImageField;

        expect(selectMediaFolder(mockConfig, mockCollection, mockBaseEntry, mockImageField)).toBe(
          'path/to/media/folder',
        );
      });

      describe('relative path', () => {
        it('should use collection media_folder if available', () => {
          const mockConfig = createMockConfig({
            collections: [
              createMockCollection<UnknownField>({
                folder: 'base/folder',
                media_folder: 'path/to/some/other/media/folder',
                fields: [
                  {
                    name: 'title',
                    widget: 'string',
                  },
                ],
              }),
            ],
            media_folder: 'path/to/media/folder',
          });

          const mockCollection = mockConfig.collections[0];
          const mockImageField = (mockConfig.collections[0] as FolderCollection)
            .fields[3] as FileOrImageField;

          expect(selectMediaFolder(mockConfig, mockCollection, mockBaseEntry, mockImageField)).toBe(
            'path/to/entry/path/to/some/other/media/folder',
          );
        });

        describe('template variable', () => {
          it('should substitute field value', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
                  media_folder: 'path/to/some/other/media/{{fields.title}}',
                  fields: [
                    {
                      name: 'title',
                      widget: 'string',
                    },
                  ],
                }),
              ],
              media_folder: 'path/to/media/folder',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            expect(
              selectMediaFolder(mockConfig, mockCollection, mockBaseEntry, mockImageField),
            ).toBe('path/to/entry/path/to/some/other/media/i-am-a-title');
          });

          it('should substitute slug', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
                  media_folder: 'path/to/some/other/media/{{slug}}',
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
                    mockBaseImageField,
                  ],
                }),
              ],
              media_folder: 'path/to/media/folder',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(selectMediaFolder(mockConfig, mockCollection, mockEntry, mockImageField)).toBe(
              'path/to/entry/path/to/some/other/media/i-am-a-title-fish',
            );
          });
        });
      });

      describe('absolute path', () => {
        it('should use collection media_folder if available', () => {
          const mockConfig = createMockConfig({
            collections: [
              createMockCollection<UnknownField>({
                folder: 'base/folder',
                media_folder: '/path/to/some/other/media/folder',
                fields: [
                  {
                    name: 'title',
                    widget: 'string',
                  },
                ],
              }),
            ],
            media_folder: 'path/to/media/folder',
          });

          const mockCollection = mockConfig.collections[0];
          const mockImageField = (mockConfig.collections[0] as FolderCollection)
            .fields[3] as FileOrImageField;

          expect(selectMediaFolder(mockConfig, mockCollection, mockBaseEntry, mockImageField)).toBe(
            'path/to/some/other/media/folder',
          );
        });

        describe('template variable', () => {
          it('should substitute field value', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
                  media_folder: '/path/to/some/other/media/{{fields.title}}',
                  fields: [
                    {
                      name: 'title',
                      widget: 'string',
                    },
                  ],
                }),
              ],
              media_folder: 'path/to/media/folder',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            expect(
              selectMediaFolder(mockConfig, mockCollection, mockBaseEntry, mockImageField),
            ).toBe('path/to/some/other/media/i-am-a-title');
          });

          it('should substitute slug', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
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
                    mockBaseImageField,
                  ],
                }),
              ],
              media_folder: 'path/to/media/folder',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(selectMediaFolder(mockConfig, mockCollection, mockEntry, mockImageField)).toBe(
              'path/to/some/other/media/i-am-a-title-fish',
            );
          });
        });
      });
    });
  });
});
