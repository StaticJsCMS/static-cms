/* eslint-disable import/prefer-default-export */
const unifiedMock = jest.fn().mockImplementation(() => {
  return {
    use: unifiedMock,
    process: unifiedMock,
  };
});

export { unifiedMock as unified };
