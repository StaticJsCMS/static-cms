<div align="center">
  <img src="static-cms-logo.png" width="500px" />

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/StaticJsCMS/static-cms/blob/main/LICENSE)
[![Build](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml/badge.svg)](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml)
[![npm latest package](https://img.shields.io/npm/v/@staticcms/core/latest.svg)](https://www.npmjs.com/package/@staticcms/core)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/StaticJsCMS/static-cms/blob/main/CONTRIBUTING.md)
[![All Contributors](https://img.shields.io/github/all-contributors/StaticJsCMS/static-cms?color=ee8449&style=flat-square)](#contributors)
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

|Name|Site/Demo|Status|
|---|---|---|
| [@staticcms/core](https://github.com/StaticJsCMS/static-cms/tree/main/packages/core) | [demo.staticcms.org](https://demo.staticcms.org/) | [![Build](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml/badge.svg)](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml) [![npm latest package](https://img.shields.io/npm/v/@staticcms/core/latest.svg)](https://www.npmjs.com/package/@staticcms/core) |
| [@staticcms/app](https://github.com/StaticJsCMS/static-cms/tree/main/packages/app) | [demo.staticcms.org](https://demo.staticcms.org/) | [![Build](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml/badge.svg)](https://github.com/StaticJsCMS/static-cms/actions/workflows/build.yml) [![npm latest package](https://img.shields.io/npm/v/@staticcms/app/latest.svg)](https://www.npmjs.com/package/@staticcms/app) |
| [demo](https://github.com/StaticJsCMS/static-cms/tree/main/packages/demo) | [demo.staticcms.org](https://demo.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/8c1b73b5-d348-45cd-be2a-7af84be5541f/deploy-status)](https://app.netlify.com/sites/demo-staticjscms/deploys) |
| [docs](https://github.com/StaticJsCMS/static-cms/tree/main/packages/docs) | [staticcms.org](https://www.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/91f6eeb2-f1ed-4e4e-bdd1-f5c6bd01ccd5/deploy-status)](https://app.netlify.com/sites/staticjscms/deploys) |

# Platform Templates

|Name|Demo|Status|
|---|---|---|
| [Next](https://nextjs.org/) - [static-cms-next-netlify-template](https://github.com/StaticJsCMS/static-cms-next-netlify-template) | [next-template.staticcms.org](https://next-template.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/d1b5d377-b5b3-4a4d-8034-21ba585cd444/deploy-status)](https://app.netlify.com/sites/static-cms-next/deploys) |
| [Gatsby](https://www.gatsbyjs.com/) - [static-cms-gatsby-netlify-template](https://github.com/StaticJsCMS/static-cms-gatsby-netlify-template) | [gatsby.staticcms.org](https://gatsby.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/6a9191dd-0f22-4942-8845-cb855e9efcd8/deploy-status)](https://app.netlify.com/sites/static-cms-gatsby/deploys) |
| [Hugo](https://gohugo.io/) - [static-cms-hugo-netlify-template](https://github.com/StaticJsCMS/static-cms-hugo-netlify-template) | [hugo.staticcms.org](https://hugo.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/66a114d7-c5a8-4f03-ae35-a35f88fb1d90/deploy-status)](https://app.netlify.com/sites/static-cms-hugo/deploys) |
| [Nuxt](https://nuxtjs.org/) - [static-cms-nuxt-netlify-template](https://github.com/StaticJsCMS/static-cms-nuxt-netlify-template) | [nuxt.staticcms.org](https://nuxt.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/eea4314f-e9ae-4414-8ed5-e14d69e50971/deploy-status)](https://app.netlify.com/sites/static-cms-nuxt/deploys) |
| [Preact](https://preactjs.com/) - [static-cms-preact-netlify-template](https://github.com/StaticJsCMS/static-cms-preact-netlify-template) | [preact.staticcms.org](https://preact.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/0cf054ad-1be4-4d93-8a3a-0841475e6032/deploy-status)](https://app.netlify.com/sites/static-cms-preact/deploys) |
| [Eleventy](https://www.11ty.dev/) - [static-cms-eleventy-netlify-template](https://github.com/StaticJsCMS/static-cms-eleventy-netlify-template) | [eleventy.staticcms.org](https://eleventy.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/1880280d-def5-4773-9db3-d0315a986d45/deploy-status)](https://app.netlify.com/sites/static-cms-eleventy/deploys) |

# Workflow Templates

|Name|Demo|Status|
|---|---|---|
| [Editorial Workflow Template](https://github.com/StaticJsCMS/static-cms-next-netlify-editoral-template) | Production: [next-editorial.staticcms.org](https://next-editorial.staticcms.org/)<br />Staging: [next-editorial-staging.staticcms.org](https://next-editorial-staging.staticcms.org/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/94f05f8f-379a-4dd5-885f-ac2a0cb8a012/deploy-status)](https://app.netlify.com/sites/static-cms-next-editorial/deploys)<br />[![Netlify Status](https://api.netlify.com/api/v1/badges/756ff279-59aa-4b7b-96a5-75b2b2a8552b/deploy-status)](https://app.netlify.com/sites/static-cms-next-editorial-staging/deploys) |

# Other Projects

|Name|Status|
|---|---|
| [static-cms-proxy-server](https://github.com/StaticJsCMS/static-cms-proxy-server) | [![Build and Test](https://github.com/StaticJsCMS/static-cms-proxy-server/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StaticJsCMS/static-cms-proxy-server/actions/workflows/build-and-test.yml) [![npm latest package](https://img.shields.io/npm/v/@staticcms/proxy-server/latest.svg)](https://www.npmjs.com/package/@staticcms/proxy-server) |
| [gatsby-plugin-static-cms](https://github.com/StaticJsCMS/gatsby-plugin-static-cms) | [![Build](https://github.com/StaticJsCMS/gatsby-plugin-static-cms/actions/workflows/build.yml/badge.svg)](https://github.com/StaticJsCMS/gatsby-plugin-static-cms/actions/workflows/build.yml) [![npm latest package](https://img.shields.io/npm/v/gatsby-plugin-static-cms/latest.svg)](https://www.npmjs.com/package/gatsby-plugin-static-cms) |

# Sponsors

<table>
  <tbody>
    <tr>
<td align="center"><a href="https://github.com/slickduck"><img alt="slickduck" src="https://avatars.githubusercontent.com/u/124680931?s=100&v=4" width="100" height="100" /><br /><sub><b>Slick Duck</b></sub></a></td>
    </t>
  </tbody>
</table>

# Contributing

New contributors are always welcome! Check out [CONTRIBUTING.md](https://github.com/StaticJsCMS/static-cms/blob/main/CONTRIBUTING.md) to get involved.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KaneFreeman"><img src="https://avatars.githubusercontent.com/u/1388138?v=4?s=100" width="100px;" alt="Daniel Lautzenheiser"/><br /><sub><b>Daniel Lautzenheiser</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=KaneFreeman" title="Code">💻</a> <a href="https://github.com/StaticJsCMS/static-cms/commits?author=KaneFreeman" title="Documentation">📖</a> <a href="#design-KaneFreeman" title="Design">🎨</a> <a href="#maintenance-KaneFreeman" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/denyskon"><img src="https://avatars.githubusercontent.com/u/47871822?v=4?s=100" width="100px;" alt="Denys Konovalov"/><br /><sub><b>Denys Konovalov</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=denyskon" title="Code">💻</a> <a href="https://github.com/StaticJsCMS/static-cms/commits?author=denyskon" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://commanderstorm.github.io/"><img src="https://avatars.githubusercontent.com/u/26258709?v=4?s=100" width="100px;" alt="Frank Elsinga"/><br /><sub><b>Frank Elsinga</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=CommanderStorm" title="Code">💻</a> <a href="https://github.com/StaticJsCMS/static-cms/commits?author=CommanderStorm" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Skrubbadubba"><img src="https://avatars.githubusercontent.com/u/75796723?v=4?s=100" width="100px;" alt="Skrubbadubba"/><br /><sub><b>Skrubbadubba</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=Skrubbadubba" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/a-kriya"><img src="https://avatars.githubusercontent.com/u/26761352?v=4?s=100" width="100px;" alt="a-kriya"/><br /><sub><b>a-kriya</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=a-kriya" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/whysthatso"><img src="https://avatars.githubusercontent.com/u/1685114?v=4?s=100" width="100px;" alt="Andreas Wagner"/><br /><sub><b>Andreas Wagner</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=whysthatso" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/McFlyPartages"><img src="https://avatars.githubusercontent.com/u/44530252?v=4?s=100" width="100px;" alt="McFlyPartages"/><br /><sub><b>McFlyPartages</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=McFlyPartages" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/robigan"><img src="https://avatars.githubusercontent.com/u/35210888?v=4?s=100" width="100px;" alt="robigan"/><br /><sub><b>robigan</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=robigan" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://mildred.fr/"><img src="https://avatars.githubusercontent.com/u/33804?v=4?s=100" width="100px;" alt="Mildred Ki'Lya"/><br /><sub><b>Mildred Ki'Lya</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=mildred" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/acharlop"><img src="https://avatars.githubusercontent.com/u/8885448?v=4?s=100" width="100px;" alt="Avi Charlop"/><br /><sub><b>Avi Charlop</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=acharlop" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dominiclooser.ch/"><img src="https://avatars.githubusercontent.com/u/2300581?v=4?s=100" width="100px;" alt="dominiclooser"/><br /><sub><b>dominiclooser</b></sub></a><br /><a href="https://github.com/StaticJsCMS/static-cms/commits?author=dominiclooser" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/StaticJsCMS/static-cms/releases) page.

# License

Static CMS is released under the [MIT License](LICENSE).
Please make sure you understand its [implications and guarantees](https://writing.kemitchell.com/2016/09/21/MIT-License-Line-by-Line.html).

# Decap

Static CMS is a fork of [Decap](https://github.com/decaporg/decap-cms) (previously Netlify CMS) focusing on the core product over adding massive, scope expanding, new features.
