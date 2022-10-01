---
group: Accounts
weight: 30
title: GitHub
---
For repositories stored on GitHub, the `github` backend allows CMS users to log in directly with their GitHub account. Note that all users must have push access to your content repository for this to work.

Because Github [requires a server](https://github.com/SimpleCMS/simple-cms/issues/663#issuecomment-335023723) for authentication, Netlify facilitates basic GitHub authentication.

To enable basic GitHub authentication:

1. Follow the authentication provider setup steps in the [Netlify docs](https://www.netlify.com/docs/authentication-providers/#using-an-authentication-provider).
2. Add the following lines to your Simple CMS `config.yml` file:

```yaml
backend:
  name: github
  repo: owner-name/repo-name # Path to your GitHub repository
  # optional, defaults to master
  # branch: main
```

## Git Large File Storage (LFS)

Please note that the GitHub backend **does not** support [git-lfs](https://git-lfs.github.com/), see [this issue](https://github.com/SimpleCMS/simple-cms/issues/1206) for more information.
