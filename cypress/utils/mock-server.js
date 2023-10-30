const { mockServerClient } = require("mockserver-client");
const mockserver = require("mockserver-node");

const PROXY_PORT = 1080;
const PROXY_HOST = "localhost";

const start = async () => {
  await mockserver.start_mockserver({
    serverPort: PROXY_PORT,
  });

  console.info("Mock server started!");
};

const stop = async () => {
  mockserver.stop_mockserver({
    serverPort: PROXY_PORT,
  });

  console.info("Mock server stopped!");
};

const retrieveRecordedExpectations = async () => {
  const promise = new Promise((resolve, reject) => {
    mockServerClient(PROXY_HOST, PROXY_PORT).retrieveRecordedExpectations({}).then(resolve, reject);
  });

  let timeout;
  const timeoutPromise = new Promise((resolve) => {
    timeout = setTimeout(() => {
      console.warn("retrieveRecordedExpectations timeout");
      resolve([]);
    }, 3000);
  });

  let recorded = await Promise.race([promise, timeoutPromise]);
  clearTimeout(timeout);

  recorded = recorded.filter(({ httpRequest }) => {
    const { host = [] } = httpRequest.headers;

    // host is an array of strings
    return (
      host.includes("api.github.com") ||
      (host.includes("gitlab.com") && httpRequest.path.includes("api/v4")) ||
      host.includes("api.bitbucket.org") ||
      (host.includes("bitbucket.org") && httpRequest.path.includes("info/lfs")) ||
      host.includes("api.media.atlassian.com") ||
      host.some((h) => h.includes("netlify.com")) ||
      host.some((h) => h.includes("netlify.app")) ||
      host.some((h) => h.includes("s3.amazonaws.com"))
    );
  });

  return recorded;
};

const resetMockServerState = async () => {
  const promise = new Promise((resolve, reject) => {
    mockServerClient(PROXY_HOST, PROXY_PORT).reset().then(resolve, reject);
  });

  await promise;
};

module.exports = {
  start,
  stop,
  resetMockServerState,
  retrieveRecordedExpectations,
};
