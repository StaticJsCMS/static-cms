import { styled } from '@mui/material/styles';
import React from 'react';

import icons from './Icon/icons';
import transientOptions from '../../lib/util/transientOptions';

import type { IconType } from './Icon/icons';

interface IconWrapperProps {
  $width: number;
  $height: number;
  $rotation: string;
}

const IconWrapper = styled(
  'span',
  transientOptions,
)<IconWrapperProps>(
  ({ $width, $height, $rotation }) => `
    display: inline-block;
    line-height: 0;
    width: ${$width}px;
    height: ${$height}px;
    transform: rotate(${$rotation});

    & path:not(.no-fill),
    & circle:not(.no-fill),
    & polygon:not(.no-fill),
    & rect:not(.no-fill) {
      fill: currentColor;
    }

    & path.clipped {
      fill: transparent;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
);

const rotations = { right: 90, down: 180, left: 270, up: 360 };

export type Direction = keyof typeof rotations;

/**
 * Calculates rotation for icons that have a `direction` property configured
 * in the imported icon definition object. If no direction is configured, a
 * neutral rotation value is returned.
 *
 * Returned value is a string of shape `${degrees}deg`, for use in a CSS
 * transform.
 */
function getRotation(iconDirection?: Direction, newDirection?: Direction) {
  if (!iconDirection || !newDirection) {
    return '0deg';
  }
  const degrees = rotations[newDirection] - rotations[iconDirection];
  return `${degrees}deg`;
}

const sizes = {
  xsmall: 12,
  small: 18,
  medium: 24,
  large: 32,
};

export interface IconProps {
  type: IconType;
  direction?: Direction;
  width?: number;
  height?: number;
  size?: keyof typeof sizes;
  className?: string;
}

const Icon = ({ type, direction, width, height, size = 'medium', className }: IconProps) => {
  const IconSvg = icons[type].image;

  return (
    <IconWrapper
      className={className}
      $width={width ? width : size in sizes ? sizes[size as keyof typeof sizes] : sizes['medium']}
      $height={
        height ? height : size in sizes ? sizes[size as keyof typeof sizes] : sizes['medium']
      }
      $rotation={getRotation(icons[type].direction, direction)}
    >
      <IconSvg />
    </IconWrapper>
  );
};

export default styled(Icon)``;
