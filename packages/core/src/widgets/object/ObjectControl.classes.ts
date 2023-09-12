import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const widgetObjectClasses = generateClassNames('WidgetObject', [
  'root',
  'error',
  'disabled',
  'open',
  'expand',
  'expand-icon',
  'summary',
  'fields',
  'error-message',
]);

export default widgetObjectClasses;
