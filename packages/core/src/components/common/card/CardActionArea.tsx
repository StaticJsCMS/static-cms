import React from 'react';
import { Link } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import cardClasses from './Card.classes';

import type { FC, MouseEvent, ReactNode } from 'react';

export interface BaseCardActionAreaProps {
  children: ReactNode;
  className?: string;
}

export interface CardActionAreaPropsLink extends BaseCardActionAreaProps {
  to: string;
}

export interface CardActionAreaPropsButton extends BaseCardActionAreaProps {
  onClick: (event: MouseEvent) => void;
}

export type CardActionAreaProps = CardActionAreaPropsLink | CardActionAreaPropsButton;

const CardActionArea: FC<CardActionAreaProps> = ({ children, className, ...otherProps }) => {
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
