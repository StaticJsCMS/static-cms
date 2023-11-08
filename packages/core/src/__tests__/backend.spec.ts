import { createMockFolderCollectionWithDefaults } from '@staticcms/test/data/collections.mock';
import { createMockConfig, createMockConfigWithDefaults } from '@staticcms/test/data/config.mock';
import {
  createMockEntry,
  createMockExpandedEntry,
  createMockUnpublishedEntry,
} from '@staticcms/test/data/entry.mock';
import { applyDefaults } from '../actions/config';
import {
  Backend,
  expandSearchEntries,
  extractSearchFields,
  mergeExpandedEntries,
  resolveBackend,
} from '../backend';
import { WorkflowStatus } from '../constants/publishModes';
import { getBackend } from '../lib/registry';
import { sanitizeChar, sanitizeSlug } from '../lib/urlHelper';
import { asyncLock } from '../lib/util/asyncLock';
import localForage from '../lib/util/localForage';

import type {
  BackendClass,
  BackendInitializer,
  CollectionWithDefaults,
  ConfigWithDefaults,
} from '../interface';
import type { RootState } from '../store';
import type { AssetProxy } from '../valueObjects';

jest.mock('../lib/registry');
jest.mock('../lib/util/localForage');
jest.mock('../lib/util/asyncLock');
jest.mock('../lib/urlHelper');

