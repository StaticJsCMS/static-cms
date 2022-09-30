<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="simple-cms-logo.png" width="500px" />

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SimpleCMS/simple-cms/blob/main/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@simplecms/simple-cms-core/latest.svg)](https://www.npmjs.com/package/@simplecms/simple-cms-core)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SimpleCMS/simple-cms/blob/main/CONTRIBUTING.md)

</div>

[netlifycms.org](https://www.netlifycms.org/) 

A CMS for static site generators. Give users a simple way to edit
and add content to any site built with a static site generator.

## Community Chat

## How It Works

Simple CMS is a single-page app that you pull into the `/admin` part of your site.

It presents a clean UI for editing content stored in a Git repository.

You setup a YAML config to describe the content model of your site, and typically
tweak the main layout of the CMS a bit to fit your own site.

When a user navigates to `/admin/` they'll be prompted to log in, and once authenticated
they'll be able to create new content or edit existing content.

Read more about Simple CMS [Core Concepts](https://www.netlifycms.org/docs/intro/).

# Installation and Configuration

The Simple CMS can be used in two different ways.

* A Quick and easy install, that requires you to create a single HTML file and a configuration file. All the CMS JavaScript and CSS are loaded from a CDN.
  To learn more about this installation method, refer to the [Quick Start Guide](https://www.netlifycms.org/docs/quick-start/)
* A complete, more complex install, that gives you more flexibility but requires that you use a static site builder with a build system that supports npm packages.

# simple-cms-core

## Installation

`npm install @simplecms/simple-cms-core`

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
  SimpleCmsCore as CMS,
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
} from '@simple-cms/simple-cms-core';

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

New contributors are always welcome! Check out [CONTRIBUTING.md](https://github.com/SimpleCMS/simple-cms/blob/main/CONTRIBUTING.md) to get involved.

# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).
Every release is documented on the Github [Releases](https://github.com/SimpleCMS/simple-cms/releases) page.

# License

Simple CMS is released under the [MIT License](LICENSE).
Please make sure you understand its [implications and guarantees](https://writing.kemitchell.com/2016/09/21/MIT-License-Line-by-Line.html).

# Netlify CMS

Simple CMS is a fork of Netlify CMS focusing on the core product over adding massive new features.

# Thanks
