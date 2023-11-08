const fs = require('fs-extra');
const fetch = require('node-fetch');
const path = require('path');
const { updateConfig } = require('../utils/config');
const { escapeRegExp } = require('../utils/regexp');
const {
  getExpectationsFilename,
  transformRecordedData: transformData,
  getGitClient,
} = require('./common');
const { merge } = require('lodash');

const BITBUCKET_REPO_OWNER_SANITIZED_VALUE = 'owner';
const BITBUCKET_REPO_NAME_SANITIZED_VALUE = 'repo';
const BITBUCKET_REPO_TOKEN_SANITIZED_VALUE = 'fakeToken';

const FAKE_OWNER_USER = {
  name: 'owner',
  display_name: 'owner',
  links: {
    avatar: {
      href: 'https://avatars1.githubusercontent.com/u/7892489?v=4',
    },
  },
  nickname: 'owner',
};

async function getEnvs() {
  const {
    BITBUCKET_REPO_OWNER: owner,
    BITBUCKET_REPO_NAME: repo,
    BITBUCKET_OUATH_CONSUMER_KEY: consumerKey,
    BITBUCKET_OUATH_CONSUMER_SECRET: consumerSecret,
  } = process.env;
  if (!owner || !repo || !consumerKey || !consumerSecret) {
    throw new Error(
      'Please set BITBUCKET_REPO_OWNER, BITBUCKET_REPO_NAME, BITBUCKET_OUATH_CONSUMER_KEY, BITBUCKET_OUATH_CONSUMER_SECRET environment variables',
    );
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const { access_token: token } = await fetch(
    `https://${consumerKey}:${consumerSecret}@bitbucket.org/site/oauth2/access_token`,
    { method: 'POST', body: params },
  ).then(r => r.json());

  return { owner, repo, token };
}

const API_URL = 'https://api.bitbucket.org/2.0/';

function get(token, path) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(r => r.json());
}

