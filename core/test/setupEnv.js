global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof window === 'undefined') {
  global.window = {
    URL: {
      createObjectURL: jest.fn(),
    },
    localStorage: {
      removeItem: jest.fn(),
      getItem: jest.fn(),
    },
  };
}
