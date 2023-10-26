/**
 * @jest-environment jsdom
 */
import { oneLine, stripIndent } from 'common-tags';

import Cursor from '@staticcms/core/lib/util/Cursor';
import {
  createMockFilesCollectionWithDefaults,
  createMockFolderCollectionWithDefaults,
} from '@staticcms/test/data/collections.mock';
import { createMockConfig, createMockConfigWithDefaults } from '@staticcms/test/data/config.mock';
import mockFetch from '@staticcms/test/mockFetch';
import AuthenticationPage from '../AuthenticationPage';
import GitLab from '../implementation';

import type {
  Backend as BackendType,
  LocalStorageAuthStore as LocalStorageAuthStoreType,
} from '@staticcms/core/backend';
import type {
  ConfigWithDefaults,
  FilesCollectionWithDefaults,
  FolderCollectionWithDefaults,
} from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { FetchMethod } from '@staticcms/test/mockFetch';

jest.mock('@staticcms/core/backend');

const { Backend, LocalStorageAuthStore } = jest.requireActual('@staticcms/core/backend') as {
  Backend: typeof BackendType;
  LocalStorageAuthStore: typeof LocalStorageAuthStoreType;
};

function generateEntries(path: string, length: number) {
  const entries = Array.from({ length }, (_val, idx) => {
    const count = idx + 1;
    const id = `00${count}`.slice(-3);
    const fileName = `test${id}.md`;
    return { id, fileName, filePath: `${path}/${fileName}` };
  });

  return {
    tree: entries.map(({ id, fileName, filePath }) => ({
      id: `d8345753a1d935fa47a26317a503e73e1192d${id}`,
      name: fileName,
      type: 'blob',
      path: filePath,
      mode: '100644',
    })),
    files: entries.reduce(
      (acc, { id, filePath }) => ({
        ...acc,
        [filePath]: stripIndent`
        ---
        title: test ${id}
        ---
        # test ${id}
      `,
      }),
      {},
    ),
  };
}

const manyEntries = generateEntries('many-entries', 500);

interface TreeEntry {
  id: string;
  name: string;
  type: string;
  path: string;
  mode: string;
}

interface MockRepo {
  tree: Record<string, TreeEntry[]>;
  files: Record<string, string>;
}

const mockRepo: MockRepo = {
  tree: {
    '/': [
      {
        id: '5d0620ebdbc92068a3e866866e928cc373f18429',
        name: 'content',
        type: 'tree',
        path: 'content',
        mode: '040000',
      },
    ],
    content: [
      {
        id: 'b1a200e48be54fde12b636f9563d659d44c206a5',
        name: 'test1.md',
        type: 'blob',
        path: 'content/test1.md',
        mode: '100644',
      },
      {
        id: 'd8345753a1d935fa47a26317a503e73e1192d623',
        name: 'test2.md',
        type: 'blob',
        path: 'content/test2.md',
        mode: '100644',
      },
    ],
    'many-entries': manyEntries.tree,
  },
  files: {
    'content/test1.md': stripIndent`
      {
      "title": "test"
      }
      # test
    `,
    'content/test2.md': stripIndent`
      {
      "title": "test2"
      }
      # test 2
    `,
    ...manyEntries.files,
  },
};

const resp: Record<string, Record<string, object | Promise<object>>> = {
  user: {
    success: {
      id: 1,
    },
  },
  branch: {
    success: {
      name: 'main',
      commit: {
        id: 1,
      },
    },
  },
  project: {
    success: {
      permissions: {
        project_access: {
          access_level: 30,
        },
      },
    },
    readOnly: {
      permissions: {
        project_access: {
          access_level: 10,
        },
      },
    },
  },
};

function mockApi(apiRoot: string) {
  return mockFetch(apiRoot);
}

