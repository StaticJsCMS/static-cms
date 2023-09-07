/* eslint-disable import/prefer-default-export */
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

export const sidebarClasses = generateClassNames('Sidebar', [
  'root',
  'content',
  'items',
  'media-icon',
]);
