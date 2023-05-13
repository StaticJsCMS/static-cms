import { getTreeData } from '../nested.util';

import type { Collection, Entry } from '@staticcms/core/interface';

const collection: Collection = {
  create: true,
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    {
      label: 'Body',
      media_library: { folder_support: true },
      name: 'body',
      widget: 'markdown',
    },
  ],
  folder: '_nested_pages',
  label: 'Nested Pages',
  label_singular: 'Page',
  media_library: { folder_support: true },
  name: 'pages',
  nested: { depth: 100, summary: '{{title}}', path: { label: 'Path', index_file: 'index' } },
  sortable_fields: { fields: Array(1) },
  view_filters: [],
  view_groups: [],
};

const entries: Entry[] = [
  {
    author: '',
    collection: 'pages',
    data: { title: 'An Author', body: 'Author details go here!.\n' },
    i18n: {},
    isFetching: false,
    isModification: null,
    label: null,
    mediaFiles: [],
    partial: false,
    path: '_nested_pages/authors/author-1/index.md',
    raw: '---\ntitle: An Author\n---\nAuthor details go here!.\n',
    slug: 'authors/author-1/index',
    status: '',
    updatedOn: '',
  },
  {
    author: '',
    collection: 'pages',
    data: { title: 'Authors' },
    i18n: {},
    isFetching: false,
    isModification: null,
    label: null,
    mediaFiles: [],
    partial: false,
    path: '_nested_pages/authors/index.md',
    raw: '---\ntitle: Authors\n---\n',
    slug: 'authors/index',
    status: '',
    updatedOn: '',
  },
  {
    author: '',
    collection: 'pages',
    data: {
      title: 'Hello World',
      body: 'Coffee is a small tree or shrub that grows in the … great number of migratory and resident species.\n',
    },
    i18n: {},
    isFetching: false,
    isModification: null,
    label: null,
    mediaFiles: [],
    partial: false,
    path: '_nested_pages/posts/hello-world/index.md',
    raw: '---\ntitle: Hello World\n---\nCoffee is a small tree or shrub that grows in the forest understory in its wild form, and traditionally was grown commercially under other trees that provided shade. The forest-like structure of shade coffee farms provides habitat for a great number of migratory and resident species.\n',
    slug: 'posts/hello-world/index',
    status: '',
    updatedOn: '',
  },
  {
    author: '',
    collection: 'pages',
    data: { title: 'Posts' },
    i18n: {},
    isFetching: false,
    isModification: null,
    label: null,
    mediaFiles: [],
    partial: false,
    path: '_nested_pages/posts/index.md',
    raw: '---\ntitle: Posts\n---\n',
    slug: 'posts/index',
    status: '',
    updatedOn: '',
  },
  {
    author: '',
    collection: 'pages',
    data: {
      title: 'Hello World News',
      body: 'Coffee is a small tree or shrub that grows in the … great number of migratory and resident species.\n',
    },
    i18n: {},
    isFetching: false,
    isModification: null,
    label: null,
    mediaFiles: [],
    partial: false,
    path: '_nested_pages/posts/news/hello-world-news/index.md',
    raw: '---\ntitle: Hello World News\n---\nCoffee is a small tree or shrub that grows in the forest understory in its wild form, and traditionally was grown commercially under other trees that provided shade. The forest-like structure of shade coffee farms provides habitat for a great number of migratory and resident species.\n',
    slug: 'posts/news/hello-world-news/index',
    status: '',
    updatedOn: '',
  },
  {
    author: '',
    collection: 'pages',
    data: { title: 'News Articles' },
    i18n: {},
    isFetching: false,
    isModification: null,
    label: null,
    mediaFiles: [],
    partial: false,
    path: '_nested_pages/posts/news/index.md',
    raw: '---\ntitle: News Articles\n---\n',
    slug: 'posts/news/index',
    status: '',
    updatedOn: '',
  },
  {
    author: '',
    collection: 'pages',
    data: { title: 'Pages' },
    i18n: {},
    isFetching: false,
    isModification: null,
    label: null,
    mediaFiles: [],
    partial: false,
    path: '_nested_pages/index.md',
    raw: '---\ntitle: Pages\n---\n',
    slug: 'index',
    status: '',
    updatedOn: '',
  },
];

