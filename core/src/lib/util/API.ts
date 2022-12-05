import { asyncLock } from './asyncLock';
import unsentRequest from './unsentRequest';
import APIError from './APIError';

import type { AsyncLock } from './asyncLock';
import type { FileMetadata } from '@staticcms/core/interface';

export class FetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface API {
  rateLimiter?: AsyncLock;
  buildRequest: (req: ApiRequest) => ApiRequest | Promise<ApiRequest>;
  requestFunction?: (req: ApiRequest) => Promise<Response>;
}

export interface ApiRequestURL {
  url: string;
  params?: Record<string, string>;
}

export type ApiRequestObject = RequestInit & ApiRequestURL;

export type ApiRequest = ApiRequestObject | string;

class RateLimitError extends Error {
  resetSeconds: number;

  constructor(message: string, resetSeconds: number) {
    super(message);
    if (resetSeconds < 0) {
      this.resetSeconds = 1;
    } else if (resetSeconds > 60 * 60) {
      this.resetSeconds = 60 * 60;
    } else {
      this.resetSeconds = resetSeconds;
    }
  }
}

export async function requestWithBackoff(
  api: API,
  req: ApiRequest,
  attempt = 1,
): Promise<Response> {
  if (api.rateLimiter) {
    await api.rateLimiter.acquire();
  }

  try {
    const builtRequest = await api.buildRequest(req);
    const requestFunction = api.requestFunction || unsentRequest.performRequest;
    const response: Response = await requestFunction(builtRequest);
    if (response.status === 429) {
      // GitLab/Bitbucket too many requests
      const text = await response.text().catch(() => 'Too many requests');
      throw new Error(text);
    } else if (response.status === 403) {
      // GitHub too many requests
      const json = await response.json().catch(() => ({ message: '' }));
      if (json.message.match('API rate limit exceeded')) {
        const now = new Date();
        const nextWindowInSeconds = response.headers.has('X-RateLimit-Reset')
          ? parseInt(response.headers.get('X-RateLimit-Reset') ?? '0')
          : now.getTime() / 1000 + 60;

        throw new RateLimitError(json.message, nextWindowInSeconds);
      }
      response.json = () => Promise.resolve(json);
    }
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (attempt > 5 || error.message === "Can't refresh access token when using implicit auth") {
        throw error;
      } else if (error instanceof RateLimitError) {
        if (!api.rateLimiter) {
          const timeout = error.resetSeconds || attempt * attempt;
          console.info(
            `Pausing requests for ${timeout} ${
              attempt === 1 ? 'second' : 'seconds'
            } due to fetch failures:`,
            error.message,
          );
          api.rateLimiter = asyncLock();
          api.rateLimiter.acquire();
          setTimeout(() => {
            api.rateLimiter?.release();
            api.rateLimiter = undefined;
            console.info(`Done pausing requests`);
          }, 1000 * timeout);
        }
        return requestWithBackoff(api, req, attempt + 1);
      }
    }
    throw error;
  }
}

export async function readFile(
  id: string | null | undefined,
  fetchContent: () => Promise<string | Blob>,
  localForage: LocalForage,
  isText: boolean,
) {
  const key = id ? (isText ? `gh.${id}` : `gh.${id}.blob`) : null;
  const cached = key ? await localForage.getItem<string | Blob>(key) : null;
  if (cached) {
    return cached;
  }

  const content = await fetchContent();
  if (key) {
    await localForage.setItem(key, content);
  }
  return content;
}

function getFileMetadataKey(id: string) {
  return `gh.${id}.meta`;
}

export async function readFileMetadata(
  id: string | null | undefined,
  fetchMetadata: () => Promise<FileMetadata>,
  localForage: LocalForage,
) {
  const key = id ? getFileMetadataKey(id) : null;
  const cached = key && (await localForage.getItem<FileMetadata>(key));
  if (cached) {
    return cached;
  }

  const metadata = await fetchMetadata();
  if (key) {
    await localForage.setItem<FileMetadata>(key, metadata);
  }
  return metadata;
}

function getConflictingBranches(branchName: string) {
  // for cms/posts/post-1, conflicting branches are cms/posts, cms
  const parts = branchName.split('/');
  parts.pop();

  const conflictingBranches = parts.reduce((acc, _, index) => {
    acc = [...acc, parts.slice(0, index + 1).join('/')];
    return acc;
  }, [] as string[]);

  return conflictingBranches;
}

export async function throwOnConflictingBranches(
  branchName: string,
  getBranch: (name: string) => Promise<{ name: string }>,
  apiName: string,
) {
  const possibleConflictingBranches = getConflictingBranches(branchName);

  const conflictingBranches = await Promise.all(
    possibleConflictingBranches.map(b =>
      getBranch(b)
        .then(b => b.name)
        .catch(() => ''),
    ),
  );

  const conflictingBranch = conflictingBranches.filter(Boolean)[0];
  if (conflictingBranch) {
    throw new APIError(
      `Failed creating branch '${branchName}' since there is already a branch named '${conflictingBranch}'. Please delete the '${conflictingBranch}' branch and try again`,
      500,
      apiName,
    );
  }
}
