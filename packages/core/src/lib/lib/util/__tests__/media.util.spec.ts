import { createMockCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { createMockEntry } from '@staticcms/test/data/entry.mock';
import { mockImageField as mockBaseImageField } from '@staticcms/test/data/fields.mock';
import { selectMediaFilePublicPath, selectMediaFolder } from '../media.util';

import type { FileOrImageField, FolderCollection, UnknownField } from '@staticcms/core/interface';

jest.mock('@staticcms/core/backend');

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

          it('should substitute slug from top level media_folder (always considered an absolute path)', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
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
              media_folder: 'path/to/media/folder/{{slug}}',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(selectMediaFolder(mockConfig, mockCollection, mockEntry, mockImageField)).toBe(
              'path/to/media/folder/i-am-a-title-fish',
            );
          });

          it('should not throw error when evaluating slug for new entry', () => {
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
              data: {},
              newRecord: true,
            });

            expect(selectMediaFolder(mockConfig, mockCollection, mockEntry, mockImageField)).toBe(
              'path/to/entry/path/to/some/other/media',
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

          it('should substitute slug from top level media_folder', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
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
              media_folder: '/path/to/media/folder/{{slug}}',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(selectMediaFolder(mockConfig, mockCollection, mockEntry, mockImageField)).toBe(
              'path/to/media/folder/i-am-a-title-fish',
            );
          });

          it('should not throw error when evaluating slug for new entry', () => {
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
              data: {},
              newRecord: true,
            });

            expect(selectMediaFolder(mockConfig, mockCollection, mockEntry, mockImageField)).toBe(
              'path/to/some/other/media',
            );
          });
        });
      });
    });
  });

  describe('selectMediaFilePublicPath', () => {
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
      it('should default to top level config public_folder', () => {
        const mockConfig = createMockConfig({
          collections: [mockBaseCollection],
          media_folder: 'path/to/media/folder',
          public_folder: 'path/to/public/folder',
        });

        expect(
          selectMediaFilePublicPath(
            mockConfig,
            undefined,
            'image.png',
            undefined,
            undefined,
            undefined,
          ),
        ).toBe('path/to/public/folder/image.png');
      });

      it('should use media_folder as an absolute path if public_folder is not provided', () => {
        const mockConfig = createMockConfig({
          collections: [mockBaseCollection],
          media_folder: 'path/to/media/folder',
        });

        expect(
          selectMediaFilePublicPath(
            mockConfig,
            undefined,
            'image.png',
            undefined,
            undefined,
            undefined,
          ),
        ).toBe('/path/to/media/folder/image.png');
      });
    });

    describe('entry', () => {
      it('should default to top level config public_folder', () => {
        const mockConfig = createMockConfig({
          collections: [mockBaseCollection],
          media_folder: 'path/to/media/folder',
          public_folder: 'path/to/public/folder',
        });

        const mockCollection = mockConfig.collections[0];
        const mockImageField = (mockConfig.collections[0] as FolderCollection)
          .fields[3] as FileOrImageField;

        expect(
          selectMediaFilePublicPath(
            mockConfig,
            mockCollection,
            'image.png',
            mockBaseEntry,
            mockImageField,
          ),
        ).toBe('path/to/public/folder/image.png');
      });

      it('should default to top level config media_folder as an absolute path', () => {
        const mockConfig = createMockConfig({
          collections: [mockBaseCollection],
          media_folder: 'path/to/media/folder',
        });

        const mockCollection = mockConfig.collections[0];
        const mockImageField = (mockConfig.collections[0] as FolderCollection)
          .fields[3] as FileOrImageField;

        expect(
          selectMediaFilePublicPath(
            mockConfig,
            mockCollection,
            'image.png',
            mockBaseEntry,
            mockImageField,
          ),
        ).toBe('/path/to/media/folder/image.png');
      });

      describe('relative path', () => {
        it('should use collection public_folder if available', () => {
          const mockConfig = createMockConfig({
            collections: [
              createMockCollection<UnknownField>({
                folder: 'base/folder',
                media_folder: 'path/to/collection/media/folder',
                public_folder: 'path/to/collection/public/folder',
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
            selectMediaFilePublicPath(
              mockConfig,
              mockCollection,
              'image.png',
              mockBaseEntry,
              mockImageField,
            ),
          ).toBe('path/to/collection/public/folder/image.png');
        });

        it('should use collection media_folder if no public_folder is available', () => {
          const mockConfig = createMockConfig({
            collections: [
              createMockCollection<UnknownField>({
                folder: 'base/folder',
                media_folder: 'path/to/collection/media/folder',
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
            selectMediaFilePublicPath(
              mockConfig,
              mockCollection,
              'image.png',
              mockBaseEntry,
              mockImageField,
            ),
          ).toBe('path/to/collection/media/folder/image.png');
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
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockBaseEntry,
                mockImageField,
              ),
            ).toBe('path/to/some/other/media/i-am-a-title/image.png');
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

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('path/to/some/other/media/i-am-a-title-fish/image.png');
          });

          it('should substitute slug from top level media_folder if no public_folders', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
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
              media_folder: 'path/to/media/folder/{{slug}}',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('/path/to/media/folder/i-am-a-title-fish/image.png');
          });

          it('should substitute slug from top level public_folder', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
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
              media_folder: 'path/to/media/folder/{{slug}}',
              public_folder: 'path/to/public/folder/{{slug}}',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('path/to/public/folder/i-am-a-title-fish/image.png');
          });

          it('should not throw error when evaluating slug for new entry', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
                  media_folder: 'path/to/collection/media/folder/{{slug}}',
                  public_folder: 'path/to/collection/public/folder/{{slug}}',
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
              data: {},
              newRecord: true,
            });

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('path/to/collection/public/folder/image.png');
          });
        });
      });

      describe('absolute path', () => {
        it('should use collection public_folder if available', () => {
          const mockConfig = createMockConfig({
            collections: [
              createMockCollection<UnknownField>({
                folder: 'base/folder',
                media_folder: 'path/to/collection/media/folder',
                public_folder: '/path/to/collection/public/folder',
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
            selectMediaFilePublicPath(
              mockConfig,
              mockCollection,
              'image.png',
              mockBaseEntry,
              mockImageField,
            ),
          ).toBe('/path/to/collection/public/folder/image.png');
        });

        it('should use collection media_folder if no public_folder is available', () => {
          const mockConfig = createMockConfig({
            collections: [
              createMockCollection<UnknownField>({
                folder: 'base/folder',
                media_folder: '/path/to/collection/media/folder',
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
            selectMediaFilePublicPath(
              mockConfig,
              mockCollection,
              'image.png',
              mockBaseEntry,
              mockImageField,
            ),
          ).toBe('/path/to/collection/media/folder/image.png');
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
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockBaseEntry,
                mockImageField,
              ),
            ).toBe('/path/to/some/other/media/i-am-a-title/image.png');
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

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('/path/to/some/other/media/i-am-a-title-fish/image.png');
          });

          it('should substitute slug from top level media_folder if no public_folders', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
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
              media_folder: '/path/to/media/folder/{{slug}}',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('/path/to/media/folder/i-am-a-title-fish/image.png');
          });

          it('should substitute slug from top level public_folder', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
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
              media_folder: '/path/to/media/folder/{{slug}}',
              public_folder: '/path/to/public/folder/{{slug}}',
            });

            const mockCollection = mockConfig.collections[0];
            const mockImageField = (mockConfig.collections[0] as FolderCollection)
              .fields[3] as FileOrImageField;

            const mockEntry = createMockEntry({
              path: 'path/to/entry/index.md',
              data: { title: 'i am a title', name: 'fish' },
            });

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('/path/to/public/folder/i-am-a-title-fish/image.png');
          });

          it('should not throw error when evaluating slug for new entry', () => {
            const mockConfig = createMockConfig({
              collections: [
                createMockCollection<UnknownField>({
                  folder: 'base/folder',
                  media_folder: '/path/to/collection/media/folder/{{slug}}',
                  public_folder: '/path/to/collection/public/folder/{{slug}}',
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
              data: {},
              newRecord: true,
            });

            expect(
              selectMediaFilePublicPath(
                mockConfig,
                mockCollection,
                'image.png',
                mockEntry,
                mockImageField,
              ),
            ).toBe('/path/to/collection/public/folder/image.png');
          });
        });
      });
    });
  });
});
