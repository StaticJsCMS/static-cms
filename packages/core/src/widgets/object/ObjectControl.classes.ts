import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const widgetObjectClasses = generateClassNames('WidgetObject', [
  'root',
  'error',
  'disabled',
  'required',
  'for-single-list',
  'open',
  'expand',
  'expand-icon',
  'summary',
  'fields',
  'error-message',
]);

export default widgetObjectClasses;
