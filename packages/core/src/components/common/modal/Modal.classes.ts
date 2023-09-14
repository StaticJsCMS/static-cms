import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const modalClasses = generateClassNames('Modal', ['root', 'content', 'backdrop']);

export default modalClasses;