describe('nested.util', () => {
  describe('getTreeData', () => {
    it('returns root if entries are empty', () => {
      expect(getTreeData(collection, [])).toEqual([
        { children: [], isDir: true, isRoot: true, path: '/', title: 'Nested Pages' },
      ]);
    });

    it('returns nested structure', () => {
      const treeData = getTreeData(collection, entries);

      // ROOT
      expect(treeData.length).toBe(1);

      const rootNode = treeData[0];
      expect(rootNode.isDir).toBe(true);
      expect(rootNode.isRoot).toBe(true);
      expect(rootNode.path).toBe('/');
      expect(rootNode.title).toBe('Nested Pages');
      expect(rootNode.children.length).toBe(3);

      // ROOT > index.md
      const rootIndexNode = rootNode.children[2];
      expect(rootIndexNode.isDir).toBe(false);
      expect(rootIndexNode.isRoot).toBe(false);
      expect(rootIndexNode.path).toBe('/index.md');
      expect(rootIndexNode.title).toBe('Pages');
      expect(rootIndexNode.children.length).toBe(0);

      // ROOT > Authors Node
      const authorsNode = rootNode.children[0];
      expect(authorsNode.isDir).toBe(true);
      expect(authorsNode.isRoot).toBe(false);
      expect(authorsNode.path).toBe('/authors');
      expect(authorsNode.title).toBe('authors');
      expect(authorsNode.children.length).toBe(2);

      // ROOT > Authors Node > index.md
      const authorsIndexNode = authorsNode.children[1];
      expect(authorsIndexNode.isDir).toBe(false);
      expect(authorsIndexNode.isRoot).toBe(false);
      expect(authorsIndexNode.path).toBe('/authors/index.md');
      expect(authorsIndexNode.title).toBe('Authors');
      expect(authorsIndexNode.children.length).toBe(0);

      // ROOT > Authors Node > An Author Node
      const anAuthorNode = authorsNode.children[0];
      expect(anAuthorNode.isDir).toBe(true);
      expect(anAuthorNode.isRoot).toBe(false);
      expect(anAuthorNode.path).toBe('/authors/author-1');
      expect(anAuthorNode.title).toBe('author-1');
      expect(anAuthorNode.children.length).toBe(1);

      // ROOT > Authors Node > An Author Node > index.md
      const anAuthorIndexNode = anAuthorNode.children[0];
      expect(anAuthorIndexNode.isDir).toBe(false);
      expect(anAuthorIndexNode.isRoot).toBe(false);
      expect(anAuthorIndexNode.path).toBe('/authors/author-1/index.md');
      expect(anAuthorIndexNode.title).toBe('An Author');
      expect(anAuthorIndexNode.children.length).toBe(0);

      // ROOT > Posts Node
      const postsNode = rootNode.children[1];
      expect(postsNode.isDir).toBe(true);
      expect(postsNode.isRoot).toBe(false);
      expect(postsNode.path).toBe('/posts');
      expect(postsNode.title).toBe('posts');
      expect(postsNode.children.length).toBe(3);

      // ROOT > Posts Node > index.md
      const postsIndexNode = postsNode.children[2];
      expect(postsIndexNode.isDir).toBe(false);
      expect(postsIndexNode.isRoot).toBe(false);
      expect(postsIndexNode.path).toBe('/posts/index.md');
      expect(postsIndexNode.title).toBe('Posts');
      expect(postsIndexNode.children.length).toBe(0);

      // ROOT > Posts Node > Hello World Node
      const helloWorldNode = postsNode.children[0];
      expect(helloWorldNode.isDir).toBe(true);
      expect(helloWorldNode.isRoot).toBe(false);
      expect(helloWorldNode.path).toBe('/posts/hello-world');
      expect(helloWorldNode.title).toBe('hello-world');
      expect(helloWorldNode.children.length).toBe(1);

      // ROOT > Posts Node > Hello World Node > index.md
      const helloWorldIndexNode = helloWorldNode.children[0];
      expect(helloWorldIndexNode.isDir).toBe(false);
      expect(helloWorldIndexNode.isRoot).toBe(false);
      expect(helloWorldIndexNode.path).toBe('/posts/hello-world/index.md');
      expect(helloWorldIndexNode.title).toBe('Hello World');
      expect(helloWorldIndexNode.children.length).toBe(0);

      // ROOT > Posts Node > News Articles Node
      const newsArticlesNode = postsNode.children[1];
      expect(newsArticlesNode.isDir).toBe(true);
      expect(newsArticlesNode.isRoot).toBe(false);
      expect(newsArticlesNode.path).toBe('/posts/news');
      expect(newsArticlesNode.title).toBe('news');
      expect(newsArticlesNode.children.length).toBe(2);

      // ROOT > Posts Node > Hello World Node > index.md
      const newsArticlesIndexNode = newsArticlesNode.children[1];
      expect(newsArticlesIndexNode.isDir).toBe(false);
      expect(newsArticlesIndexNode.isRoot).toBe(false);
      expect(newsArticlesIndexNode.path).toBe('/posts/news/index.md');
      expect(newsArticlesIndexNode.title).toBe('News Articles');
      expect(newsArticlesIndexNode.children.length).toBe(0);

      // ROOT > Posts Node > News Articles Node > Hello World News Node
      const helloWorldNewsNode = newsArticlesNode.children[0];
      expect(helloWorldNewsNode.isDir).toBe(true);
      expect(helloWorldNewsNode.isRoot).toBe(false);
      expect(helloWorldNewsNode.path).toBe('/posts/news/hello-world-news');
      expect(helloWorldNewsNode.title).toBe('hello-world-news');
      expect(helloWorldNewsNode.children.length).toBe(1);

      // ROOT > Posts Node > Hello World Node > Hello World News Node > index.md
      const helloWorldNewsIndexNode = helloWorldNewsNode.children[0];
      expect(helloWorldNewsIndexNode.isDir).toBe(false);
      expect(helloWorldNewsIndexNode.isRoot).toBe(false);
      expect(helloWorldNewsIndexNode.path).toBe('/posts/news/hello-world-news/index.md');
      expect(helloWorldNewsIndexNode.title).toBe('Hello World News');
      expect(helloWorldNewsIndexNode.children.length).toBe(0);
    });
  });
});
