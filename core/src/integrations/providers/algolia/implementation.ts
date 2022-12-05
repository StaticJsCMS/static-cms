import flatten from 'lodash/flatten';

import { unsentRequest } from '@staticcms/core/lib/util';
import { selectEntrySlug } from '@staticcms/core/lib/util/collection.util';
import createEntry from '@staticcms/core/valueObjects/createEntry';

import type { AlgoliaConfig, Collection, Entry, SearchResponse } from '@staticcms/core/interface';

const { fetchWithTimeout: fetch } = unsentRequest;

function getSlug(path: string): string {
  return (
    path
      .split('/')
      .pop()
      ?.replace(/\.[^.]+$/, '') ?? path
  );
}

interface EntriesCache {
  collection: Collection | null;
  page: number | null;
  entries: Entry[];
}

interface AlgoliaHits {
  nbPages?: number;
  page: number;
  hits: {
    path: string;
    slug: string;
    data: unknown;
  }[];
}

interface AlgoliaSearchResponse {
  results: AlgoliaHits[];
}

export default class Algolia {
  private applicationID: string;
  private apiKey: string;
  private indexPrefix: string;
  private searchURL: string;
  private entriesCache: EntriesCache;

  constructor(config: AlgoliaConfig) {
    if (config.applicationID == null || config.apiKey == null) {
      throw 'The Algolia search integration needs the credentials (applicationID and apiKey) in the integration configuration.';
    }

    this.applicationID = config.applicationID;
    this.apiKey = config.apiKey;

    const prefix = config.indexPrefix;
    this.indexPrefix = prefix ? `${prefix}-` : '';

    this.searchURL = `https://${this.applicationID}-dsn.algolia.net/1`;

    this.entriesCache = {
      collection: null,
      page: null,
      entries: [],
    };
  }

  requestHeaders(headers = {}) {
    return {
      'X-Algolia-API-Key': this.apiKey,
      'X-Algolia-Application-Id': this.applicationID,
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  parseJsonResponse(response: Response) {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
  }

  urlFor(path: string, optionParams: Record<string, string> = {}) {
    const params = [];
    for (const key in optionParams) {
      params.push(`${key}=${encodeURIComponent(optionParams[key])}`);
    }
    if (params.length) {
      path += `?${params.join('&')}`;
    }
    return path;
  }

  request(
    path: string,
    options: RequestInit & {
      params?: Record<string, string>;
    },
  ) {
    const headers = this.requestHeaders(options.headers || {});
    const url = this.urlFor(path, options.params);
    return fetch(url, { ...options, headers }).then(response => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.match(/json/)) {
        return this.parseJsonResponse(response);
      }

      return response.text();
    });
  }

  search(collections: string[], searchTerm: string, page: number): Promise<SearchResponse> {
    const searchCollections = collections.map(collection => ({
      indexName: `${this.indexPrefix}${collection}`,
      params: `query=${searchTerm}&page=${page}`,
    }));

    return this.request(`${this.searchURL}/indexes/*/queries`, {
      method: 'POST',
      body: JSON.stringify({ requests: searchCollections }),
    }).then((response: AlgoliaSearchResponse) => {
      const entries = response.results.map((result, index) =>
        result.hits.map(hit => {
          const slug = getSlug(hit.path);
          return createEntry(collections[index], slug, hit.path, { data: hit.data, partial: true });
        }),
      );

      return { entries: flatten(entries), pagination: page };
    });
  }

  searchBy(field: string, collection: string, query: string) {
    return this.request(`${this.searchURL}/indexes/${this.indexPrefix}${collection}`, {
      params: {
        restrictSearchableAttributes: field,
        query,
      },
    });
  }

  listEntries(collection: Collection, page: number) {
    if (this.entriesCache.collection === collection && this.entriesCache.page === page) {
      return Promise.resolve({ page: this.entriesCache.page, entries: this.entriesCache.entries });
    } else {
      return this.request(`${this.searchURL}/indexes/${this.indexPrefix}${collection.name}`, {
        params: { page: `${page}` },
      }).then((response: AlgoliaHits) => {
        const entries = response.hits.map(hit => {
          const slug = selectEntrySlug(collection, hit.path);
          return createEntry(collection.name, slug, hit.path, {
            data: hit.data,
            partial: true,
          });
        });
        this.entriesCache = { collection, page: response.page, entries };
        return { entries, page: response.page };
      });
    }
  }

  async listAllEntries(collection: Collection) {
    const params = {
      hitsPerPage: '1000',
    };
    let response: AlgoliaHits = await this.request(
      `${this.searchURL}/indexes/${this.indexPrefix}${collection.name}`,
      { params },
    );
    let { nbPages = 0, hits, page } = response;
    page = page + 1;
    while (page < nbPages) {
      response = await this.request(
        `${this.searchURL}/indexes/${this.indexPrefix}${collection.name}`,
        {
          params: { ...params, page: `${page}` },
        },
      );
      hits = [...hits, ...response.hits];
      page = page + 1;
    }
    const entries = hits.map(hit => {
      const slug = selectEntrySlug(collection, hit.path);
      return createEntry(collection.name, slug, hit.path, {
        data: hit.data,
        partial: true,
      });
    });

    return entries;
  }

  getEntry(collection: Collection, slug: string) {
    return this.searchBy('slug', collection.name, slug).then((response: AlgoliaHits) => {
      const entry = response.hits.filter(hit => hit.slug === slug)[0];
      return createEntry(collection.name, slug, entry.path, {
        data: entry.data,
        partial: true,
      });
    });
  }
}
