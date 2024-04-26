import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const collectionClasses = generateClassNames('Collection', [
  'root',
  'content',
  'search-query',
  'description',
  'description-card',
  'controls',
  'header-wrapper',
  'header',
  'header-icon',
  'header-label',
  'new-entry-button',
  'new-entry-button-text',
]);

export default collectionClasses;
