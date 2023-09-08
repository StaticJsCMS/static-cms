/* eslint-disable import/prefer-default-export */
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

export const tableClasses = generateClassNames('Table', [
  'root',
  'table',
  'header',
  'header-row',
  'header-cell',
  'header-cell-content',
  'body',
  'body-row',
  'body-cell',
  'body-cell-has-link',
  'body-cell-emphasis',
  'body-cell-shrink',
  'body-cell-content',
  'body-cell-link',
]);
