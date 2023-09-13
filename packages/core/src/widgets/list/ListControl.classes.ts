import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const widgetListClasses = generateClassNames('WidgetList', [
  'root',
  'disabled',
  'error',
  'required',
  'for-single-list',
  'open',
  'summary',
  'field-wrapper',
  'field',
  'expand-button',
  'expand-button-icon',
  'content',
  'error-message',
  'delimited',
  'delimited-input',
  'fields',
  'actions',
  'add-types-button',
  'add-button',
  'sortable-item',
  'multi-field-item',
]);

export default widgetListClasses;
