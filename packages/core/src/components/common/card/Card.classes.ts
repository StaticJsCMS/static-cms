import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const cardClasses = generateClassNames('Card', ['root', 'header', 'content', 'media', 'actions']);

export default cardClasses;
