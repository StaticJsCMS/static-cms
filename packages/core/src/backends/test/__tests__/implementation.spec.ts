import { createMockConfig } from '@staticcms/test/data/config.mock';
import TestBackend, { getFolderFiles } from '../implementation';
import { resolveBackend } from '@staticcms/core/backend';

jest.mock('@staticcms/core/backend');

describe('test backend implementation', () => {
  let backend: TestBackend;

  beforeEach(() => {
    backend = new TestBackend(createMockConfig({ collections: [] }));

    (resolveBackend as jest.Mock).mockResolvedValue(null);

    jest.resetModules();
  });

  describe('getEntry', () => {
    it('should get entry by path', async () => {
      window.repoFiles = {
        posts: {
          'some-post.md': {
            path: 'path/to/some-post.md',
            content: 'post content',
          },
        },
      };

      await expect(backend.getEntry('posts/some-post.md')).resolves.toEqual({
        file: { path: 'posts/some-post.md', id: null },
        data: 'post content',
      });
    });

    it('should get entry by nested path', async () => {
      window.repoFiles = {
        posts: {
          dir1: {
            dir2: {
              'some-post.md': {
                path: 'path/to/some-post.md',
                content: 'post content',
              },
            },
          },
        },
      };

      await expect(backend.getEntry('posts/dir1/dir2/some-post.md')).resolves.toEqual({
        file: { path: 'posts/dir1/dir2/some-post.md', id: null },
        data: 'post content',
      });
    });
  });

  describe('persistEntry', () => {
    it('should persist entry', async () => {
      window.repoFiles = {};

      const entry = {
        dataFiles: [{ path: 'posts/some-post.md', raw: 'content', slug: 'some-post.md' }],
        assets: [],
      };
      await backend.persistEntry(entry, { newEntry: true, commitMessage: 'Persist file' });

      expect(window.repoFiles).toEqual({
        posts: {
          'some-post.md': {
            content: 'content',
            path: 'posts/some-post.md',
          },
        },
      });
    });

    it('should persist entry and keep existing unrelated entries', async () => {
      window.repoFiles = {
        pages: {
          'other-page.md': {
            path: 'path/to/other-page.md',
            content: 'content',
          },
        },
        posts: {
          'other-post.md': {
            path: 'path/to/other-post.md',
            content: 'content',
          },
        },
      };

      const entry = {
        dataFiles: [{ path: 'posts/new-post.md', raw: 'content', slug: 'new-post.md' }],
        assets: [],
      };
      await backend.persistEntry(entry, { newEntry: true, commitMessage: 'Persist file' });

      expect(window.repoFiles).toEqual({
        pages: {
          'other-page.md': {
            path: 'path/to/other-page.md',
            content: 'content',
          },
        },
        posts: {
          'new-post.md': {
            path: 'posts/new-post.md',
            content: 'content',
          },
          'other-post.md': {
            path: 'path/to/other-post.md',
            content: 'content',
          },
        },
      });
    });

    it('should persist nested entry', async () => {
      window.repoFiles = {};

      const slug = 'dir1/dir2/some-post.md';
      const path = `posts/${slug}`;
      const entry = { dataFiles: [{ path, raw: 'content', slug }], assets: [] };
      await backend.persistEntry(entry, { newEntry: true, commitMessage: 'Persist file' });

      expect(window.repoFiles).toEqual({
        posts: {
          dir1: {
            dir2: {
              'some-post.md': {
                content: 'content',
                path: 'posts/dir1/dir2/some-post.md',
              },
            },
          },
        },
      });
    });

    it('should update existing nested entry', async () => {
      window.repoFiles = {
        posts: {
          dir1: {
            dir2: {
              'some-post.md': {
                path: 'path/to/some-post.md',
                mediaFiles: { file1: { path: 'path/to/media/file1.txt', content: 'file1' } },
                content: 'content',
              },
            },
          },
        },
      };

      const slug = 'dir1/dir2/some-post.md';
      const path = `posts/${slug}`;
      const entry = { dataFiles: [{ path, raw: 'new content', slug }], assets: [] };
      await backend.persistEntry(entry, { newEntry: false, commitMessage: 'Persist file' });

      expect(window.repoFiles).toEqual({
        posts: {
          dir1: {
            dir2: {
              'some-post.md': {
                path: 'posts/dir1/dir2/some-post.md',
                content: 'new content',
              },
            },
          },
        },
      });
    });
  });

  describe('deleteFiles', () => {
    it('should delete entry by path', async () => {
      window.repoFiles = {
        posts: {
          'some-post.md': {
            path: 'path/to/some-post.md',
            content: 'post content',
          },
        },
      };

      await backend.deleteFiles(['posts/some-post.md']);
      expect(window.repoFiles).toEqual({
        posts: {},
      });
    });

    it('should delete entry by nested path', async () => {
      window.repoFiles = {
        posts: {
          dir1: {
            dir2: {
              'some-post.md': {
                path: 'path/to/some-post.md',
                content: 'post content',
              },
            },
          },
        },
      };

      await backend.deleteFiles(['posts/dir1/dir2/some-post.md']);
      expect(window.repoFiles).toEqual({
        posts: {
          dir1: {
            dir2: {},
          },
        },
      });
    });
  });

  describe('getFolderFiles', () => {
    it('should get files by depth', () => {
      const tree = {
        pages: {
          'root-page.md': {
            path: 'pages/root-page.md',
            content: 'root page content',
          },
          dir1: {
            'nested-page-1.md': {
              path: 'pages/dir1/nested-page-1.md',
              content: 'nested page 1 content',
            },
            dir2: {
              'nested-page-2.md': {
                path: 'pages/dir1/dir2/nested-page-2.md',
                content: 'nested page 2 content',
              },
            },
          },
        },
      };

      expect(getFolderFiles(tree, 'pages', 'md', 1)).toEqual([
        {
          path: 'pages/root-page.md',
          content: 'root page content',
        },
      ]);
      expect(getFolderFiles(tree, 'pages', 'md', 2)).toEqual([
        {
          path: 'pages/dir1/nested-page-1.md',
          content: 'nested page 1 content',
        },
        {
          path: 'pages/root-page.md',
          content: 'root page content',
        },
      ]);
      expect(getFolderFiles(tree, 'pages', 'md', 3)).toEqual([
        {
          path: 'pages/dir1/dir2/nested-page-2.md',
          content: 'nested page 2 content',
        },
        {
          path: 'pages/dir1/nested-page-1.md',
          content: 'nested page 1 content',
        },
        {
          path: 'pages/root-page.md',
          content: 'root page content',
        },
      ]);
    });
  });
});
