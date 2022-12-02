jest.mock('@staticcms/core/backend');
import { oneLine, stripIndent } from 'common-tags';

import Cursor from '@staticcms/core/lib/util/Cursor';
// import AuthenticationPage from '../AuthenticationPage';
import Gitlab from '../implementation';
import mockFetch from '@staticcms/test/mockFetch';

import type {
  Config,
  DeepPartial,
  FilesCollection,
  FolderCollection,
  ImplementationFile,
  UnknownField,
} from '@staticcms/core';
import type {
  Backend as BackendType,
  LocalStorageAuthStore as LocalStorageAuthStoreType,
} from '@staticcms/core/backend';
import type { RootState } from '@staticcms/core/store';
import type { MockFetch } from '@staticcms/test/mockFetch';

const { Backend, LocalStorageAuthStore } = jest.requireActual<{
  Backend: typeof BackendType;
  LocalStorageAuthStore: typeof LocalStorageAuthStoreType;
}>('@staticcms/core/backend');

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

interface MockRepo {
  tree: Record<string, ImplementationFile[]>;
  files: Record<string, string>;
}

const mockRepo: MockRepo = {
  tree: {
    '/': [
      {
        id: '5d0620ebdbc92068a3e866866e928cc373f18429',
        path: 'content',
      },
    ],
    content: [
      {
        id: 'b1a200e48be54fde12b636f9563d659d44c206a5',
        path: 'content/test1.md',
      },
      {
        id: 'd8345753a1d935fa47a26317a503e73e1192d623',
        path: 'content/test2.md',
      },
    ],
    'many-entries': manyEntries.tree,
  },
  files: {
    'content/test1.md': stripIndent`
      ---
      title: test
      ---
      # test
    `,
    'content/test2.md': stripIndent`
      ---
      title: test2
      ---
      # test 2
    `,
    ...manyEntries.files,
  },
};

