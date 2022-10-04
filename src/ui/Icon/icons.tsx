import images from './images/_index';

import type { Direction } from '../Icon';

export type IconType = keyof typeof images;

/**
 * This module outputs icon objects with the following shape:
 *
 * {
 *   image: <svg>...</svg>,
 *   ...props
 * }
 *
 * `props` here are config properties defined in this file for specific icons.
 * For example, an icon may face a specific direction, and the Icon component
 * accepts a `direction` prop to rotate directional icons, which relies on
 * defining the default direction here.
 */

interface IconTypeConfig {
  direction: Direction;
}

/**
 * Configuration for individual icons.
 */
const config: Partial<Record<IconType, IconTypeConfig>> = {
  arrow: {
    direction: 'left',
  },
  chevron: {
    direction: 'down',
  },
  'chevron-double': {
    direction: 'down',
  },
};

export interface IconTypeProps extends Partial<IconTypeConfig> {
  image: () => JSX.Element;
}

/**
 * Record icon definition objects - imported object of images simply maps the icon
 * name to the raw svg, so we move that to the `image` property of the
 * definition object and set any additional configured properties for each icon.
 */
const icons = (Object.keys(images) as IconType[]).reduce((acc, name) => {
  const image = images[name];
  const props = config[name] || {};
  acc[name] = {
    image,
    ...props,
  };
  return acc;
}, {} as Record<IconType, IconTypeProps>);

export default icons;
