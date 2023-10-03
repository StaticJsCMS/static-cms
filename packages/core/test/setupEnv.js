if (typeof window === 'undefined') {
  global.window = {
    URL: {
      createObjectURL: jest.fn(),
    },
    localStorage: {
      removeItem: jest.fn(),
      getItem: jest.fn(),
    },
    navigator: {
      platform: 'Win',
    },
    matchMedia: () => ({
      matches: false,
    }),
  };
}

global.URL.createObjectURL = jest.fn();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
