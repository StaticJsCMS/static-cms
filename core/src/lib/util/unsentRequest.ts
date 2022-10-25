import type { ApiRequest, ApiRequestObject, ApiRequestURL } from './API';

function isAbortControllerSupported() {
  if (typeof window !== 'undefined') {
    return !!window.AbortController;
  }
  return false;
}

const timeout = 60;

function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<Response> {
  if ((init && init.signal) || !isAbortControllerSupported()) {
    return fetch(input, init);
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);
  return fetch(input, { ...init, signal: controller.signal })
    .then(res => {
      clearTimeout(timeoutId);
      return res;
    })
    .catch((e: unknown) => {
      if (e instanceof DOMException) {
        if (e.name === 'AbortError' || e.name === 'DOMException') {
          throw new Error(`Request timed out after ${timeout} seconds`);
        }
      }
      throw e;
    });
}

function decodeParams(paramsString: string): Record<string, string> {
  return paramsString
    .split('&')
    .map(s => s.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);
}

function fromURL(wholeURL: string): ApiRequestURL {
  const [url, allParamsString] = wholeURL.split('?');
  return { url, ...(allParamsString ? { params: decodeParams(allParamsString) } : {}) };
}

function fromFetchArguments(wholeURL: string, options?: RequestInit): ApiRequestObject {
  return {
    ...fromURL(wholeURL),
    ...(options ? options : {}),
  };
}

function encodeParams(params: Required<ApiRequestURL>['params']): string {
  return Object.entries(params)
    .map(([v, k]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

function toURL(req: ApiRequestURL): string {
  return `${req.url}${req.params ? `?${encodeParams(req.params)}` : ''}`;
}

function toFetchArguments(req: ApiRequestObject): {
  input: RequestInfo | URL;
  init?: RequestInit | undefined;
} {
  const { url, params, ...rest } = req;

  return { input: toURL({ url, params }), init: rest };
}

function maybeRequestArg(req: ApiRequest): ApiRequestObject {
  if (typeof req === 'string') {
    return fromURL(req);
  }

  return req;
}

function ensureRequestArg(func: (req: ApiRequestObject) => Promise<Response>) {
  return (req: ApiRequest) => func(maybeRequestArg(req));
}

// This actually performs the built request object
const performRequest = ensureRequestArg((req: ApiRequestObject) => {
  const { input, init } = toFetchArguments(req);
  return fetchWithTimeout(input, init);
});

// withRoot sets a root URL, unless the URL is already absolute
const absolutePath = new RegExp('^(?:[a-z]+:)?//', 'i');
const getAbsoluteRoot = (root: string, url: string) => {
  if (absolutePath.test(url)) {
    return url;
  }
  return root && url && url[0] !== '/' && root[root.length - 1] !== '/'
    ? `${root}/${url}`
    : `${root}${url}`;
};

const withWrapper =
  <K extends keyof ApiRequestObject>(key: K) =>
  (value: ApiRequestObject[K], req: ApiRequest): ApiRequestObject => {
    if (typeof req === 'string') {
      return fromFetchArguments(req, { [key]: value });
    }

    return {
      ...req,
      [key]: value,
    };
  };

const withRoot = (root: string) => (req: ApiRequest) => {
  return withWrapper('url')(getAbsoluteRoot(root, typeof req === 'string' ? req : req.url), req);
};
const withMethod = withWrapper('method');
const withBody = withWrapper('body');
const withHeaders = withWrapper('headers');
const withParams = withWrapper('params');
const withCache = withWrapper('cache');
const withNoCache = (req: ApiRequest) => withCache('no-cache', req);

export default {
  fetchWithTimeout,
  fromURL,
  toURL,
  fromFetchArguments,
  performRequest,
  getAbsoluteRoot,
  withRoot,
  withMethod,
  withBody,
  withHeaders,
  withParams,
  withNoCache,
};
