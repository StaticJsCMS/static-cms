import {
  BitbucketBackend,
  GitGatewayBackend,
  GitHubBackend,
  GitLabBackend,
  ProxyBackend,
  TestBackend,
} from './backends';
import { registerBackend, registerLocale, registerWidget } from './lib/registry';
import locales from './locales';
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

export default function addExtensions() {
  // Register all the things
  registerBackend('git-gateway', GitGatewayBackend);
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

  Object.keys(locales).forEach(locale => {
    registerLocale(locale, locales[locale]);
  });
}
