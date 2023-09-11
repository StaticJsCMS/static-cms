/* eslint-disable import/prefer-default-export */
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const sidebarClasses = generateClassNames('Sidebar', ['root', 'content', 'items', 'media-icon']);

export default sidebarClasses;
