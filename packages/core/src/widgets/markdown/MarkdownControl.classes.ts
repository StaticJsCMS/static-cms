import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const widgetMarkdownClasses = generateClassNames('WidgetMarkdown', [
  'root',
  'error',
  'required',
  'disabled',
  'for-single-list',
  'raw-editor',
  'rich-editor',
  'plate-editor-wrapper',
  'plate-editor',
  'controls',
]);

export default widgetMarkdownClasses;
