import React from 'react';
import { Link } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import cardClasses from './Card.classes';

import type { MouseEvent, ReactNode } from 'react';

interface BaseCardActionAreaProps {
  children: ReactNode;
  className?: string;
}

interface CardActionAreaPropsLink extends BaseCardActionAreaProps {
  to: string;
}

interface CardActionAreaPropsButton extends BaseCardActionAreaProps {
  onClick: (event: MouseEvent) => void;
}

export type CardActionAreaProps = CardActionAreaPropsLink | CardActionAreaPropsButton;

const CardActionArea = ({ children, className, ...otherProps }: CardActionAreaProps) => {
  if ('onClick' in otherProps) {
    return (
      <button
        onClick={otherProps.onClick}
        className={classNames(className, cardClasses['button-action'])}
      >
        {children}
      </button>
    );
  }

  return (
    <Link to={otherProps.to} className={classNames(className, cardClasses['link-action'])}>
      {children}
    </Link>
  );
};

export default CardActionArea;
