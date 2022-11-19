# CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).

For details on contributing to documentation, see [Website Directory Readme](https://github.com/StaticJsCMS/static-cms/blob/main/website/README.md).

## Setup

> Install [Node.js (LTS)](https://nodejs.org/) and [yarn](https://yarnpkg.com/en/docs/install) on your system.

### Install dependencies

> Only required on the first run, subsequent runs can use `yarn start` to both bootstrap and run the development server.

```sh
git clone https://github.com/StaticJsCMS/static-cms
cd static-cms
yarn
```

### Run locally

```sh
yarn start
```

## Available scripts

### start

Starts the development server. This task runs both the `clean` and `develop` scripts.

```sh
yarn start
```

### clean

Removes the `dist` directory.

```sh
yarn clean
```

### build

Runs the `clean` script and builds the @static-cms/core.

```sh
yarn build
```

### format

Formats code and docs according to our style guidelines.

```sh
yarn format
```

## Pull Requests

We actively welcome your pull requests!

If you need help with Git or our workflow, please ask. We want your contributions even if you're just learning Git. Our maintainers are happy to help!

Static CMS uses the [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) + [Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Additionally, PR's should be [rebased](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) on main when opened, and again before merging.

1. Fork the repo.
2. Create a branch from `main`. If you're addressing a specific issue, prefix your branch name with the issue number.
3. If you've added code that should be tested, add tests.
4. If you've changed APIs, update the documentation.
5. Use `yarn format` to format and lint your code.
6. PR's must be rebased before merge (feel free to ask for help).
7. PR must be reviewed prior to merging.

## Debugging

`yarn start` spawns a development server and uses `dev-test/config.yml` and `dev-test/index.html` to serve the CMS.
In order to debug a specific issue follow the next steps:

1. Replace `dev-test/config.yml` with the relevant `config.yml`. If you want to test the backend, make sure that the `backend` property of the config indicates which backend you use (Github, Gitlab, Bitbucket etc) and path to the repo.

```js
backend:
  name: github
  repo: owner-name/repo-name
```

2. Run `yarn start`
3. Open `http://localhost:8080/` in the browser and you should have access to the CMS

### Debugging Git Gateway

When debugging the CMS with Git Gateway you must:

1. Have a Netlify site with [Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/) and [Netlify Identity](https://docs.netlify.com/visitor-access/identity/) enabled. An easy way to create such a site is to use a [template](https://staticjscms.netlify.app/docs/start-with-a-template/), for example the [Gatsby template](https://app.netlify.com/start/deploy?repository=https://github.com/AustinGreen/gatsby-starter-netlify-cms&stack=cms)
2. Tell the CMS the URL of your Netlify site using a local storage item. To do so:

    1. Open `http://localhost:8080/` in the browser
    2. Open the Developer Console. Write the below command and press enter: `localStorage.setItem('netlifySiteURL', 'https://yourwebsiteurl.netlify.app/')`
    3. To be sure, you can run this command as well: `localStorage.getItem('netlifySiteURL')`
    4. Refresh the page
    5. You should be able to log in via your Netlify Identity email/password

## License

By contributing to Static CMS, you agree that your contributions will be licensed under its [MIT license](LICENSE).
