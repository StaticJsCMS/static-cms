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
  };
}

global.URL.createObjectURL = jest.fn();