describe('Backend', () => {
  describe('filterEntries', () => {
    let backend: Backend;
    let collection: CollectionWithDefaults;

    beforeEach(() => {
      (getBackend as jest.Mock).mockReturnValue({
        init: jest.fn(),
      });

      collection = createMockFolderCollectionWithDefaults();

      backend = resolveBackend(
        createMockConfig({
          backend: {
            name: 'git-gateway',
          },
          collections: [collection],
        }),
      );
    });

    it('filters string values', () => {
      const result = backend.filterEntries(
        {
          entries: [
            createMockEntry({
              data: {
                testField: 'testValue',
              },
            }),
            createMockEntry({
              data: {
                testField: 'testValue2',
              },
            }),
          ],
        },
        { field: 'testField', value: 'testValue' },
      );

      expect(result.length).toBe(1);
    });

    it('filters number values', () => {
      const result = backend.filterEntries(
        {
          entries: [
            createMockEntry({
              data: {
                testField: 42,
              },
            }),
            createMockEntry({
              data: {
                testField: 5,
              },
            }),
          ],
        },
        { field: 'testField', value: 42 },
      );

      expect(result.length).toBe(1);
    });

    it('filters boolean values', () => {
      const result = backend.filterEntries(
        {
          entries: [
            createMockEntry({
              data: {
                testField: false,
              },
            }),
            createMockEntry({
              data: {
                testField: true,
              },
            }),
          ],
        },
        { field: 'testField', value: false },
      );

      expect(result.length).toBe(1);
    });

    it('filters list values', () => {
      const result = backend.filterEntries(
        {
          entries: [
            createMockEntry({
              data: {
                testField: ['valueOne', 'valueTwo', 'testValue'],
              },
            }),
            createMockEntry({
              data: {
                testField: ['valueThree'],
              },
            }),
          ],
        },
        { field: 'testField.*', value: 'testValue' },
      );

      expect(result.length).toBe(1);
    });
  });

  describe('getLocalDraftBackup', () => {
    (asyncLock as jest.Mock).mockImplementation(() => ({ acquire: jest.fn(), release: jest.fn() }));

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return empty object on no item', async () => {
      const implementation = {} as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
      }) as CollectionWithDefaults;

      const backend = new Backend(initializer, {
        config: createMockConfig({ collections: [collection] }),
        backendName: 'github',
      });

      const slug = 'slug';

      (localForage.getItem as jest.Mock).mockReturnValue(null);

      const result = await backend.getLocalDraftBackup(collection, slug);

      expect(result).toEqual({ entry: null });
      expect(localForage.getItem).toHaveBeenCalledTimes(1);
      expect(localForage.getItem).toHaveBeenCalledWith('backup.posts.slug');
    });

    it('should return empty object on item with empty content', async () => {
      const implementation = {} as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
      }) as CollectionWithDefaults;

      const backend = new Backend(initializer, {
        config: createMockConfig({ collections: [collection] }),
        backendName: 'github',
      });

      const slug = 'slug';

      (localForage.getItem as jest.Mock).mockReturnValue({ raw: '' });

      const result = await backend.getLocalDraftBackup(collection, slug);

      expect(result).toEqual({ entry: null });
      expect(localForage.getItem).toHaveBeenCalledTimes(1);
      expect(localForage.getItem).toHaveBeenCalledWith('backup.posts.slug');
    });

    it('should return backup entry, empty media files and assets when only raw property was saved', async () => {
      const implementation = {} as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
        format: 'json-frontmatter',
      }) as CollectionWithDefaults;

      const backend = new Backend(initializer, {
        config: createMockConfig({ collections: [collection] }),
        backendName: 'github',
      });

      const slug = 'slug';

      (localForage.getItem as jest.Mock).mockReturnValue({
        raw: '{\n"title": "Hello World"\n}\n',
      });

      const result = await backend.getLocalDraftBackup(collection, slug);

      expect(result).toEqual({
        entry: {
          author: '',
          mediaFiles: [],
          collection: 'posts',
          slug: 'slug',
          path: '',
          partial: false,
          raw: '{\n"title": "Hello World"\n}\n',
          data: { title: 'Hello World' },
          meta: undefined,
          i18n: {},
          label: null,
          isModification: null,
          status: undefined,
          updatedOn: '',
        },
      });
      expect(localForage.getItem).toHaveBeenCalledTimes(1);
      expect(localForage.getItem).toHaveBeenCalledWith('backup.posts.slug');
    });

    it('should return backup entry, media files and assets when all were backed up', async () => {
      const implementation = {} as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
        format: 'json-frontmatter',
      }) as CollectionWithDefaults;

      const backend = new Backend(initializer, {
        config: createMockConfig({ collections: [collection] }),
        backendName: 'github',
      });

      const slug = 'slug';

      (localForage.getItem as jest.Mock).mockReturnValue({
        raw: '{\n"title": "Hello World"\n}\n',
        mediaFiles: [{ id: '1' }],
      });

      const result = await backend.getLocalDraftBackup(collection, slug);

      expect(result).toEqual({
        entry: {
          author: '',
          mediaFiles: [{ id: '1' }],
          collection: 'posts',
          slug: 'slug',
          path: '',
          partial: false,
          raw: '{\n"title": "Hello World"\n}\n',
          data: { title: 'Hello World' },
          meta: undefined,
          i18n: {},
          label: null,
          isModification: null,
          status: undefined,
          updatedOn: '',
        },
      });
      expect(localForage.getItem).toHaveBeenCalledTimes(1);
      expect(localForage.getItem).toHaveBeenCalledWith('backup.posts.slug');
    });
  });

  describe('persistLocalDraftBackup', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should not persist empty entry', async () => {
      const implementation = {} as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
        format: 'json-frontmatter',
      }) as CollectionWithDefaults;

      const config = applyDefaults(createMockConfig({ collections: [collection] }));

      const backend = new Backend(initializer, {
        config,
        backendName: 'github',
      });

      backend.entryToRaw = jest.fn().mockReturnValue('');

      const slug = 'slug';

      const entry = createMockEntry({
        slug,
        data: {
          some: 'value',
        },
      });

      await backend.persistLocalDraftBackup(entry, collection, config);

      expect(backend.entryToRaw).toHaveBeenCalledTimes(1);
      expect(backend.entryToRaw).toHaveBeenCalledWith(collection, entry, config);
      expect(localForage.setItem).toHaveBeenCalledTimes(0);
    });

    it('should persist non empty entry', async () => {
      const implementation = {} as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
        format: 'json-frontmatter',
      }) as CollectionWithDefaults;

      const config = applyDefaults(createMockConfig({ collections: [collection] }));

      const backend = new Backend(initializer, {
        config,
        backendName: 'github',
      });

      backend.entryToRaw = jest.fn().mockReturnValue('content');

      const slug = 'slug';

      const entry = createMockEntry({
        slug,
        path: 'content/posts/entry.md',
        mediaFiles: [{ id: '1', name: 'file.png', path: '/path/to/file.png' }],
        data: {
          some: 'value',
        },
      });

      await backend.persistLocalDraftBackup(entry, collection, config);

      expect(backend.entryToRaw).toHaveBeenCalledTimes(1);
      expect(backend.entryToRaw).toHaveBeenCalledWith(collection, entry, config);
      expect(localForage.setItem).toHaveBeenCalledTimes(2);
      expect(localForage.setItem).toHaveBeenCalledWith('backup.posts.slug', {
        mediaFiles: [{ id: '1', name: 'file.png', path: '/path/to/file.png' }],
        path: 'content/posts/entry.md',
        raw: 'content',
      });
      expect(localForage.setItem).toHaveBeenCalledWith('backup', 'content');
    });
  });

  describe('persistMedia', () => {
    it('should persist media', async () => {
      const persistMediaResult = {};

      const implementation = {
        persistMedia: jest.fn().mockResolvedValue(persistMediaResult),
      } as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
      }) as CollectionWithDefaults;

      const config = createMockConfig({ backend: { name: 'github' }, collections: [collection] });

      const backend = new Backend(initializer, { config, backendName: config.backend.name });
      const user = { login: 'login', name: 'name' };
      backend.currentUser = jest.fn().mockResolvedValue(user);

      const file = { path: 'static/media/image.png' } as AssetProxy;

      const result = await backend.persistMedia(config, file);
      expect(result).toBe(persistMediaResult);
      expect(implementation.persistMedia).toHaveBeenCalledTimes(1);
      expect(implementation.persistMedia).toHaveBeenCalledWith(
        { path: 'static/media/image.png' },
        { commitMessage: 'Upload “static/media/image.png”' },
      );
    });
  });

  describe('unpublishedEntry', () => {
    it('should return unpublished entry', async () => {
      const unpublishedEntryResult = createMockUnpublishedEntry({
        diffs: [
          { id: 'index.md', path: 'src/posts/index.md', newFile: false },
          { id: 'netlify.png', path: 'netlify.png', newFile: true },
        ],
      });

      const implementation = {
        unpublishedEntry: jest.fn().mockResolvedValue(unpublishedEntryResult),
        unpublishedEntryDataFile: jest.fn().mockResolvedValueOnce('{\n"title": "Hello World"\n}\n'),
        unpublishedEntryMediaFile: jest.fn().mockResolvedValueOnce({ id: '1' }),
      } as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
        folder: 'src/posts',
        fields: [],
      }) as CollectionWithDefaults;

      const config = createMockConfig({
        media_folder: 'static/images',
        collections: [collection],
      });

      const backend = new Backend(initializer, { config, backendName: 'github' });

      const state = {
        config: { config },
        integrations: {},
        mediaLibrary: {},
      } as unknown as RootState;

      const slug = 'slug';

      const result = await backend.unpublishedEntry(state, collection, slug);
      expect(result).toEqual({
        author: '',
        collection: 'posts',
        slug: 'unpublished-entry.md',
        path: 'src/posts/index.md',
        partial: false,
        raw: '{\n"title": "Hello World"\n}\n',
        data: { title: 'Hello World' },
        meta: { path: 'src/posts/index.md' },
        i18n: {},
        label: null,
        isModification: true,
        mediaFiles: [{ id: '1', draft: true }],
        status: WorkflowStatus.DRAFT,
        updatedOn: '20230-02-09T00:00:00.000Z',
        openAuthoring: false,
      });
    });
  });

  describe('generateUniqueSlug', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should return unique slug when entry doesn't exist", async () => {
      (sanitizeSlug as jest.Mock).mockReturnValue('some-post-title');

      const implementation = {
        getEntry: jest.fn(() => Promise.resolve()),
      } as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
        fields: [
          {
            name: 'title',
            widget: 'string',
          },
        ],
        folder: 'posts',
        slug: '{{slug}}',
        path: 'sub_dir/{{slug}}',
      }) as unknown as CollectionWithDefaults;

      const entry = createMockEntry({
        data: {
          title: 'some post title',
        },
      });

      const config = createMockConfig({ collections: [collection] });

      const backend = new Backend(initializer, {
        config,
        backendName: 'github',
      });

      await expect(
        backend.generateUniqueSlug(collection, entry, config, [], undefined),
      ).resolves.toBe('sub_dir/some-post-title');
    });

    it('should return unique slug when entry exists', async () => {
      (sanitizeSlug as jest.Mock).mockReturnValue('some-post-title');
      (sanitizeChar as jest.Mock).mockReturnValue('-');

      const implementation = {
        getEntry: jest.fn(() => Promise.resolve()),
      } as unknown as BackendClass;

      const initializer = {
        init: jest.fn(() => implementation),
      } as BackendInitializer;

      (getBackend as jest.Mock).mockReturnValue(initializer);

      (implementation.getEntry as jest.Mock).mockResolvedValueOnce({ data: 'data' });

      const collection = createMockFolderCollectionWithDefaults({
        name: 'posts',
        fields: [
          {
            name: 'title',
            widget: 'string',
          },
        ],
        folder: 'posts',
        slug: '{{slug}}',
        path: 'sub_dir/{{slug}}',
      }) as unknown as CollectionWithDefaults;

      const entry = createMockEntry({
        data: {
          title: 'some post title',
        },
      });

      const config = createMockConfig({ collections: [collection] });

      const backend = new Backend(initializer, { config, backendName: 'github' });

      await expect(
        backend.generateUniqueSlug(collection, entry, config, [], undefined),
      ).resolves.toBe('sub_dir/some-post-title-1');
    });
  });

  describe('extractSearchFields', () => {
    it('should extract slug', () => {
      expect(
        extractSearchFields(['slug'])(createMockEntry({ slug: 'entry-slug', data: {} })),
      ).toEqual(' entry-slug');
    });

    it('should extract path', () => {
      expect(
        extractSearchFields(['path'])(createMockEntry({ path: 'entry-path', data: {} })),
      ).toEqual(' entry-path');
    });

    it('should extract fields', () => {
      expect(
        extractSearchFields(['title', 'order'])(
          createMockEntry({ data: { title: 'Entry Title', order: 5 } }),
        ),
      ).toEqual(' Entry Title 5');
    });

    it('should extract nested fields', () => {
      expect(
        extractSearchFields(['nested.title'])(
          createMockEntry({ data: { nested: { title: 'nested title' } } }),
        ),
      ).toEqual(' nested title');
    });
  });

  describe('search/query', () => {
    const collections = [
      createMockFolderCollectionWithDefaults({
        name: 'posts',
        folder: 'posts',
        fields: [
          { name: 'title', widget: 'string' },
          { name: 'short_title', widget: 'string' },
          { name: 'author', widget: 'string' },
          { name: 'description', widget: 'string' },
          { name: 'nested', widget: 'object', fields: [{ name: 'title', widget: 'string' }] },
        ],
      }),
      createMockFolderCollectionWithDefaults({
        name: 'pages',
        folder: 'pages',
        fields: [
          { name: 'title', widget: 'string' },
          { name: 'short_title', widget: 'string' },
          { name: 'author', widget: 'string' },
          { name: 'description', widget: 'string' },
          { name: 'nested', widget: 'object', fields: [{ name: 'title', widget: 'string' }] },
        ],
      }),
    ] as unknown as CollectionWithDefaults[];

    const posts = [
      createMockEntry({
        path: 'posts/find-me.md',
        slug: 'find-me',
        data: {
          title: 'find me by title',
          short_title: 'find me by short title',
          author: 'find me by author',
          description: 'find me by description',
          nested: { title: 'find me by nested title' },
        },
      }),
      createMockEntry({ path: 'posts/not-me.md', slug: 'not-me', data: { title: 'not me' } }),
    ];

    const pages = [
      createMockEntry({
        path: 'pages/find-me.md',
        slug: 'find-me',
        data: {
          title: 'find me by title',
          short_title: 'find me by short title',
          author: 'find me by author',
          description: 'find me by description',
          nested: { title: 'find me by nested title' },
        },
      }),
      createMockEntry({ path: 'pages/not-me.md', slug: 'not-me', data: { title: 'not me' } }),
    ];

    const files = [
      createMockEntry({
        path: 'files/file1.md',
        slug: 'file1',
        data: {
          author: 'find me by author',
        },
      }),
      createMockEntry({
        path: 'files/file2.md',
        slug: 'file2',
        data: {
          other: 'find me by other',
        },
      }),
    ];

    let config: ConfigWithDefaults;

    const implementation = {
      listAllEntries: jest.fn(),
    } as unknown as BackendClass;

    const initializer = {
      init: jest.fn(() => implementation),
    } as BackendInitializer;

    let backend: Backend;
    beforeEach(() => {
      jest.clearAllMocks();

      (getBackend as jest.Mock).mockReturnValue(initializer);

      config = createMockConfigWithDefaults({ collections });

      backend = new Backend(initializer, { config, backendName: 'github' });
      (backend.listAllEntries as jest.Mock) = jest.fn(collection => {
        switch (collection.name) {
          case 'posts':
            return Promise.resolve(posts);
          case 'pages':
            return Promise.resolve(pages);
          case 'files':
            return Promise.resolve(files);
          default:
            return Promise.resolve([]);
        }
      });
    });

    it('should search collections by title', async () => {
      const results = await backend.search(collections, 'find me by title');

      expect(results).toEqual({
        entries: [posts[0], pages[0]],
        pagination: 1,
      });
    });

    it('should search collections by short title', async () => {
      const results = await backend.search(collections, 'find me by short title');

      expect(results).toEqual({
        entries: [posts[0], pages[0]],
        pagination: 1,
      });
    });

    it('should search collections by author', async () => {
      const results = await backend.search(collections, 'find me by author');

      expect(results).toEqual({
        entries: [posts[0], pages[0]],
        pagination: 1,
      });
    });

    it('should search collections by summary description', async () => {
      const results = await backend.search(
        collections.map(c => ({ ...c, summary: '{{description}}' })),
        'find me by description',
      );

      expect(results).toEqual({
        entries: [posts[0], pages[0]],
        pagination: 1,
      });
    });

    it('should search in file collection using top level fields', async () => {
      const collections = [
        createMockFolderCollectionWithDefaults({
          name: 'files',
          files: [
            {
              name: 'file1',
              label: 'File 1',
              file: 'file1.json',
              fields: [{ name: 'author', widget: 'string' }],
            },
            {
              name: 'file2',
              label: 'File 2',
              file: 'file2.json',
              fields: [{ name: 'other', widget: 'string' }],
            },
          ],
        }),
      ] as unknown as CollectionWithDefaults[];

      expect(await backend.search(collections, 'find me by author')).toEqual({
        entries: [files[0]],
        pagination: 1,
      });
      expect(await backend.search(collections, 'find me by other')).toEqual({
        entries: [files[1]],
        pagination: 1,
      });
    });

    it('should query collections by title', async () => {
      const results = await backend.query(collections[0], ['title'], 'find me by title');

      expect(results).toEqual({
        hits: [posts[0]],
        query: 'find me by title',
      });
    });

    it('should query collections by slug', async () => {
      const results = await backend.query(collections[0], ['slug'], 'find-me');

      expect(results).toEqual({
        hits: [posts[0]],
        query: 'find-me',
      });
    });

    it('should query collections by path', async () => {
      const results = await backend.query(collections[0], ['path'], 'posts/find-me.md');

      expect(results).toEqual({
        hits: [posts[0]],
        query: 'posts/find-me.md',
      });
    });

    it('should query collections by nested field', async () => {
      const results = await backend.query(
        collections[0],
        ['nested.title'],
        'find me by nested title',
      );

      expect(results).toEqual({
        hits: [posts[0]],
        query: 'find me by nested title',
      });
    });
  });

  describe('expandSearchEntries', () => {
    it('should expand entry with list to multiple entries', () => {
      const entry = createMockEntry({
        data: {
          field: {
            nested: {
              list: [
                { id: 1, name: '1' },
                { id: 2, name: '2' },
              ],
            },
          },
          list: [1, 2],
        },
      });

      expect(expandSearchEntries([entry], ['list.*', 'field.nested.list.*.name'])).toEqual([
        expect.objectContaining({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'list.0',
        }),
        expect.objectContaining({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'list.1',
        }),
        expect.objectContaining({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'field.nested.list.0.name',
        }),
        expect.objectContaining({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'field.nested.list.1.name',
        }),
      ]);
    });
  });

  describe('mergeExpandedEntries', () => {
    it('should merge entries and filter data', () => {
      const expanded = [
        createMockExpandedEntry({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                  { id: 3, name: '3' },
                  { id: 4, name: '4' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'field.nested.list.0.name',
        }),
        createMockExpandedEntry({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                  { id: 3, name: '3' },
                  { id: 4, name: '4' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'field.nested.list.3.name',
        }),
      ];

      expect(mergeExpandedEntries(expanded)).toEqual([
        expect.objectContaining({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 4, name: '4' },
                ],
              },
            },
            list: [1, 2],
          },
        }),
      ]);
    });

    it('should merge entries and filter data based on different fields', () => {
      const expanded = [
        createMockExpandedEntry({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                  { id: 3, name: '3' },
                  { id: 4, name: '4' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'field.nested.list.0.name',
        }),
        createMockExpandedEntry({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                  { id: 3, name: '3' },
                  { id: 4, name: '4' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'field.nested.list.3.name',
        }),
        createMockExpandedEntry({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 2, name: '2' },
                  { id: 3, name: '3' },
                  { id: 4, name: '4' },
                ],
              },
            },
            list: [1, 2],
          },
          field: 'list.1',
        }),
      ];

      expect(mergeExpandedEntries(expanded)).toEqual([
        expect.objectContaining({
          data: {
            field: {
              nested: {
                list: [
                  { id: 1, name: '1' },
                  { id: 4, name: '4' },
                ],
              },
            },
            list: [2],
          },
        }),
      ]);
    });

    it('should merge entries and keep sort by entry index', () => {
      const expanded = [
        createMockExpandedEntry({
          data: {
            list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
          field: 'list.5',
        }),
        createMockExpandedEntry({
          data: {
            list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
          field: 'list.0',
        }),
        createMockExpandedEntry({
          data: {
            list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
          field: 'list.11',
        }),
        createMockExpandedEntry({
          data: {
            list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
          field: 'list.1',
        }),
      ];

      expect(mergeExpandedEntries(expanded)).toEqual([
        expect.objectContaining({
          data: {
            list: [5, 0, 11, 1],
          },
        }),
      ]);
    });
  });
});
