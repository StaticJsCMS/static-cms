<div align="center">
  <img src="static-cms-logo.png" width="500px" />

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/StaticJsCMS/static-cms/blob/main/LICENSE)
[![Build](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml/badge.svg)](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml)
[![npm latest package](https://img.shields.io/npm/v/@staticcms/core/latest.svg)](https://www.npmjs.com/package/@staticcms/core)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/StaticJsCMS/static-cms/blob/main/CONTRIBUTING.md)
<div align="center">

[Docs](https://staticcms.org/)
| [Demo](https://demo.staticcms.org/)
| [Issues](https://github.com/StaticJsCMS/static-cms/issues)
| [Discord](https://discord.gg/ZWJM9pBMjj)

</div>
</div>

A CMS for static site generators. Give users a simple way to edit and add content to any site built with a static site generator.

## How It Works

Static CMS is a single-page app that you pull into the `/admin` part of your site.

It presents a clean UI for editing content stored in a Git repository.

You setup a YAML config to describe the content model of your site, and typically tweak the main layout of the CMS a bit to fit your own site.

When a user navigates to `/admin/` they'll be prompted to log in, and once authenticated they'll be able to create new content or edit existing content.

Read more about Static CMS [Core Concepts](https://staticcms.org/docs/intro/).

# Installation and Configuration

The Static CMS can be used in two different ways.

- A Quick and easy install, that requires you to create a single HTML file and a configuration file. All the CMS JavaScript and CSS are loaded from a CDN.
  To learn more about this installation method, refer to the [CDN Hosting Guide](https://staticcms.org/docs/add-to-your-site-cdn/)
- A complete, more complex install, that gives you more flexibility but requires that you use a static site builder with a build system that supports npm packages.
  To learn more about this installation method, refer to the [Bundling Guide](https://staticcms.org/docs/add-to-your-site-bundling/)

# Projects

|Name|Status|
|---|---|
| [static-cms](https://github.com/StaticJsCMS/static-cms) | [![Build](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml/badge.svg)](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml) |
| [static-cms-proxy-server](https://github.com/StaticJsCMS/static-cms-proxy-server) | [![Build and Test](https://github.com/StaticJsCMS/static-cms-proxy-server/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StaticJsCMS/static-cms-proxy-server/actions/workflows/build-and-test.yml) |

# Platform Templates

|Name|Status|
|---|---|
| [Next](https://nextjs.org/) - [static-cms-next-netlify-template](https://github.com/StaticJsCMS/static-cms-next-netlify-template) | [![Netlify Status](https://api.netlify.com/api/v1/badges/d1b5d377-b5b3-4a4d-8034-21ba585cd444/deploy-status)](https://app.netlify.com/sites/static-cms-next/deploys) |
| [Gastby](https://www.gatsbyjs.com/) - [static-cms-gatsby-netlify-template](https://github.com/StaticJsCMS/static-cms-gatsby-netlify-template) | [![Netlify Status](https://api.netlify.com/api/v1/badges/6a9191dd-0f22-4942-8845-cb855e9efcd8/deploy-status)](https://app.netlify.com/sites/static-cms-gatsby/deploys) |
| [Hugo](https://gohugo.io/) - [static-cms-hugo-netlify-template](https://github.com/StaticJsCMS/static-cms-hugo-netlify-template) | [![Netlify Status](https://api.netlify.com/api/v1/badges/66a114d7-c5a8-4f03-ae35-a35f88fb1d90/deploy-status)](https://app.netlify.com/sites/static-cms-hugo/deploys) |
| [Nuxt](https://nuxtjs.org/) - [static-cms-nuxt-netlify-template](https://github.com/StaticJsCMS/static-cms-nuxt-netlify-template) | [![Netlify Status](https://api.netlify.com/api/v1/badges/eea4314f-e9ae-4414-8ed5-e14d69e50971/deploy-status)](https://app.netlify.com/sites/static-cms-nuxt/deploys) |
| [Preact](https://preactjs.com/) - [static-cms-preact-netlify-template](https://github.com/StaticJsCMS/static-cms-preact-netlify-template) | [![Netlify Status](https://api.netlify.com/api/v1/badges/0cf054ad-1be4-4d93-8a3a-0841475e6032/deploy-status)](https://app.netlify.com/sites/static-cms-preact/deploys) |
| [Eleventy](https://www.11ty.dev/) - [static-cms-eleventy-netlify-template](https://github.com/StaticJsCMS/static-cms-eleventy-netlify-template) | [![Netlify Status](https://api.netlify.com/api/v1/badges/1880280d-def5-4773-9db3-d0315a986d45/deploy-status)](https://app.netlify.com/sites/static-cms-eleventy/deploys) |

# Workflow Templates

|Name|Status|
|---|---|
| Editorial Workflow (using [Next](https://nextjs.org/)) - [static-cms-next-netlify-editoral-template](https://github.com/StaticJsCMS/static-cms-next-netlify-editoral-template) | [![Netlify Status](https://api.netlify.com/api/v1/badges/94f05f8f-379a-4dd5-885f-ac2a0cb8a012/deploy-status)](https://app.netlify.com/sites/static-cms-next-editorial/deploys) |

# Other Projects

|Name|Status|
|---|---|
| [gatsby-plugin-static-cms](https://github.com/StaticJsCMS/gatsby-plugin-static-cms) | [![Build](https://github.com/StaticJsCMS/gatsby-plugin-static-cms/actions/workflows/build.yml/badge.svg)](https://github.com/StaticJsCMS/gatsby-plugin-static-cms/actions/workflows/build.yml) |

# Contributing

New contributors are always welcome! Check out [CONTRIBUTING.md](https://github.com/StaticJsCMS/static-cms/blob/main/CONTRIBUTING.md) to get involved.

# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/StaticJsCMS/static-cms/releases) page.

# License

Static CMS is released under the [MIT License](LICENSE).
Please make sure you understand its [implications and guarantees](https://writing.kemitchell.com/2016/09/21/MIT-License-Line-by-Line.html).

# Netlify CMS

Static CMS is a fork of Netlify CMS focusing on the core product over adding massive, scope expanding, new features.
