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

export interface MockFetch {
  baseUrl: string;
  mocks: Record<string, Response>;
  when: (url: string) => {
    reply: <T>(
      status: number,
      data: {
        json?: T;
        text?: string;
      },
      options?: {
        contentType?: string;
        headers?: Record<string, string>;
      },
    ) => void;
  };
  reset: () => void;
}

const mockFetch = (baseUrl: string): MockFetch => {
  const mockedFetch: MockFetch = {
    baseUrl,
    mocks: {},
    when(this: MockFetch, url: string) {
      return {
        reply: <T>(
          status: number,
          data: {
            json?: T;
            text?: string;
          },
          options?: {
            contentType?: string;
            headers?: Record<string, string>;
          },
        ) => {
          this.mocks[`${baseUrl}${url}`] = createMockRequest(status, data, options);
        },
      };
    },
    reset(this: MockFetch) {
      this.mocks = {};
    },
  };

  global.fetch = jest.fn().mockImplementation((url: string) => {
    return Promise.resolve(mockedFetch.mocks[url.split('?')[0]]);
  });

  return mockedFetch;
};

export default mockFetch;
