<div align="center">
  <img src="static-cms-logo.png" width="500px" />

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/StaticJsCMS/static-cms/blob/main/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@staticcms/core/latest.svg)](https://www.npmjs.com/package/@staticcms/core)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/StaticJsCMS/static-cms/blob/main/CONTRIBUTING.md)

</div>

[staticjscms.github.io/static-cms](https://staticjscms.github.io/static-cms/) 

A CMS for static site generators. Give users a simple way to edit
and add content to any site built with a static site generator.

> **DISCLAIMER**: This package/repository is under heavy development and as such is very unstable at current. A stable release is targeted for the end of Novemeber and will be labeled `1.0.0`. Documentation may not be completely accurate prior to the `1.0.0` release.

## Community Chat

## How It Works

Static CMS is a single-page app that you pull into the `/admin` part of your site.

It presents a clean UI for editing content stored in a Git repository.

You setup a YAML config to describe the content model of your site, and typically
tweak the main layout of the CMS a bit to fit your own site.

When a user navigates to `/admin/` they'll be prompted to log in, and once authenticated
they'll be able to create new content or edit existing content.

Read more about Static CMS [Core Concepts](https://staticjscms.github.io/static-cms/docs/intro/).

# Installation and Configuration

The Static CMS can be used in two different ways.

* A Quick and easy install, that requires you to create a single HTML file and a configuration file. All the CMS JavaScript and CSS are loaded from a CDN.
  To learn more about this installation method, refer to the [Quick Start Guide](https://staticjscms.github.io/static-cms/docs/start-with-a-template/)
* A complete, more complex install, that gives you more flexibility but requires that you use a static site builder with a build system that supports npm packages.

# static-cms-core

## Installation

`npm install @staticcms/core`

## Setup

```tsx
import React from 'react';
import {
  AzureBackend,
  BitbucketBackend,
  BooleanWidget,
  CodeWidget,
  ColorStringWidget,
  DateTimeWidget,
  FileWidget,
  GitGatewayBackend,
  GitHubBackend,
  GitLabBackend,
  imageEditorComponent,
  ImageWidget,
  ListWidget,
  MapWidget,
  MarkdownWidget,
  StaticCmsCore as CMS,
  NumberWidget,
  ObjectWidget,
  ProxyBackend,
  RelationWidget,
  SelectWidget,
  StringWidget,
  TestBackend,
  TextWidget,
  locales,
  Icon,
  images
} from '@static-cms/static-cms-core';

// Register all the things
CMS.registerBackend('git-gateway', GitGatewayBackend);
CMS.registerBackend('azure', AzureBackend);
CMS.registerBackend('github', GitHubBackend);
CMS.registerBackend('gitlab', GitLabBackend);
CMS.registerBackend('bitbucket', BitbucketBackend);
CMS.registerBackend('test-repo', TestBackend);
CMS.registerBackend('proxy', ProxyBackend);
CMS.registerWidget([
  StringWidget.Widget(),
  NumberWidget.Widget(),
  TextWidget.Widget(),
  ImageWidget.Widget(),
  FileWidget.Widget(),
  SelectWidget.Widget(),
  MarkdownWidget.Widget(),
  ListWidget.Widget(),
  ObjectWidget.Widget(),
  RelationWidget.Widget(),
  BooleanWidget.Widget(),
  MapWidget.Widget(),
  DateTimeWidget.Widget(),
  CodeWidget.Widget(),
  ColorStringWidget.Widget(),
]);
CMS.registerEditorComponent(imageEditorComponent);
CMS.registerEditorComponent({
  id: 'code-block',
  label: 'Code Block',
  widget: 'code',
  type: 'code-block',
});
CMS.registerLocale('en', locales.en);

Object.keys(images).forEach(iconName => {
  CMS.registerIcon(iconName, <Icon type={iconName} />);
});
```

# Contributing

New contributors are always welcome! Check out [CONTRIBUTING.md](https://github.com/StaticJsCMS/static-cms/blob/main/CONTRIBUTING.md) to get involved.

# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/StaticJsCMS/static-cms/releases) page.

# License

Static CMS is released under the [MIT License](LICENSE).
Please make sure you understand its [implications and guarantees](https://writing.kemitchell.com/2016/09/21/MIT-License-Line-by-Line.html).

# Netlify CMS

Static CMS is a fork of Netlify CMS focusing on the core product over adding massive new features.

# Thanks
