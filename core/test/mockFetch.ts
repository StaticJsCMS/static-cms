export const createMockRequest = <T>(status: number, data: T, contentType = 'application/json'): Response => {
  const headers = new Headers();
  headers.set('Content-Type', contentType);

  return {
    status,
    headers,
    json: () => Promise.resolve(data),
  } as Response;
};

export interface MockFetch {
  baseUrl: string;
  mocks: Record<string, Response>;
  when: (url: string) => {
    reply: <T>(status: number, data: T) => void;
  };
  reset: () => void;
}

const mockFetch = (baseUrl: string): MockFetch => {
  const mockedFetch: MockFetch = {
    baseUrl,
    mocks: {},
    when(this: MockFetch, url: string) {
      return {
        reply: <T>(status: number, data: T, contentType?: string) => {
          console.log(`${baseUrl}${url}`);
          this.mocks[`${baseUrl}${url}`] = createMockRequest(status, data, contentType);
        },
      };
    },
    reset(this: MockFetch) {
      this.mocks = {};
    },
  };

  global.fetch = jest.fn().mockImplementation((url: string) => {
    return Promise.resolve(mockedFetch.mocks[url]);
  });

  return mockedFetch;
};

export default mockFetch;
