import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const cardClasses = generateClassNames('Card', [
  'root',
  'header',
  'content',
  'media',
  'link-action',
  'button-action',
]);

export default cardClasses;
