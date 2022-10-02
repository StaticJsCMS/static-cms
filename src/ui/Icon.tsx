import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import icons from './Icon/icons';
import { transientOptions } from '../lib';

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

/**
 * Calculates rotation for icons that have a `direction` property configured
 * in the imported icon definition object. If no direction is configured, a
 * neutral rotation value is returned.
 *
 * Returned value is a string of shape `${degrees}deg`, for use in a CSS
 * transform.
 */
function getRotation(iconDirection, newDirection) {
  if (!iconDirection || !newDirection) {
    return '0deg';
  }
  const rotations = { right: 90, down: 180, left: 270, up: 360 };
  const degrees = rotations[newDirection] - rotations[iconDirection];
  return `${degrees}deg`;
}

const sizes = {
  xsmall: '12px',
  small: '18px',
  medium: '24px',
  large: '32px',
};

function Icon({ type, direction, size = 'medium', className }) {
  const IconSvg = icons[type].image;

  return (
    <IconWrapper
      className={className}
      size={sizes[size] || size}
      rotation={getRotation(icons[type].direction, direction)}
    >
      <IconSvg />
    </IconWrapper>
  );
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['right', 'down', 'left', 'up']),
  size: PropTypes.string,
  className: PropTypes.string,
};

export default styled(Icon)``;
