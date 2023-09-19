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

const mockMatchMedia = jest.fn().mockReturnValue({
  matches: false,
});

Object.defineProperty(window, 'matchMedia', { value: mockMatchMedia });
