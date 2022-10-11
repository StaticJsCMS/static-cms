import React from 'react';

import {
  AzureBackend,
  BitbucketBackend,
  GitGatewayBackend,
  GitHubBackend,
  GitLabBackend,
  ProxyBackend,
  TestBackend,
} from './backends';
import { imageEditorComponent } from './editor-components';
import {
  registerBackend,
  registerEditorComponent,
  registerIcon,
  registerLocale,
  registerWidget,
} from './lib/registry';
import { locales } from './locales';
import { Icon, images } from './ui';
import {
  BooleanWidget,
  CodeWidget,
  ColorStringWidget,
  DateTimeWidget,
  FileWidget,
  ImageWidget,
  ListWidget,
  MapWidget,
  MarkdownWidget,
  NumberWidget,
  ObjectWidget,
  RelationWidget,
  SelectWidget,
  StringWidget,
  TextWidget,
} from './widgets';

import type { IconType } from './ui/Icon/icons';

export function addExtensions() {
  // Register all the things
  registerBackend('git-gateway', GitGatewayBackend);
  registerBackend('azure', AzureBackend);
  registerBackend('github', GitHubBackend);
  registerBackend('gitlab', GitLabBackend);
  registerBackend('bitbucket', BitbucketBackend);
  registerBackend('test-repo', TestBackend);
  registerBackend('proxy', ProxyBackend);
  registerWidget([
    StringWidget(),
    NumberWidget(),
    TextWidget(),
    ImageWidget(),
    FileWidget(),
    SelectWidget(),
    MarkdownWidget(),
    ListWidget(),
    ObjectWidget(),
    RelationWidget(),
    BooleanWidget(),
    MapWidget(),
    DateTimeWidget(),
    CodeWidget(),
    ColorStringWidget(),
  ]);
  registerEditorComponent(imageEditorComponent);
  registerEditorComponent({
    id: 'code-block',
    label: 'Code Block',
    widget: 'code',
    type: 'code-block',
  });
  registerLocale('en', locales.en);

  (Object.keys(images) as IconType[]).forEach(iconName => {
    registerIcon(iconName, () => <Icon type={iconName} />);
  });
}