const resp = {
  user: {
    success: {
      id: 1,
    },
  },
  branch: {
    success: {
      name: 'master',
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

describe('gitlab backend', () => {
  let authStore: LocalStorageAuthStoreType;
  let backend: BackendType<Gitlab>;
  const repo = 'foo/bar';
  const defaultConfig = {
    backend: {
      name: 'gitlab',
      repo,
    },
  } as Config<UnknownField>;
  const collectionContentConfig = {
    name: 'foo',
    label: 'Foo',
    folder: 'content',
    fields: [{ name: 'title', widget: 'string' }],
    // TODO: folder_based_collection is an internal string, we should not
    // be depending on it here
    type: 'folder_based_collection',
  } as FolderCollection;
  const collectionManyEntriesConfig = {
    name: 'foo',
    label: 'Foo',
    folder: 'many-entries',
    fields: [{ name: 'title', widget: 'string' }],
    // TODO: folder_based_collection is an internal string, we should not
    // be depending on it here
    type: 'folder_based_collection',
  } as FolderCollection;
  const collectionFilesConfig = {
    name: 'foo',
    label: 'Foo',
    files: [
      {
        label: 'foo',
        name: 'foo',
        file: 'content/test1.md',
        fields: [{ name: 'title', widget: 'string' }],
      },
      {
        label: 'bar',
        name: 'bar',
        file: 'content/test2.md',
        fields: [{ name: 'title', widget: 'string' }],
      },
    ],
    type: 'file_based_collection',
  } as FilesCollection;
  const mockCredentials = { token: 'MOCK_TOKEN' };
  const expectedRepo = encodeURIComponent(repo);
  const expectedRepoUrl = `/projects/${expectedRepo}`;

  function resolveBackend(config: DeepPartial<Config<UnknownField>> = {}) {
    authStore = new LocalStorageAuthStore();
    return new Backend<Gitlab>(
      {
        init: (...args) => new Gitlab(...args),
      },
      {
        backendName: 'gitlab',
        config: config as Config<UnknownField>,
        authStore,
      },
    );
  }

  let api: MockFetch;

  function interceptAuth(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { userResponse, projectResponse }: any = {},
  ) {
    api.when('/user').reply(200, userResponse || resp.user.success);
    api.when(expectedRepoUrl).reply(200, projectResponse || resp.project.success);
  }

  function interceptBranch({ branch = 'master' } = {}) {
    api
      .when(`${expectedRepoUrl}/repository/branches/${encodeURIComponent(branch)}`)
      .reply(200, resp.branch.success);
  }

  function parseQuery(uri: string) {
    const query = uri.split('?')[1];
    if (!query) {
      return {};
    }
    return query.split('&').reduce((acc, q) => {
      const [key, value] = q.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  }

  interface CreateHeadersOptions {
    basePath: string;
    path: string;
    page: string;
    perPage: string;
    pageCount: string;
    totalCount: string;
  }

  function createHeaders(
    backend: BackendType<Gitlab>,
    { basePath, path, page, perPage, pageCount, totalCount }: CreateHeadersOptions,
  ) {
    const pageNum = parseInt(page, 10);
    const pageCountNum = parseInt(pageCount, 10);
    const url = `${backend.implementation.apiRoot}${basePath}`;

    function link(linkPage: number) {
      return `<${url}?id=${expectedRepo}&page=${linkPage}&path=${path}&per_page=${perPage}&recursive=false>`;
    }

    const linkHeader = oneLine`
      ${link(1)}; rel="first",
      ${link(pageCountNum)}; rel="last",
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
    verb?: string;
    repeat?: number;
    page?: string;
  }

  function interceptCollection(
    backend: BackendType<Gitlab>,
    collection: FolderCollection,
    { verb = 'get', repeat = 1, page: expectedPage }: InterceptCollectionOptions = {},
  ) {
    const url = `${expectedRepoUrl}/repository/tree`;
    const { folder } = collection;
    const tree = mockRepo.tree[folder];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api as any)
      [verb](url)
      .query(({ path, page }: { path: string; page: string }) => {
        if (path !== folder) {
          return false;
        }
        if (expectedPage && page && parseInt(page, 10) !== parseInt(expectedPage, 10)) {
          return false;
        }
        return true;
      })
      .times(repeat)
      .reply((uri: string) => {
        const { page = '1', per_page = '20' } = parseQuery(uri);
        const pageNum = parseInt(page);
        const per_pageNum = parseInt(per_page);

        const pageCount = tree.length <= per_pageNum ? 1 : Math.round(tree.length / per_pageNum);
        const pageLastIndex = pageNum * per_pageNum;
        const pageFirstIndex = pageLastIndex - per_pageNum;
        const resp = tree.slice(pageFirstIndex, pageLastIndex);
        return [
          200,
          verb === 'head' ? null : resp,
          createHeaders(backend, {
            basePath: url,
            path: folder,
            page,
            perPage: per_page,
            pageCount: `${pageCount}`,
            totalCount: `${tree.length}`,
          }),
        ];
      });
  }

  function interceptFiles(path: string) {
    const url = `${expectedRepoUrl}/repository/files/${encodeURIComponent(path)}/raw`;
    api.when(url).reply(200, mockRepo.files[path]);

    api.when(`${expectedRepoUrl}/repository/commits`).reply(200, [
      {
        author_name: 'author_name',
        author_email: 'author_email',
        authored_date: 'authored_date',
      },
    ]);
  }

  function sharedSetup() {
    beforeEach(async () => {
      backend = resolveBackend(defaultConfig);
      api = mockFetch(backend.implementation.apiRoot);
      interceptAuth(backend);
      await backend.authenticate(mockCredentials);
      // interceptCollection(backend, collectionManyEntriesConfig, { verb: 'head' });
      // interceptCollection(backend, collectionContentConfig, { verb: 'head' });
    });
  }

  afterEach(() => {
    api?.reset();
    authStore.logout();
    expect(authStore.retrieve()).toEqual(null);
  });

  it('throws if configuration does not include repo', () => {
    expect(() => resolveBackend({ backend: {} })).toThrowErrorMatchingInlineSnapshot(
      `"The GitLab backend needs a "repo" in the backend configuration."`,
    );
  });

  // describe('authComponent', () => {
  //   it('returns authentication page component', () => {
  //     backend = resolveBackend(defaultConfig);
  //     expect(backend.authComponent()).toEqual(AuthenticationPage);
  //   });
  // });

  // describe('authenticate', () => {
  //   it('throws if user does not have access to project', async () => {
  //     backend = resolveBackend(defaultConfig);
  //     interceptAuth(backend, { projectResponse: resp.project.readOnly });
  //     await expect(
  //       backend.authenticate(mockCredentials),
  //     ).rejects.toThrowErrorMatchingInlineSnapshot(
  //       `"Your GitLab user account does not have access to this repo."`,
  //     );
  //   });

  //   it('stores and returns user object on success', async () => {
  //     const backendName = defaultConfig.backend.name;
  //     backend = resolveBackend(defaultConfig);
  //     interceptAuth(backend);
  //     const user = await backend.authenticate(mockCredentials);
  //     expect(authStore.retrieve()).toEqual(user);
  //     expect(user).toEqual({ ...resp.user.success, ...mockCredentials, backendName });
  //   });
  // });

  describe('currentUser', () => {
    it('returns null if no user', async () => {
      backend = resolveBackend(defaultConfig);
      const user = await backend.currentUser();
      expect(user).toEqual(null);
    });

    it('returns the stored user if exists', async () => {
      const backendName = defaultConfig.backend.name;
      backend = resolveBackend(defaultConfig);
      interceptAuth(backend);
      await backend.authenticate(mockCredentials);
      const user = await backend.currentUser();
      expect(user).toEqual({ ...resp.user.success, ...mockCredentials, backendName });
    });
  });

  describe('getToken', () => {
    it('returns the token for the current user', async () => {
      backend = resolveBackend(defaultConfig);
      interceptAuth(backend);
      await backend.authenticate(mockCredentials);
      const token = await backend.getToken();
      expect(token).toEqual(mockCredentials.token);
    });
  });

  describe('logout', () => {
    it('sets token to null', async () => {
      backend = resolveBackend(defaultConfig);
      // interceptAuth(backend);
      // await backend.authenticate(mockCredentials);
      // await backend.logout();
      // const token = await backend.getToken();
      // expect(token).toEqual(null);
    });
  });

  describe('getEntry', () => {
    sharedSetup();

    fit('returns an entry from folder collection', async () => {
      const entryTree = mockRepo.tree[collectionContentConfig.folder][0];
      const slug = entryTree.path.split('/').pop()?.replace('.md', '');

      interceptFiles(entryTree.path);
      interceptCollection(backend, collectionContentConfig);

      const entry = await backend.getEntry(
        {
          config: {},
          integrations: [],
          entryDraft: {},
          mediaLibrary: {},
        } as unknown as RootState,
        collectionContentConfig,
        slug ?? '',
      );

      expect(entry).toEqual(expect.objectContaining({ path: entryTree.path }));
    });
  });

  describe('listEntries', () => {
    sharedSetup();

    it('returns entries from folder collection', async () => {
      const tree = mockRepo.tree[collectionContentConfig.folder];
      tree.forEach(file => interceptFiles(file.path));

      interceptCollection(backend, collectionContentConfig);
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
      const tree = mockRepo.tree[collectionManyEntriesConfig.folder];
      interceptBranch();
      tree.forEach(file => interceptFiles(file.path));

      interceptCollection(backend, collectionManyEntriesConfig, { repeat: 5 });
      const entries = await backend.listAllEntries(collectionManyEntriesConfig);

      expect(entries).toEqual(
        expect.arrayContaining(tree.map(file => expect.objectContaining({ path: file.path }))),
      );
      expect(entries).toHaveLength(500);
    }, 7000);

    it('returns entries from file collection', async () => {
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
      const tree = mockRepo.tree[collectionManyEntriesConfig.folder];
      const pageTree = tree.slice(0, 20);
      pageTree.forEach(file => interceptFiles(file.path));
      interceptCollection(backend, collectionManyEntriesConfig, { page: '1' });
      const entries = await backend.listEntries(collectionManyEntriesConfig);

      expect(entries.entries).toEqual(
        expect.arrayContaining(pageTree.map(file => expect.objectContaining({ path: file.path }))),
      );
      expect(entries.entries).toHaveLength(20);
    });
  });

  describe('traverseCursor', () => {
    sharedSetup();

    it('returns complete last page of paginated tree', async () => {
      const tree = mockRepo.tree[collectionManyEntriesConfig.folder];
      tree.slice(0, 20).forEach(file => interceptFiles(file.path));
      interceptCollection(backend, collectionManyEntriesConfig, { page: '1' });
      const entries = await backend.listEntries(collectionManyEntriesConfig);

      const nextPageTree = tree.slice(20, 40);
      nextPageTree.forEach(file => interceptFiles(file.path));
      interceptCollection(backend, collectionManyEntriesConfig, { page: '2' });
      const nextPage = await backend.traverseCursor(entries.cursor, 'next');

      expect(nextPage.entries).toEqual(
        expect.arrayContaining(
          nextPageTree.map(file => expect.objectContaining({ path: file.path })),
        ),
      );
      expect(nextPage.entries).toHaveLength(20);

      const lastPageTree = tree.slice(-20);
      lastPageTree.forEach(file => interceptFiles(file.path));
      interceptCollection(backend, collectionManyEntriesConfig, { page: '25' });
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
      backend = resolveBackend(defaultConfig);

      expect(
        backend.implementation.filterFile(
          'content/posts',
          { name: 'index.md', path: 'content/posts/dir1/dir2/index.md' },
          'md',
          3,
        ),
      ).toBe(true);
    });

    it('should return false for nested file with non matching depth', () => {
      backend = resolveBackend(defaultConfig);

      expect(
        backend.implementation.filterFile(
          'content/posts',
          { name: 'index.md', path: 'content/posts/dir1/dir2/index.md' },
          'md',
          2,
        ),
      ).toBe(false);
    });
  });
});
