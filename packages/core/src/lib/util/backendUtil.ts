import flow from 'lodash/flow';
import fromPairs from 'lodash/fromPairs';
import { map } from 'lodash/fp';

import unsentRequest from './unsentRequest';
import APIError from './APIError';

export function filterByExtension(file: { path: string }, extension: string) {
  const path = file?.path || '';
  return path.endsWith(extension.startsWith('.') ? extension : `.${extension}`);
}

const formatters = {
  json: async (res: Response) => {
    const contentType = res.headers.get('Content-Type') || '';
    if (!contentType.startsWith('application/json') && !contentType.startsWith('text/json')) {
      throw new Error(`${contentType} is not a valid JSON Content-Type`);
    }
    return res.json();
  },
  text: async (res: Response) => res.text(),
  blob: async (res: Response) => res.blob(),
} as const;

function catchFormatErrors<T extends keyof typeof formatters>(
  format: T,
  formatter: typeof formatters[T],
) {
  return (res: Response) => {
    try {
      return formatter(res) as ReturnType<typeof formatters[T]>;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Response cannot be parsed into the expected format (${format}): ${error.message}`,
        );
      }

      throw error;
    }
  };
}

const responseFormatters = {
  json: catchFormatErrors('json', async (res: Response) => {
    const contentType = res.headers.get('Content-Type') || '';
    if (!contentType.startsWith('application/json') && !contentType.startsWith('text/json')) {
      throw new Error(`${contentType} is not a valid JSON Content-Type`);
    }
    return res.json();
  }),
  text: catchFormatErrors('text', async (res: Response) => res.text()),
  blob: catchFormatErrors('blob', async (res: Response) => res.blob()),
} as const;

interface ParseResponseOptions {
  expectingOk?: boolean;
  format?: keyof typeof responseFormatters;
  apiName?: string;
}

export async function parseResponse<T extends keyof typeof responseFormatters = 'text'>(
  res: Response,
  { expectingOk = true, format = 'text', apiName = '' }: ParseResponseOptions,
): Promise<Awaited<ReturnType<typeof responseFormatters[T]>>> {
  let body: Awaited<ReturnType<typeof responseFormatters[T]>>;
  try {
    const formatter = responseFormatters[format] ?? false;
    if (!formatter) {
      throw new Error(`${format} is not a supported response format.`);
    }
    body = await formatter(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new APIError(err.message, res.status, apiName);
  }

  if (expectingOk && !res.ok) {
    const isJSON = format === 'json';
    const message = isJSON ? body.message || body.msg || body.error?.message : body;
    throw new APIError(isJSON && message ? message : body, res.status, apiName);
  }

  return body;
}

export function responseParser<T extends keyof typeof responseFormatters = 'text'>(options: {
  expectingOk?: boolean;
  format: T;
  apiName: string;
}) {
  return (res: Response) => parseResponse<T>(res, options);
}

export function parseLinkHeader(header: string | null) {
  if (!header) {
    return {};
  }
  return flow([
    linksString => linksString.split(','),
    map((str: string) => str.trim().split(';')),
    map(([linkStr, keyStr]) => [
      keyStr.match(/rel="(.*?)"/)[1],
      linkStr
        .trim()
        .match(/<(.*?)>/)[1]
        .replace(/\+/g, '%20'),
    ]),
    fromPairs,
  ])(header);
}

export async function getAllResponses(
  url: string,
  options: { headers?: {} } = {},
  linkHeaderRelName: string,
  nextUrlProcessor: (url: string) => string,
) {
  const maxResponses = 30;
  let responseCount = 1;

  let req = unsentRequest.fromFetchArguments(url, options);

  const pageResponses = [];

  while (req && responseCount < maxResponses) {
    const pageResponse = await unsentRequest.performRequest(req);
    const linkHeader = pageResponse.headers.get('Link');
    const nextURL = linkHeader && parseLinkHeader(linkHeader)[linkHeaderRelName];

    const { headers = {} } = options;
    req = nextURL && unsentRequest.fromFetchArguments(nextUrlProcessor(nextURL), { headers });
    pageResponses.push(pageResponse);
    responseCount++;
  }

  return pageResponses;
}

export function getPathDepth(path: string) {
  const depth = path.split('/').length;
  return depth;
}
