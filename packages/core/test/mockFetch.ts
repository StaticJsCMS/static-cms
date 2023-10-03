import { isNotNullish } from '@staticcms/core/lib/util/null.util';

export const createMockRequest = <T>(
  status: number,
  data: {
    json?: T;
    text?: string;
  },
  options: {
    contentType?: string;
    headers?: Record<string, string>;
  } = {},
): Response => {
  const { contentType = 'application/json', headers = {} } = options;

  const finalHeaders = (function () {
    const data: Record<string, string> = headers;

    return {
      get: (key: string) => {
        return data[key];
      },
      set: (key: string, value: string) => {
        data[key] = value;
      },
    };
  })();

  finalHeaders.set('Content-Type', contentType);

  return {
    status,
    ok: status < 400,
    headers: finalHeaders,
    json: () => Promise.resolve(data.json),
    text: () => Promise.resolve(data.text),
  } as Response;
};

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'HEAD';

export type QueryCheckFunc = (query: URLSearchParams) => boolean;

export interface RequestData {
  query: string | true | QueryCheckFunc;
  response: MockResponse<unknown> | MockResponseFunc<unknown>;
  limit?: number;
  used?: number;
}

export type ReplyFunc = <T>(response: MockResponse<T> | MockResponseFunc<T>) => void;
export type RepeatFunc = (limit: number) => { reply: ReplyFunc };

export interface MockFetch {
  baseUrl: string;
  mocks: Record<string, Partial<Record<FetchMethod, RequestData[]>>>;
  when: (
    method: FetchMethod,
    url: string,
  ) => {
    query: (query: string | true | QueryCheckFunc) => { reply: ReplyFunc; repeat: RepeatFunc };
    repeat: RepeatFunc;
    reply: ReplyFunc;
  };
  reset: () => void;
}

export interface MockResponse<T> {
  status: number;
  json?: T;
  text?: string;
  contentType?: string;
  headers?: Record<string, string>;
}

export type MockResponseFunc<T> = (url: string) => MockResponse<T> | Promise<MockResponse<T>>;

const mockFetch = (baseUrl: string): MockFetch => {
  const mockedFetch: MockFetch = {
    baseUrl,
    mocks: {},
    // eslint-disable-next-line object-shorthand
    when: function (this: MockFetch, method: FetchMethod, url: string) {
      const reply =
        (query: string | true | QueryCheckFunc = '') =>
        (limit?: number) =>
        <T>(response: MockResponse<T> | MockResponseFunc<T>) => {
          const fullUrl = `${baseUrl}${url}`;
          if (!(fullUrl in this.mocks)) {
            this.mocks[fullUrl] = {};
          }

          if (!(method in this.mocks[fullUrl])) {
            this.mocks[fullUrl][method] = [];
          }

          this.mocks[fullUrl][method]?.push({
            query,
            response,
            limit,
          });
        };

      const repeat =
        (query: string | true | QueryCheckFunc = '') =>
        (limit: number) => {
          return {
            reply: reply(query)(limit),
          };
        };

      return {
        query: (query: string | true | QueryCheckFunc) => {
          return {
            repeat: repeat(query),
            reply: reply(query)(),
          };
        },
        repeat: repeat(),
        reply: reply()(),
      };
    },
    reset(this: MockFetch) {
      this.mocks = {};
    },
  };

  global.fetch = jest
    .fn()
    .mockImplementation(async (fullUrl: string, { method = 'GET' }: { method: FetchMethod }) => {
      const [url, ...rest] = fullUrl.split('?');
      const query = rest.length > 0 ? rest[0] : '';

      const mockResponses = [...(mockedFetch.mocks[url]?.[method] ?? [])];
      if (!mockResponses) {
        return Promise.resolve(undefined);
      }

      for (let i = 0; i < mockResponses.length; i++) {
        const mockResponse = mockResponses[i];

        const limit = mockResponse.limit;
        const used = mockResponse.used ?? 0;

        if (isNotNullish(limit)) {
          if (used >= limit) {
            continue;
          }
        }

        if (isNotNullish(mockResponse.query) && mockResponse.query !== true) {
          if (typeof mockResponse.query === 'string') {
            if (mockResponse.query !== query) {
              continue;
            }
          } else if (!mockResponse.query(new URLSearchParams(query))) {
            continue;
          }
        }

        let responseData = mockResponse.response;
        if (typeof responseData === 'function') {
          responseData = await responseData(fullUrl);
        }

        const response = createMockRequest(
          responseData.status,
          {
            json: responseData.json,
            text: responseData.text,
          },
          {
            contentType: responseData.contentType,
            headers: responseData.headers,
          },
        );

        mockedFetch.mocks[url][method]![i] = {
          ...mockResponse,
          used: used + 1,
        };

        return Promise.resolve(response);
      }

      return Promise.resolve(undefined);
    });

  return mockedFetch;
};

export default mockFetch;