function post(token, path, body) {
  return fetch(`${API_URL}${path}`, {
    method: 'POST',
    ...(body ? { body } : {}),
    headers: {
      'Content-Type': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

function del(token, path) {
  return fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

async function prepareTestBitBucketRepo({ lfs }) {
  const { owner, repo, token } = await getEnvs();

  // postfix a random string to avoid collisions
  const postfix = Math.random().toString(32).slice(2);
  const testRepoName = `${repo}-${Date.now()}-${postfix}`;

  console.info('Creating repository', testRepoName, token);
  const response = await post(
    token,
    `repositories/${owner}/${testRepoName}`,
    JSON.stringify({ scm: 'git' }),
  );
  if (!response.ok) {
    throw new Error(`Unable to create repository. ${response.statusText}`);
  }

  const tempDir = path.join('.temp', testRepoName);
  await fs.remove(tempDir);
  let git = getGitClient();

  const repoUrl = `git@bitbucket.org:${owner}/${repo}.git`;

  console.info('Cloning repository', repoUrl);
  await git.clone(repoUrl, tempDir);
  git = getGitClient(tempDir);

  console.info('Pushing to new repository', testRepoName);

  console.info('Updating remote...');
  await git.removeRemote('origin');
  await git.addRemote('origin', `git@bitbucket.org:${owner}/${testRepoName}`);

  console.info('Pushing...');
  await git.push(['-u', 'origin', 'main']);

  console.info('Pushed to new repository', testRepoName);

  if (lfs) {
    console.info(`Enabling LFS for repo ${owner}/${repo}`);
    await git.addConfig('commit.gpgsign', 'false');
    await git.raw(['lfs', 'track', '*.png', '*.jpg']);
    await git.add('.gitattributes');
    await git.commit('chore: track images files under LFS');
    await git.push('origin', 'main');
  }

  return { owner, repo: testRepoName, tempDir };
}

async function getUser() {
  const { token } = await getEnvs();
  const user = await get(token, 'user');
  return { ...user, token, backendName: 'bitbucket' };
}

async function deleteRepositories({ owner, repo, tempDir }) {
  const { token } = await getEnvs();

  console.info('Deleting repository', `${owner}/${repo}`);
  await fs.remove(tempDir);

  await del(token, `repositories/${owner}/${repo}`);
}

async function resetOriginRepo({ owner, repo, tempDir }) {
  console.info('Resetting origin repo:', `${owner}/${repo}`);

  const { token } = await getEnvs();

  const pullRequests = await get(token, `repositories/${owner}/${repo}/pullrequests`);
  const ids = pullRequests.values.map(mr => mr.id);

  console.info('Closing pull requests:', ids);
  await Promise.all(
    ids.map(id => post(token, `repositories/${owner}/${repo}/pullrequests/${id}/decline`)),
  );
  const branches = await get(token, `repositories/${owner}/${repo}/refs/branches`);
  const toDelete = branches.values.filter(b => b.name !== 'main').map(b => b.name);

  console.info('Deleting branches', toDelete);
  await Promise.all(
    toDelete.map(branch => del(token, `repositories/${owner}/${repo}/refs/branches/${branch}`)),
  );

  console.info('Resetting main');
  const git = getGitClient(tempDir);
  await git.push(['--force', 'origin', 'main']);
  console.info('Done resetting origin repo:', `${owner}/${repo}`);
}

async function resetRepositories({ owner, repo, tempDir }) {
  await resetOriginRepo({ owner, repo, tempDir });
}

async function setupBitBucket(options) {
  const { lfs = false, ...rest } = options;

  console.info('Running tests - live data will be used!');
  const [user, repoData] = await Promise.all([getUser(), prepareTestBitBucketRepo({ lfs })]);

  console.info('Updating config...');
  await updateConfig(config => {
    merge(config, rest, {
      backend: {
        repo: `${repoData.owner}/${repoData.repo}`,
      },
    });
  });

  return { ...repoData, user };
}

async function teardownBitBucket(taskData) {
  await deleteRepositories(taskData);

  return null;
}

async function setupBitBucketTest(taskData) {
  await resetRepositories(taskData);

  return null;
}

const sanitizeString = (str, { owner, repo, token, ownerName }) => {
  let replaced = str
    .replace(new RegExp(escapeRegExp(owner), 'g'), BITBUCKET_REPO_OWNER_SANITIZED_VALUE)
    .replace(new RegExp(escapeRegExp(repo), 'g'), BITBUCKET_REPO_NAME_SANITIZED_VALUE)
    .replace(new RegExp(escapeRegExp(token), 'g'), BITBUCKET_REPO_TOKEN_SANITIZED_VALUE)
    .replace(
      new RegExp('https://secure.gravatar.+?/u/.+?v=\\d', 'g'),
      `${FAKE_OWNER_USER.links.avatar.href}`,
    )
    .replace(new RegExp(/\?token=.+?&/g), 'token=fakeToken&')
    .replace(new RegExp(/&client=.+?&/g), 'client=fakeClient&');

  if (ownerName) {
    replaced = replaced.replace(
      new RegExp(escapeRegExp(ownerName), 'g'),
      FAKE_OWNER_USER.display_name,
    );
  }

  return replaced;
};

const transformRecordedData = (expectation, toSanitize) => {
  const requestBodySanitizer = httpRequest => {
    let body;
    if (httpRequest.body && httpRequest.body.type === 'JSON' && httpRequest.body.json) {
      const bodyObject = JSON.parse(httpRequest.body.json);
      if (bodyObject.encoding === 'base64') {
        // sanitize encoded data
        const decodedBody = Buffer.from(bodyObject.content, 'base64').toString('binary');
        const sanitizedContent = sanitizeString(decodedBody, toSanitize);
        const sanitizedEncodedContent = Buffer.from(sanitizedContent, 'binary').toString('base64');
        bodyObject.content = sanitizedEncodedContent;
        body = JSON.stringify(bodyObject);
      } else {
        body = httpRequest.body.json;
      }
    } else if (httpRequest.body && httpRequest.body.type === 'STRING' && httpRequest.body.string) {
      body = httpRequest.body.string;
    } else if (
      httpRequest.body &&
      httpRequest.body.type === 'BINARY' &&
      httpRequest.body.base64Bytes
    ) {
      body = {
        encoding: 'base64',
        content: httpRequest.body.base64Bytes,
        contentType: httpRequest.body.contentType,
      };
    }
    return body;
  };

  const responseBodySanitizer = (httpRequest, httpResponse) => {
    let responseBody = null;
    if (httpResponse.body && httpResponse.body.string) {
      responseBody = httpResponse.body.string;
    } else if (
      httpResponse.body &&
      httpResponse.body.type === 'BINARY' &&
      httpResponse.body.base64Bytes
    ) {
      responseBody = {
        encoding: 'base64',
        content: httpResponse.body.base64Bytes,
      };
    } else if (httpResponse.body) {
      if (httpResponse.body && httpResponse.body.type === 'JSON' && httpResponse.body.json) {
        responseBody = JSON.stringify(httpResponse.body.json);
      } else {
        responseBody = httpResponse.body;
      }
    }

    // replace recorded user with fake one
    if (
      responseBody &&
      httpRequest.path === '/2.0/user' &&
      httpRequest.headers.host.includes('api.bitbucket.org')
    ) {
      responseBody = JSON.stringify(FAKE_OWNER_USER);
    }

    return responseBody;
  };

  return transformData(expectation, requestBodySanitizer, responseBodySanitizer);
};

async function teardownBitBucketTest(taskData) {
  await resetRepositories(taskData);

  return null;
}

module.exports = {
  setupBitBucket,
  teardownBitBucket,
  setupBitBucketTest,
  teardownBitBucketTest,
};
