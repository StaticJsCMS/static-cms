const fetch = require('node-fetch');
const {
  transformRecordedData: transformGitHub,
  setupGitHub,
  teardownGitHub,
  setupGitHubTest,
  teardownGitHubTest,
} = require('./github');
const {
  transformRecordedData: transformGitLab,
  setupGitLab,
  teardownGitLab,
  setupGitLabTest,
  teardownGitLabTest,
} = require('./gitlab');
const { getGitClient } = require('./common');

function getEnvs() {
  const {
    NETLIFY_API_TOKEN: netlifyApiToken,
    GITHUB_REPO_TOKEN: githubToken,
    GITLAB_REPO_TOKEN: gitlabToken,
    NETLIFY_INSTALLATION_ID: installationId,
  } = process.env;
  if (!netlifyApiToken) {
    throw new Error(
      'Please set NETLIFY_API_TOKEN, GITHUB_REPO_TOKEN, GITLAB_REPO_TOKEN, NETLIFY_INSTALLATION_ID  environment variables',
    );
  }
  return { netlifyApiToken, githubToken, gitlabToken, installationId };
}

const apiRoot = 'https://api.netlify.com/api/v1/';

async function get(netlifyApiToken, path) {
  const response = await fetch(`${apiRoot}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`,
    },
  }).then(res => res.json());

  return response;
}

async function post(netlifyApiToken, path, payload) {
  const response = await fetch(`${apiRoot}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`,
    },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  }).then(res => res.json());

  return response;
}

async function del(netlifyApiToken, path) {
  const response = await fetch(`${apiRoot}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`,
    },
  }).then(res => res.text());

  return response;
}

async function createSite(netlifyApiToken, payload) {
  return post(netlifyApiToken, 'sites', payload);
}

async function enableIdentity(netlifyApiToken, siteId) {
  return post(netlifyApiToken, `sites/${siteId}/identity`, {});
}

async function enableGitGateway(netlifyApiToken, siteId, provider, token, repo) {
  return post(netlifyApiToken, `sites/${siteId}/services/git/instances`, {
    [provider]: {
      repo,
      access_token: token,
    },
  });
}

async function enableLargeMedia(netlifyApiToken, siteId) {
  return post(netlifyApiToken, `sites/${siteId}/services/large-media/instances`, {});
}

async function waitForDeploys(netlifyApiToken, siteId) {
  for (let i = 0; i < 10; i++) {
    const deploys = await get(netlifyApiToken, `sites/${siteId}/deploys`);
    if (deploys.some(deploy => deploy.state === 'ready')) {
      console.info('Deploy finished for site:', siteId);
      return;
    }
    console.info('Waiting on deploy of site:', siteId);
    await new Promise(resolve => setTimeout(resolve, 30 * 1000));
  }
  console.info('Timed out waiting on deploy of site:', siteId);
}

async function createUser(netlifyApiToken, siteUrl, email, password) {
  const response = await fetch(`${siteUrl}/.netlify/functions/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${netlifyApiToken}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    console.info('User created successfully');
  } else {
    throw new Error('Failed to create user');
  }
}

const netlifySiteURL = 'https://fake-site-url.netlify.com/';
const email = 'static@p-m.si';
const password = '12345678';
const backendName = 'git-gateway';

const methods = {
  github: {
    setup: setupGitHub,
    teardown: teardownGitHub,
    setupTest: setupGitHubTest,
    teardownTest: teardownGitHubTest,
    transformData: transformGitHub,
    createSite: (netlifyApiToken, result) => {
      const { installationId } = getEnvs();
      return createSite(netlifyApiToken, {
        repo: {
          provider: 'github',
          installation_id: installationId,
          repo: `${result.owner}/${result.repo}`,
        },
      });
    },
    token: () => getEnvs().githubToken,
  },
  gitlab: {
    setup: setupGitLab,
    teardown: teardownGitLab,
    setupTest: setupGitLabTest,
    teardownTest: teardownGitLabTest,
    transformData: transformGitLab,
    createSite: async (netlifyApiToken, result) => {
      const { id, public_key } = await post(netlifyApiToken, 'deploy_keys');
      const { gitlabToken } = getEnvs();
      const project = `${result.owner}/${result.repo}`;
      await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(project)}/deploy_keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${gitlabToken}`,
        },
        body: JSON.stringify({ title: 'Netlify Deploy Key', key: public_key, can_push: false }),
      }).then(res => res.json());

      const site = await createSite(netlifyApiToken, {
        account_slug: result.owner,
        repo: {
          provider: 'gitlab',
          repo: `${result.owner}/${result.repo}`,
          deploy_key_id: id,
        },
      });

      await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(project)}/hooks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${gitlabToken}`,
        },
        body: JSON.stringify({
          url: 'https://api.netlify.com/hooks/gitlab',
          push_events: true,
          merge_requests_events: true,
          enable_ssl_verification: true,
        }),
      }).then(res => res.json());

      return site;
    },
    token: () => getEnvs().gitlabToken,
  },
};

async function setupGitGateway(options) {
  const { provider, ...rest } = options;
  const result = await methods[provider].setup(rest);

  const { netlifyApiToken } = getEnvs();

  console.info(`Creating Netlify Site for provider: ${provider}`);
  let site_id, ssl_url;
  try {
    ({ site_id, ssl_url } = await methods[provider].createSite(netlifyApiToken, result));
  } catch (e) {
    console.error(e);
    throw e;
  }

  console.info('Enabling identity for site:', site_id);
  await enableIdentity(netlifyApiToken, site_id);

  console.info('Enabling git gateway for site:', site_id);
  const token = methods[provider].token();
  await enableGitGateway(
    netlifyApiToken,
    site_id,
    provider,
    token,
    `${result.owner}/${result.repo}`,
  );

  console.info('Enabling large media for site:', site_id);
  await enableLargeMedia(netlifyApiToken, site_id);

  const git = getGitClient(result.tempDir);
  await git.raw([
    'config',
    '-f',
    '.lfsconfig',
    'lfs.url',
    `https://${site_id}.netlify.com/.netlify/large-media`,
  ]);
  await git.addConfig('commit.gpgsign', 'false');
  await git.add('.lfsconfig');
  await git.commit('add .lfsconfig');
  await git.push('origin', 'main');

  await waitForDeploys(netlifyApiToken, site_id);
  console.info('Creating user for site:', site_id, 'with email:', email);

  try {
    await createUser(netlifyApiToken, ssl_url, email, password);
  } catch (e) {
    console.error(e);
  }

  return {
    ...result,
    user: {
      ...result.user,
      backendName,
      netlifySiteURL: ssl_url,
      email,
      password,
    },
    site_id,
    ssl_url,
    provider,
  };
}

async function teardownGitGateway(taskData) {
  const { netlifyApiToken } = getEnvs();
  const { site_id } = taskData;
  console.info('Deleting Netlify site:', site_id);
  await del(netlifyApiToken, `sites/${site_id}`);

  return methods[taskData.provider].teardown(taskData);
}

async function setupGitGatewayTest(taskData) {
  return methods[taskData.provider].setupTest(taskData);
}

async function teardownGitGatewayTest(taskData) {
  return methods[taskData.provider].teardownTest(taskData, {});
}

module.exports = {
  setupGitGateway,
  teardownGitGateway,
  setupGitGatewayTest,
  teardownGitGatewayTest,
};
