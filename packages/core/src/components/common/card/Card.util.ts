/* eslint-disable import/prefer-default-export */
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

export const cardClasses = generateClassNames('Card', [
  'root',
  'header',
  'content',
  'media',
  'actions',
]);