describe('gitlab backend', () => {
  const apiRoot = 'https://gitlab.com/api/v4';
  const api = mockApi(apiRoot);

  let authStore: InstanceType<typeof LocalStorageAuthStoreType>;
  const repo = 'foo/bar';

  const collectionContentConfig = createMockFolderCollectionWithDefaults({
    name: 'foo',
    folder: 'content',
    format: 'json-frontmatter',
    fields: [{ name: 'title', widget: 'string' }],
  }) as unknown as FolderCollectionWithDefaults;

  const collectionManyEntriesConfig = createMockFolderCollectionWithDefaults({
    name: 'foo',
    folder: 'many-entries',
    format: 'json-frontmatter',
    fields: [{ name: 'title', widget: 'string' }],
  }) as unknown as FolderCollectionWithDefaults;

  const collectionFilesConfig = createMockFilesCollectionWithDefaults({
    name: 'foo',
    files: [
      {
        label: 'foo',
        name: 'foo',
        file: 'content/test1.json',
        fields: [{ name: 'title', widget: 'string' }],
      },
      {
        label: 'bar',
        name: 'bar',
        file: 'content/test2.json',
        fields: [{ name: 'title', widget: 'string' }],
      },
    ],
  }) as unknown as FilesCollectionWithDefaults;

  const defaultConfig = createMockConfigWithDefaults({
    backend: {
      name: 'gitlab',
      repo,
    },
    collections: [],
  }) as ConfigWithDefaults;

  const mockCredentials = { token: 'MOCK_TOKEN' };
  const expectedRepo = encodeURIComponent(repo);
  const expectedRepoUrl = `/projects/${expectedRepo}`;

  function resolveBackend(config: ConfigWithDefaults) {
    authStore = new LocalStorageAuthStore();
    return new Backend(
      {
        init: (...args) => new GitLab(...args),
      },
      {
        backendName: 'gitlab',
        config,
        authStore,
      },
    );
  }

  interface InterceptAuthOptions {
    userResponse?: (typeof resp)['user'][string];
    projectResponse?: (typeof resp)['project'][string];
  }

  function interceptAuth({ userResponse, projectResponse }: InterceptAuthOptions = {}) {
    api
      .when('GET', '/user')
      .query(true)
      .reply({ status: 200, json: userResponse ?? resp.user.success });

    api
      .when('GET', expectedRepoUrl)
      .query(true)
      .reply({ status: 200, json: projectResponse || resp.project.success });
  }

  function interceptBranch({ branch = 'main' } = {}) {
    api
      .when('GET', `${expectedRepoUrl}/repository/branches/${encodeURIComponent(branch)}`)
      .query(true)
      .reply({ status: 200, json: resp.branch.success });
  }

  function parseQuery(uri: string) {
    const query = uri.split('?')[1];
    if (!query) {
      return {};
    }
    return query.split('&').reduce(
      (acc, q) => {
        const [key, value] = q.split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  interface CreateHeadersOptions {
    basePath: string;
    path: string;
    page: string;
    perPage: string;
    pageCount: string;
    totalCount: string;
  }

  function createHeaders({
    basePath,
    path,
    page,
    perPage,
    pageCount,
    totalCount,
  }: CreateHeadersOptions) {
    const pageNum = parseInt(page, 10);
    const pageCountNum = parseInt(pageCount, 10);
    const url = `${apiRoot}${basePath}`;

    function link(linkPage: string | number) {
      return `<${url}?id=${expectedRepo}&page=${linkPage}&path=${path}&per_page=${perPage}&recursive=false>`;
    }

    const linkHeader = oneLine`
      ${link(1)}; rel="first",
      ${link(pageCount)}; rel="last",
      ${pageNum === 1 ? '' : `${link(pageNum - 1)}; rel="prev",`}
      ${pageNum === pageCountNum ? '' : `${link(pageNum + 1)}; rel="next",`}
    `.slice(0, -1);

    return {
      'X-Page': page,
      'X-Total-Pages': pageCount,
      'X-Per-Page': perPage,
      'X-Total': totalCount,
      Link: linkHeader,
    };
  }

  interface InterceptCollectionOptions {
    verb?: FetchMethod;
    repeat?: number;
    page?: string;
  }

  function interceptCollection(
    collection: FolderCollectionWithDefaults,
    { verb = 'GET', repeat = 1, page: expectedPage }: InterceptCollectionOptions = {},
  ) {
    const url = `${expectedRepoUrl}/repository/tree`;
    const { folder } = collection;
    const tree = mockRepo.tree[folder];

    api
      .when(verb, url)
      .query(searchParams => {
        const path = searchParams.get('path');
        const page = searchParams.get('page');

        if (path !== folder) {
          return false;
        }

        if (
          expectedPage &&
          page &&
          (Array.isArray(page) || parseInt(page, 10) !== parseInt(expectedPage, 10))
        ) {
          return false;
        }

        return true;
      })
      .repeat(repeat)
      .reply(uri => {
        const { page = '1', per_page = '20' } = parseQuery(uri);
        const perPage = parseInt(per_page, 10);
        const parsedPage = parseInt(page, 10);
        const pageCount = tree.length <= perPage ? 1 : Math.round(tree.length / perPage);
        const pageLastIndex = parsedPage * perPage;
        const pageFirstIndex = pageLastIndex - perPage;
        const resp = tree.slice(pageFirstIndex, pageLastIndex);
        return {
          status: 200,
          json: verb === 'HEAD' ? null : resp,
          headers: createHeaders({
            basePath: url,
            path: folder,
            page,
            perPage: `${perPage}`,
            pageCount: `${pageCount}`,
            totalCount: `${tree.length}`,
          }),
        };
      });
  }

  function interceptFiles(path: string) {
    const url = `${expectedRepoUrl}/repository/files/${encodeURIComponent(path)}/raw`;

    api.when('GET', url).query(true).reply({ status: 200, json: mockRepo.files[path] });

    api
      .when('GET', `${expectedRepoUrl}/repository/commits`)
      .query(searchParams => searchParams.get('path') === path)
      .reply({
        status: 200,
        json: {
          author_name: 'author_name',
          author_email: 'author_email',
          authored_date: 'authored_date',
        },
      });
  }

  async function sharedSetup() {
    const backend = resolveBackend(defaultConfig);
    interceptAuth();
    await backend.authenticate(mockCredentials);
    interceptCollection(collectionManyEntriesConfig, { verb: 'HEAD' });
    interceptCollection(collectionContentConfig, { verb: 'HEAD' });

    return backend;
  }

  it('throws if configuration does not include repo', () => {
    expect(() =>
      resolveBackend(createMockConfig({ backend: { name: 'gitlab' }, collections: [] })),
    ).toThrowErrorMatchingInlineSnapshot(
      `"The GitLab backend needs a "repo" in the backend configuration."`,
    );
  });

  describe('authComponent', () => {
    it('returns authentication page component', () => {
      const backend = resolveBackend(defaultConfig);
      expect(backend.authComponent()).toEqual(AuthenticationPage);
    });
  });

  describe('authenticate', () => {
    it('throws if user does not have access to project', async () => {
      const backend = resolveBackend(defaultConfig);
      interceptAuth({ projectResponse: resp.project.readOnly });
      await expect(
        backend.authenticate(mockCredentials),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Your GitLab user account does not have access to this repo."`,
      );
    });

    it('stores and returns user object on success', async () => {
      const backendName = defaultConfig.backend.name;
      const backend = resolveBackend(defaultConfig);
      interceptAuth();
      const user = await backend.authenticate(mockCredentials);
      expect(authStore.retrieve()).toEqual(user);
      expect(user).toEqual({ ...resp.user.success, ...mockCredentials, backendName });
    });
  });

  describe('currentUser', () => {
    it('returns null if no user', async () => {
      const backend = resolveBackend(defaultConfig);
      const user = await backend.currentUser();
      expect(user).toEqual(null);
    });

    it('returns the stored user if exists', async () => {
      const backendName = defaultConfig.backend.name;
      const backend = resolveBackend(defaultConfig);
      interceptAuth();
      await backend.authenticate(mockCredentials);
      const user = await backend.currentUser();
      expect(user).toEqual({ ...resp.user.success, ...mockCredentials, backendName });
    });
  });

  describe('getToken', () => {
    it('returns the token for the current user', async () => {
      const backend = resolveBackend(defaultConfig);
      interceptAuth();
      await backend.authenticate(mockCredentials);
      const token = await backend.getToken();
      expect(token).toEqual(mockCredentials.token);
    });
  });

  describe('logout', () => {
    it('sets token to null', async () => {
      const backend = resolveBackend(defaultConfig);
      interceptAuth();
      await backend.authenticate(mockCredentials);
      await backend.logout();
      const token = await backend.getToken();
      expect(token).toEqual(null);
    });
  });

  describe('getEntry', () => {
    it('returns an entry from folder collection', async () => {
      const backend = await sharedSetup();

      const entryTree = mockRepo.tree[collectionContentConfig.folder][0];
      const slug = entryTree.path.split('/').pop()?.replace('.md', '') ?? '';

      interceptFiles(entryTree.path);
      interceptCollection(collectionContentConfig);

      const entry = await backend.getEntry(
        {
          config: {
            config: createMockConfig({ collections: [createMockFolderCollectionWithDefaults()] }),
          },
          integrations: [],
          entryDraft: {},
          mediaLibrary: {},
        } as unknown as RootState,
        collectionContentConfig,
        slug,
      );

      expect(entry).toEqual(expect.objectContaining({ path: entryTree.path }));
    });
  });

  describe('listEntries', () => {
    it('returns entries from folder collection', async () => {
      const backend = await sharedSetup();

      const tree = mockRepo.tree[collectionContentConfig.folder];
      tree.forEach(file => interceptFiles(file.path));

      interceptCollection(collectionContentConfig);
      const entries = await backend.listEntries(collectionContentConfig);

      expect(entries).toEqual({
        cursor: expect.any(Cursor),
        pagination: 1,
        entries: expect.arrayContaining(
          tree.map(file => expect.objectContaining({ path: file.path })),
        ),
      });
      expect(entries.entries).toHaveLength(2);
    });

    it('returns all entries from folder collection', async () => {
      const backend = await sharedSetup();

      const tree = mockRepo.tree[collectionManyEntriesConfig.folder];
      interceptBranch();
      tree.forEach(file => interceptFiles(file.path));

      interceptCollection(collectionManyEntriesConfig, { repeat: 5 });
      const entries = await backend.listAllEntries(collectionManyEntriesConfig);

      expect(entries).toEqual(
        expect.arrayContaining(tree.map(file => expect.objectContaining({ path: file.path }))),
      );
      expect(entries).toHaveLength(500);
    }, 7000);

    it('returns entries from file collection', async () => {
      const backend = await sharedSetup();

      const { files } = collectionFilesConfig;
      files.forEach(file => interceptFiles(file.file));
      const entries = await backend.listEntries(collectionFilesConfig);

      expect(entries).toEqual({
        cursor: expect.any(Cursor),
        entries: expect.arrayContaining(
          files.map(file => expect.objectContaining({ path: file.file })),
        ),
      });
      expect(entries.entries).toHaveLength(2);
    });

    it('returns first page from paginated folder collection tree', async () => {
      const backend = await sharedSetup();

      const tree = mockRepo.tree[collectionManyEntriesConfig.folder];
      const pageTree = tree.slice(0, 20);
      pageTree.forEach(file => interceptFiles(file.path));
      interceptCollection(collectionManyEntriesConfig, { page: '1' });
      const entries = await backend.listEntries(collectionManyEntriesConfig);

      expect(entries.entries).toEqual(
        expect.arrayContaining(pageTree.map(file => expect.objectContaining({ path: file.path }))),
      );
      expect(entries.entries).toHaveLength(20);
    });
  });

  describe('traverseCursor', () => {
    it('returns complete last page of paginated tree', async () => {
      const backend = await sharedSetup();

      const tree = mockRepo.tree[collectionManyEntriesConfig.folder];
      tree.slice(0, 20).forEach(file => interceptFiles(file.path));
      interceptCollection(collectionManyEntriesConfig, { page: '1' });
      const entries = await backend.listEntries(collectionManyEntriesConfig);

      const nextPageTree = tree.slice(20, 40);
      nextPageTree.forEach(file => interceptFiles(file.path));
      interceptCollection(collectionManyEntriesConfig, { page: '2' });
      const nextPage = await backend.traverseCursor(entries.cursor, 'next');

      expect(nextPage.entries).toEqual(
        expect.arrayContaining(
          nextPageTree.map(file => expect.objectContaining({ path: file.path })),
        ),
      );
      expect(nextPage.entries).toHaveLength(20);

      const lastPageTree = tree.slice(-20);
      lastPageTree.forEach(file => interceptFiles(file.path));
      interceptCollection(collectionManyEntriesConfig, { page: '25' });
      const lastPage = await backend.traverseCursor(nextPage.cursor, 'last');
      expect(lastPage.entries).toEqual(
        expect.arrayContaining(
          lastPageTree.map(file => expect.objectContaining({ path: file.path })),
        ),
      );
      expect(lastPage.entries).toHaveLength(20);
    });
  });

  describe('filterFile', () => {
    it('should return true for nested file with matching depth', () => {
      const backend = resolveBackend(defaultConfig);

      expect(
        (backend.implementation as GitLab).filterFile(
          'content/posts',
          { name: 'index.md', path: 'content/posts/dir1/dir2/index.md' },
          'md',
          3,
        ),
      ).toBe(true);
    });

    it('should return false for nested file with non matching depth', () => {
      const backend = resolveBackend(defaultConfig);

      expect(
        (backend.implementation as GitLab).filterFile(
          'content/posts',
          { name: 'index.md', path: 'content/posts/dir1/dir2/index.md' },
          'md',
          2,
        ),
      ).toBe(false);
    });
  });

  afterEach(() => {
    authStore.logout();
    api.reset();
    expect(authStore.retrieve()).toEqual(null);
  });
});
