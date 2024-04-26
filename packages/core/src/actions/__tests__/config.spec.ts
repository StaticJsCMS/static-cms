/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { stripIndent } from 'common-tags';
import yaml from 'yaml';

import { createMockConfig } from '@staticcms/test/data/config.mock';
import { detectProxyServer, handleLocalBackend, loadConfig, parseConfig } from '../config';

import type {
  Config,
  DefaultEditorConfig,
  FileOrImageField,
  FilesCollection,
  FolderCollection,
} from '@staticcms/core';

jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'info').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.mock('../../backend', () => {
  return {
    resolveBackend: jest.fn(() => ({ isGitBackend: jest.fn(() => true) })),
  };
});
jest.mock('../../constants/configSchema');

jest.mock('yaml', () => ({
  parse: jest.fn(),
}));

describe('config', () => {
  describe('parseConfig', () => {
    let yamlParseMock: jest.Mock;

    beforeEach(() => {
      yamlParseMock = yaml.parse as jest.Mock;
    });

    it('can parse simple yaml config', () => {
      const file = stripIndent`
        backend:
          name: test-repo
        media_folder: static/images
      `;

      yamlParseMock.mockReturnValue({
        backend: {
          name: 'test-repo',
        },
        media_folder: 'static/images',
      });

      expect(parseConfig(file)).toEqual({
        backend: { name: 'test-repo' },
        media_folder: 'static/images',
      });

      expect(yamlParseMock).toHaveBeenCalledWith(file, {
        maxAliasCount: -1,
        prettyErrors: true,
        merge: true,
      });
    });

    it('should merge yaml aliases', () => {
      const file = stripIndent`
      backend:
        name: github
        repo: staticjscms/static-cms
        squash_merges: true
        open_authoring: true
      local_backend: true
      site_url: https://www.staticcms.org
      publish_mode: editorial_workflow
      media_folder: website/static/img
      public_folder: img
      docs_collection: &docs_collection
        folder: website/content/docs
        create: true
        preview_path: 'docs/{{slug}}'
        fields:
          - { label: Title, name: title }
          - { label: Body, name: body, widget: markdown }
      collections:
        - <<: *docs_collection
          name: docs_start
          label: 'Docs: Quick Start'
      `;

      yamlParseMock.mockReturnValue({
        backend: {
          name: 'github',
          repo: 'staticjscms/static-cms',
          squash_merges: true,
          open_authoring: true,
        },
        local_backend: true,
        site_url: 'https://www.staticcms.org',
        publish_mode: 'editorial_workflow',
        media_folder: 'website/static/img',
        public_folder: 'img',
        docs_collection: {
          folder: 'website/content/docs',
          create: true,
          preview_path: 'docs/{{slug}}',
          fields: [
            {
              label: 'Title',
              name: 'title',
            },
            {
              label: 'Body',
              name: 'body',
              widget: 'markdown',
            },
          ],
        },
        collections: [
          {
            folder: 'website/content/docs',
            create: true,
            preview_path: 'docs/{{slug}}',
            fields: [
              {
                label: 'Title',
                name: 'title',
              },
              {
                label: 'Body',
                name: 'body',
                widget: 'markdown',
              },
            ],
            name: 'docs_start',
            label: 'Docs: Quick Start',
          },
        ],
      });

      expect(parseConfig(file)).toEqual({
        backend: {
          name: 'github',
          repo: 'staticjscms/static-cms',
          squash_merges: true,
          open_authoring: true,
        },
        local_backend: true,
        site_url: 'https://www.staticcms.org',
        publish_mode: 'editorial_workflow',
        media_folder: 'website/static/img',
        public_folder: 'img',
        docs_collection: {
          folder: 'website/content/docs',
          create: true,
          preview_path: 'docs/{{slug}}',
          fields: [
            { label: 'Title', name: 'title' },
            { label: 'Body', name: 'body', widget: 'markdown' },
          ],
        },
        collections: [
          {
            folder: 'website/content/docs',
            create: true,
            preview_path: 'docs/{{slug}}',
            fields: [
              { label: 'Title', name: 'title' },
              { label: 'Body', name: 'body', widget: 'markdown' },
            ],
            name: 'docs_start',
            label: 'Docs: Quick Start',
          },
        ],
      });

      expect(yamlParseMock).toHaveBeenCalledWith(file, {
        maxAliasCount: -1,
        prettyErrors: true,
        merge: true,
      });
    });
  });

  describe('applyDefaults', () => {
    describe('publish_mode', () => {
      it('should set publish_mode if not set', () => {
        const config = createMockConfig({
          media_folder: 'path/to/media',
          public_folder: '/path/to/media',
          collections: [],
        });
        expect(config.publish_mode).toEqual('simple');
      });

      it('should set publish_mode from config', () => {
        const config = createMockConfig({
          publish_mode: 'editorial_workflow',
          media_folder: 'path/to/media',
          public_folder: '/path/to/media',
          collections: [],
        });
        expect(config.publish_mode).toEqual('editorial_workflow');
      });
    });

    describe('media_library', () => {
      it('should set media_library based on global config if not set', () => {
        const config = createMockConfig({
          media_library: {
            max_file_size: 600000,
            folder_support: true,
          },
          collections: [
            {
              name: 'foo-collection',
              label: 'Foo',
              folder: 'foo',
              fields: [{ name: 'title', widget: 'file' }],
            },
          ],
        });

        const collection = config.collections[0] as FolderCollection;
        expect(collection.media_library).toEqual({
          max_file_size: 600000,
          folder_support: true,
        });

        const field = collection.fields[0] as FileOrImageField;
        expect(field.media_library).toEqual({
          max_file_size: 600000,
          folder_support: true,
        });
      });

      it('should set media_library based on collection config if set', () => {
        const config = createMockConfig({
          media_library: {
            max_file_size: 600000,
            folder_support: true,
          },
          collections: [
            {
              name: 'foo-collection',
              label: 'Foo',
              folder: 'foo',
              media_library: {
                max_file_size: 500,
                folder_support: false,
              },
              fields: [{ name: 'title', widget: 'file' }],
            },
          ],
        });

        const collection = config.collections[0] as FolderCollection;
        expect(collection.media_library).toEqual({
          max_file_size: 500,
          folder_support: false,
        });

        const field = collection.fields[0] as FileOrImageField;
        expect(field.media_library).toEqual({
          max_file_size: 500,
          folder_support: false,
        });
      });

      it('should not override media_library if set', () => {
        const config = createMockConfig({
          media_library: {
            max_file_size: 600000,
            folder_support: true,
          },
          collections: [
            {
              name: 'foo-collection',
              label: 'Foo',
              folder: 'foo',
              media_library: {
                max_file_size: 500,
                folder_support: false,
              },
              fields: [
                {
                  name: 'title',
                  widget: 'file',
                  media_library: {
                    max_file_size: 1000,
                    folder_support: true,
                  },
                },
              ],
            },
          ],
        });

        const collection = config.collections[0] as FolderCollection;
        expect(collection.media_library).toEqual({
          max_file_size: 500,
          folder_support: false,
        });

        const field = collection.fields[0] as FileOrImageField;
        expect(field.media_library).toEqual({
          max_file_size: 1000,
          folder_support: true,
        });
      });
    });

    describe('public_folder', () => {
      it('should set public_folder based on media_folder if not set', () => {
        expect(
          createMockConfig({
            media_folder: 'path/to/media',
            collections: [],
          }).public_folder,
        ).toEqual('/path/to/media');
      });

      it('should not overwrite public_folder if set', () => {
        expect(
          createMockConfig({
            media_folder: 'path/to/media',
            public_folder: '/publib/path',
            collections: [],
          }).public_folder,
        ).toEqual('/publib/path');
        expect(
          createMockConfig({
            media_folder: 'path/to/media',
            public_folder: '',
            collections: [],
          }).public_folder,
        ).toEqual('');
      });
    });

    describe('slug', () => {
      it('should set default slug config if not set', () => {
        expect(createMockConfig({ collections: [] }).slug).toEqual({
          encoding: 'unicode',
          clean_accents: false,
          sanitize_replacement: '-',
        });
      });

      it('should not overwrite slug encoding if set', () => {
        expect(
          createMockConfig({ collections: [], slug: { encoding: 'ascii' } }).slug?.encoding,
        ).toEqual('ascii');
      });

      it('should not overwrite slug clean_accents if set', () => {
        expect(
          createMockConfig({ collections: [], slug: { clean_accents: true } }).slug?.clean_accents,
        ).toEqual(true);
      });

      it('should not overwrite slug sanitize_replacement if set', () => {
        expect(
          createMockConfig({ collections: [], slug: { sanitize_replacement: '_' } }).slug
            ?.sanitize_replacement,
        ).toEqual('_');
      });
    });

    describe('collections', () => {
      it('should strip leading slashes from collection folder', () => {
        expect(
          (
            createMockConfig({
              collections: [
                {
                  folder: '/foo',
                  fields: [{ name: 'title', widget: 'string' }],
                } as FolderCollection,
              ],
            }).collections[0] as FolderCollection
          ).folder,
        ).toEqual('foo');
      });

      it('should strip leading slashes from collection files', () => {
        expect(
          (
            createMockConfig({
              collections: [
                {
                  files: [{ file: '/foo', fields: [{ name: 'title', widget: 'string' }] }],
                } as FilesCollection,
              ],
            }).collections[0] as FilesCollection
          ).files[0].file,
        ).toEqual('foo');
      });

      describe('public_folder and media_folder', () => {
        it('should set collection public_folder based on media_folder if not set', () => {
          expect(
            createMockConfig({
              collections: [
                {
                  name: 'foo-collection',
                  label: 'Foo',
                  folder: 'foo',
                  media_folder: 'static/images/docs',
                  fields: [{ name: 'title', widget: 'string' }],
                },
              ],
            }).collections[0].public_folder,
          ).toEqual('static/images/docs');
        });

        it('should not overwrite collection public_folder if set to non empty string', () => {
          expect(
            createMockConfig({
              collections: [
                {
                  name: 'foo-collection',
                  label: 'Foo',
                  folder: 'foo',
                  media_folder: 'static/images/docs',
                  public_folder: 'images/docs',
                  fields: [{ name: 'title', widget: 'string' }],
                },
              ],
            }).collections[0].public_folder,
          ).toEqual('images/docs');
        });

        it('should not overwrite collection public_folder if set to empty string', () => {
          expect(
            createMockConfig({
              collections: [
                {
                  name: 'foo-collection',
                  label: 'Foo',
                  folder: 'foo',
                  media_folder: 'static/images/docs',
                  public_folder: '',
                  fields: [{ name: 'title', widget: 'string' }],
                },
              ],
            }).collections[0].public_folder,
          ).toEqual('');
        });

        it('should set collection media_folder and public_folder to an empty string when collection path exists, but collection media_folder does not', () => {
          const result = createMockConfig({
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                path: '{{slug}}/index',
                fields: [{ name: 'title', widget: 'string' }],
              },
            ],
          });
          expect(result.collections[0].media_folder).toEqual('');
          expect(result.collections[0].public_folder).toEqual('');
        });

        it('should set file public_folder based on media_folder if not set', () => {
          expect(
            (
              createMockConfig({
                collections: [
                  {
                    name: 'foo-collection',
                    label: 'Foo',
                    files: [
                      {
                        name: 'foo-file',
                        label: 'Foo',
                        file: 'foo',
                        media_folder: 'static/images/docs',
                        fields: [{ name: 'title', widget: 'string' }],
                      },
                    ],
                  } as FilesCollection,
                ],
              }).collections[0] as FilesCollection
            ).files[0].public_folder,
          ).toEqual('static/images/docs');
        });

        it('should not overwrite file public_folder if set', () => {
          expect(
            (
              createMockConfig({
                collections: [
                  {
                    name: 'foo-collection',
                    label: 'Foo',
                    files: [
                      {
                        name: 'foo-file',
                        label: 'Foo',
                        file: 'foo',
                        media_folder: 'static/images/docs',
                        public_folder: 'images/docs',
                        fields: [{ name: 'title', widget: 'string' }],
                      },
                    ],
                  } as FilesCollection,
                ],
              }).collections[0] as FilesCollection
            ).files[0].public_folder,
          ).toEqual('images/docs');
        });

        it('should set nested field public_folder based on media_folder if not set', () => {
          const config = createMockConfig({
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                path: '{{slug}}/index',
                fields: [
                  {
                    name: 'image',
                    widget: 'image',
                    media_folder: 'collection/static/images/docs',
                  },
                ],
              } as FolderCollection,
              {
                name: 'foo-collection',
                label: 'Foo',
                files: [
                  {
                    name: 'foo-file',
                    label: 'Foo',
                    file: 'foo',
                    fields: [
                      {
                        name: 'image',
                        widget: 'image',
                        media_folder: 'file/static/images/docs',
                      },
                    ],
                  },
                ],
              } as FilesCollection,
            ],
          });
          expect(
            ((config.collections[0] as FolderCollection).fields[0] as FileOrImageField)
              .public_folder,
          ).toEqual('collection/static/images/docs');
          expect(
            ((config.collections[1] as FilesCollection).files[0].fields[0] as FileOrImageField)
              .public_folder,
          ).toEqual('file/static/images/docs');
        });

        it('should not overwrite nested field public_folder if set', () => {
          const config = createMockConfig({
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                path: '{{slug}}/index',
                fields: [
                  {
                    name: 'image',
                    widget: 'image',
                    media_folder: 'collection/static/images/docs',
                    public_folder: 'collection/public_folder',
                  },
                ],
              } as FolderCollection,
              {
                name: 'foo-collection',
                label: 'Foo',
                files: [
                  {
                    name: 'foo-file',
                    label: 'Foo',
                    file: 'foo',
                    fields: [
                      {
                        name: 'image',
                        widget: 'image',
                        public_folder: 'file/public_folder',
                      },
                    ],
                  },
                ],
              } as FilesCollection,
            ],
          });
          expect(
            ((config.collections[0] as FolderCollection).fields[0] as FileOrImageField)
              .public_folder,
          ).toEqual('collection/public_folder');
          expect(
            ((config.collections[1] as FilesCollection).files[0].fields[0] as FileOrImageField)
              .public_folder,
          ).toEqual('file/public_folder');
        });
      });

      describe('publish', () => {
        it('should set publish to true if not set', () => {
          expect(
            (
              createMockConfig({
                collections: [
                  {
                    name: 'foo-collection',
                    label: 'Foo',
                    folder: 'foo',
                    media_folder: 'static/images/docs',
                    fields: [{ name: 'title', widget: 'string' }],
                  } as FolderCollection,
                ],
              }).collections[0] as FolderCollection
            ).publish,
          ).toEqual(true);
        });

        it('should not override existing publish config', () => {
          expect(
            (
              createMockConfig({
                collections: [
                  {
                    name: 'foo-collection',
                    label: 'Foo',
                    folder: 'foo',
                    media_folder: 'static/images/docs',
                    publish: false,
                    fields: [{ name: 'title', widget: 'string' }],
                  } as FolderCollection,
                ],
              }).collections[0] as FolderCollection
            ).publish,
          ).toEqual(false);
        });
      });

      describe('editor preview', () => {
        it('should set editor preview honoring global config before and specific config after', () => {
          const config = createMockConfig({
            editor: {
              preview: false,
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                fields: [{ name: 'title', widget: 'string' }],
                folder: 'foo',
              },
              {
                name: 'bar-collection',
                label: 'Bar',
                editor: {
                  preview: true,
                },
                fields: [{ name: 'title', widget: 'string' }],
                folder: 'bar',
              },
            ],
          });

          expect((config.collections[0].editor as DefaultEditorConfig).preview).toEqual(false);
          expect((config.collections[1].editor as DefaultEditorConfig).preview).toEqual(true);
        });
      });
    });

    describe('i18n', () => {
      it('should set root i18n on collection when collection i18n is set to true', () => {
        expect(
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                i18n: true,
                fields: [{ name: 'title', widget: 'string' }],
              },
            ],
          }).collections[0].i18n,
        ).toEqual({
          structure: 'multiple_folders',
          locales: ['en', 'de'],
          default_locale: 'en',
          enforce_required_non_default: true,
        });
      });

      it('should not set root i18n on collection when collection i18n is not set', () => {
        expect(
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                fields: [{ name: 'title', widget: 'string' }],
              },
            ],
          }).collections[0].i18n,
        ).toBeUndefined();
      });

      it('should not set root i18n on collection when collection i18n is set to false', () => {
        expect(
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                i18n: false,
                fields: [{ name: 'title', widget: 'string' }],
              },
            ],
          }).collections[0].i18n,
        ).toBeUndefined();
      });

      it('should merge root i18n on collection when collection i18n is set to an object', () => {
        expect(
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
              default_locale: 'en',
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                i18n: { locales: ['en', 'fr'], default_locale: 'fr' },
                fields: [{ name: 'title', widget: 'string' }],
              },
            ],
          }).collections[0].i18n,
        ).toEqual({
          structure: 'multiple_folders',
          locales: ['en', 'fr'],
          default_locale: 'fr',
          enforce_required_non_default: true,
        });
      });

      it('should throw when i18n structure is not single_file on files collection', () => {
        expect(() =>
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                files: [
                  {
                    name: 'file',
                    label: 'File',
                    file: 'file',
                    i18n: true,
                    fields: [{ name: 'title', widget: 'string', i18n: true }],
                  },
                ],
                i18n: true,
              },
            ],
          }),
        ).toThrow('i18n configuration for files collections is limited to single_file structure');
      });

      it('should throw when i18n structure is set to multiple_folders and contains a single file collection', () => {
        expect(() =>
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                files: [
                  {
                    name: 'file',
                    label: 'File',
                    file: 'file',
                    fields: [{ name: 'title', widget: 'string' }],
                  },
                ],
                i18n: true,
              },
            ],
          }),
        ).toThrow('i18n configuration for files collections is limited to single_file structure');
      });

      it('should throw when i18n structure is set to multiple_files and contains a single file collection', () => {
        expect(() =>
          createMockConfig({
            i18n: {
              structure: 'multiple_files',
              locales: ['en', 'de'],
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                files: [
                  {
                    name: 'file',
                    label: 'File',
                    file: 'file',
                    fields: [{ name: 'title', widget: 'string' }],
                  },
                ],
                i18n: true,
              },
            ],
          }),
        ).toThrow('i18n configuration for files collections is limited to single_file structure');
      });

      it('should set i18n value to translate on field when i18n=true for field in files collection', () => {
        expect(
          (
            createMockConfig({
              i18n: {
                structure: 'multiple_folders',
                locales: ['en', 'de'],
              },
              collections: [
                {
                  name: 'foo-collection',
                  label: 'Foo',
                  files: [
                    {
                      name: 'file',
                      label: 'File',
                      file: 'file',
                      i18n: true,
                      fields: [{ name: 'title', widget: 'string', i18n: true }],
                    },
                  ],
                  i18n: {
                    structure: 'single_file',
                  },
                } as FilesCollection,
              ],
            }).collections[0] as FilesCollection
          ).files[0].fields[0].i18n,
        ).toEqual('translate');
      });

      it('should set i18n value to translate on field when i18n=true for field', () => {
        expect(
          (
            createMockConfig({
              i18n: {
                structure: 'multiple_folders',
                locales: ['en', 'de'],
              },
              collections: [
                {
                  name: 'foo-collection',
                  label: 'Foo',
                  folder: 'foo',
                  i18n: true,
                  fields: [{ name: 'title', widget: 'string', i18n: true }],
                } as FolderCollection,
              ],
            }).collections[0] as FolderCollection
          ).fields[0].i18n,
        ).toEqual('translate');
      });

      it('should set i18n value to none on field when i18n=false for field', () => {
        expect(
          (
            createMockConfig({
              i18n: {
                structure: 'multiple_folders',
                locales: ['en', 'de'],
              },
              collections: [
                {
                  name: 'foo-collection',
                  label: 'Foo',
                  folder: 'foo',
                  i18n: true,
                  fields: [{ name: 'title', widget: 'string', i18n: false }],
                } as FolderCollection,
              ],
            }).collections[0] as FolderCollection
          ).fields[0].i18n,
        ).toEqual('none');
      });

      it('should throw is default locale is missing from root i18n config', () => {
        expect(() =>
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
              default_locale: 'fr',
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                fields: [{ name: 'title', widget: 'string' }],
              },
            ],
          }),
        ).toThrow("i18n locales 'en, de' are missing the default locale fr");
      });

      it('should throw if default locale is missing from collection i18n config', () => {
        expect(() =>
          createMockConfig({
            i18n: {
              structure: 'multiple_folders',
              locales: ['en', 'de'],
            },
            collections: [
              {
                name: 'foo-collection',
                label: 'Foo',
                folder: 'foo',
                i18n: {
                  default_locale: 'fr',
                },
                fields: [{ name: 'title', widget: 'string' }],
              },
            ],
          }),
        ).toThrow("i18n locales 'en, de' are missing the default locale fr");
      });
    });
  });

  describe('detectProxyServer', () => {
    function assetFetchCalled(url = 'http://localhost:8081/api/v1') {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'info' }),
      });
    }

    beforeEach(() => {
      delete (window as any).location;
    });

    it('should return empty object when not on localhost', async () => {
      (window as any).location = { hostname: 'www.netlify.com', pathname: '/' };
      global.fetch = jest.fn();
      await expect(detectProxyServer()).resolves.toEqual({});

      expect(global.fetch).toHaveBeenCalledTimes(0);
    });

    it('should return empty object when fetch returns an error', async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      global.fetch = jest.fn().mockRejectedValue(new Error());
      await expect(detectProxyServer(true)).resolves.toEqual({});

      assetFetchCalled();
    });

    it('should return empty object when fetch returns an invalid response', async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      global.fetch = jest
        .fn()
        .mockResolvedValue({ json: jest.fn().mockResolvedValue({ repo: [] }) });
      await expect(detectProxyServer(true)).resolves.toEqual({});

      assetFetchCalled();
    });

    it('should return result object when fetch returns a valid response', async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          repo: 'test-repo',
          publish_modes: ['simple', 'editorial_workflow'],
          type: 'local_git',
        }),
      });
      await expect(detectProxyServer(true)).resolves.toEqual({
        proxyUrl: 'http://localhost:8081/api/v1',
        publish_modes: ['simple', 'editorial_workflow'],
        type: 'local_git',
      });

      assetFetchCalled();
    });

    it('should use local_backend url', async () => {
      const url = 'http://localhost:8082/api/v1';
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          repo: 'test-repo',
          publish_modes: ['simple', 'editorial_workflow'],
          type: 'local_git',
        }),
      });
      await expect(detectProxyServer({ url })).resolves.toEqual({
        proxyUrl: url,
        publish_modes: ['simple', 'editorial_workflow'],
        type: 'local_git',
      });

      assetFetchCalled(url);
    });

    it('should use local_backend allowed_hosts', async () => {
      const allowed_hosts = ['192.168.0.1'];
      (window as any).location = { hostname: '192.168.0.1', pathname: '/' };
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          repo: 'test-repo',
          publish_modes: ['simple', 'editorial_workflow'],
          type: 'local_git',
        }),
      });
      await expect(detectProxyServer({ allowed_hosts })).resolves.toEqual({
        proxyUrl: 'http://192.168.0.1:8081/api/v1',
        publish_modes: ['simple', 'editorial_workflow'],
        type: 'local_git',
      });

      assetFetchCalled('http://192.168.0.1:8081/api/v1');
    });
  });

  describe('handleLocalBackend', () => {
    beforeEach(() => {
      delete (window as any).location;
    });

    it('should not replace backend config when proxy is not detected', async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      global.fetch = jest.fn().mockRejectedValue(new Error());

      const config = createMockConfig({
        local_backend: true,
        backend: { name: 'github' },
        collections: [],
      }) as Config;
      const actual = await handleLocalBackend(config);

      expect(actual).toEqual(config);
    });

    it('should replace backend config when proxy is detected', async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          repo: 'test-repo',
          publish_modes: ['simple', 'editorial_workflow'],
          type: 'local_git',
        }),
      });

      const config = createMockConfig({
        local_backend: true,
        backend: { name: 'github' },
        collections: [],
      }) as Config;
      const actual = await handleLocalBackend(config);

      expect(actual.backend).toEqual({
        name: 'proxy',
        proxy_url: 'http://localhost:8081/api/v1',
      });
    });

    it('should replace publish mode when not supported by proxy', async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          repo: 'test-repo',
          publish_modes: ['simple'],
          type: 'local_fs',
        }),
      });

      const config = createMockConfig({
        local_backend: true,
        publish_mode: 'editorial_workflow',
        backend: { name: 'github' },
        collections: [],
      }) as Config;
      const actual = await handleLocalBackend(config);

      expect(actual.publish_mode).toBe('simple');
    });
  });

  describe('loadConfig', () => {
    let yamlParseMock: jest.Mock;

    beforeEach(() => {
      document.querySelector = jest.fn();
      global.fetch = jest.fn();
      yamlParseMock = yaml.parse as jest.Mock;
    });

    it(`should fetch default 'config.yml'`, async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      const dispatch = jest.fn();

      const content = stripIndent`
        backend:
          repo: test-repo
      `;

      yamlParseMock.mockReturnValue({
        backend: {
          repo: 'test-repo',
        },
      });

      (global.fetch as jest.Mock).mockResolvedValue({
        status: 200,
        text: () => Promise.resolve(content),
        headers: new Headers(),
      });
      const response = await loadConfig(undefined, () => {});
      if (typeof response === 'function') {
        await response(dispatch);
      }

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('http://localhost/config.yml', {
        credentials: 'same-origin',
      });

      expect(yamlParseMock).toHaveBeenCalledWith(content, {
        maxAliasCount: -1,
        prettyErrors: true,
        merge: true,
      });

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith({ type: 'CONFIG_REQUEST' });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CONFIG_SUCCESS',
        payload: {
          config: {
            backend: { repo: 'test-repo' },
            collections: [],
            publish_mode: 'simple',
            slug: { encoding: 'unicode', clean_accents: false, sanitize_replacement: '-' },
            public_folder: '/',
          },
          originalConfig: {
            backend: {
              repo: 'test-repo',
            },
          },
        },
      });
    });

    it(`should fetch from custom 'config.yml'`, async () => {
      (window as any).location = {
        hostname: 'localhost',
        origin: 'http://localhost',
        pathname: '/',
      };
      const dispatch = jest.fn();

      const content = stripIndent`
        backend:
          repo: github
      `;

      yamlParseMock.mockReturnValue({
        backend: {
          repo: 'github',
        },
      });

      (document.querySelector as jest.Mock).mockReturnValue({
        type: 'text/yaml',
        href: 'custom-config.yml',
      });
      (global.fetch as jest.Mock).mockResolvedValue({
        status: 200,
        text: () => Promise.resolve(content),
        headers: new Headers({
          'Content-Type': 'text/plain',
        }),
      });
      const response = await loadConfig(undefined, () => {});
      if (typeof response === 'function') {
        await response(dispatch);
      }

      expect(document.querySelector).toHaveBeenCalledTimes(1);
      expect(document.querySelector).toHaveBeenCalledWith('link[rel="cms-config-url"]');

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('custom-config.yml', {
        credentials: 'same-origin',
      });

      expect(yamlParseMock).toHaveBeenCalledWith(content, {
        maxAliasCount: -1,
        prettyErrors: true,
        merge: true,
      });

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'CONFIG_REQUEST' });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'CONFIG_SUCCESS',
        payload: {
          config: {
            backend: { repo: 'github' },
            collections: [],
            publish_mode: 'simple',
            slug: { encoding: 'unicode', clean_accents: false, sanitize_replacement: '-' },
            public_folder: '/',
          },
          originalConfig: {
            backend: {
              repo: 'github',
            },
          },
        },
      });
    });

    it(`should throw on failure to fetch 'config.yml'`, async () => {
      const dispatch = jest.fn();

      (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
      const response = await loadConfig(undefined, () => {});
      if (typeof response === 'function') {
        await expect(() => response(dispatch)).rejects.toEqual(
          new Error('Failed to load config.yml (Failed to fetch)'),
        );
      }

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith({ type: 'CONFIG_REQUEST' });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CONFIG_FAILURE',
        error: 'Error loading config',
        payload: new Error('Failed to load config.yml (Failed to fetch)'),
      });
    });
  });
});
