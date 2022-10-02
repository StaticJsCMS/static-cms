import styled from '@emotion/styled';
import React from 'react';

import { transientOptions } from '../lib';
import icons from './Icon/icons';

interface IconWrapperProps {
  $size: string;
  $rotation: string;
}

const IconWrapper = styled(
  'span',
  transientOptions,
)<IconWrapperProps>(
  ({ $size, $rotation }) => `
    display: inline-block;
    line-height: 0;
    width: ${$size};
    height: ${$size};
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

/**
 * Calculates rotation for icons that have a `direction` property configured
 * in the imported icon definition object. If no direction is configured, a
 * neutral rotation value is returned.
 *
 * Returned value is a string of shape `${degrees}deg`, for use in a CSS
 * transform.
 */
function getRotation(iconDirection?: keyof typeof rotations, newDirection?: keyof typeof rotations) {
  if (!iconDirection || !newDirection) {
    return '0deg';
  }
  const degrees = rotations[newDirection] - rotations[iconDirection];
  return `${degrees}deg`;
}

const sizes = {
  xsmall: '12px',
  small: '18px',
  medium: '24px',
  large: '32px',
};

interface IconProps {
  type: keyof typeof icons;
  direction?: keyof typeof rotations;
  size: keyof typeof sizes | string;
  className?: string;
}

function Icon({ type, direction, size = 'medium', className }: IconProps) {
  const IconSvg = icons[type].image;

  return (
    <IconWrapper
      className={className}
      $size={size in sizes ? sizes[size as keyof typeof sizes] : size}
      $rotation={getRotation(icons[type].direction, direction)}
    >
      <IconSvg />
    </IconWrapper>
  );
}

export default styled(Icon)``;
