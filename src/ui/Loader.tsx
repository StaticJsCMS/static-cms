import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';

import { transientOptions } from '../lib';
import { colors, zIndex } from './styles';

import type { ReactNode } from 'react';

const animations = {
  loader: keyframes`
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  `,
};

const LoaderText = styled.div`
  width: auto !important;
  height: auto !important;
  text-align: center;
  color: #767676;
  margin-top: 55px;
  line-height: 35px;
`;

const LoaderItem = styled.div`
  position: absolute;
  white-space: nowrap;
  transform: translateX(-50%);
`;

interface LoaderProps {
  children: ReactNode;
  className?: string;
}

const Loader = ({ className, children }: LoaderProps) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  }, [intervalTimer]);

  const setAnimation = useCallback(
    (childArray: any[]) => {
      if (intervalTimer) {
        return;
      }

      setIntervalTimer(
        setInterval(() => {
          const nextItem = currentItem === childArray?.length - 1 ? 0 : currentItem + 1;
          setCurrentItem(nextItem);
        }, 5000),
      );
    },
    [intervalTimer, currentItem],
  );

  const renderChild = useCallback(() => {
    if (!children) {
      return null;
    } else if (typeof children == 'string') {
      return <LoaderText>{children}</LoaderText>;
    } else if (Array.isArray(children)) {
      setAnimation(children);
      return (
        <LoaderText>
          <LoaderItem key={currentItem}>{children[currentItem]}</LoaderItem>
        </LoaderText>
      );
    }
  }, [children, currentItem, setAnimation]);

  return <div className={className}>{renderChild()}</div>;
};

interface StyledLoaderProps {
  $active: boolean;
}

const StyledLoader = styled(
  Loader,
  transientOptions,
)<StyledLoaderProps>(
  ({ $active }) => `
    display: ${$active ? 'block' : 'none'};
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    text-align: center;
    z-index: ${zIndex.zIndex1000};
    transform: translateX(-50%) translateY(-50%);

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0%;
      left: 50%;
      width: 2.2857rem;
      height: 2.2857rem;
      margin: 0 0 0 -1.1429rem;
      border-radius: 500rem;
      border-style: solid;
      border-width: 0.2em;
    }

    /* Static Shape */
    &:before {
      border-color: rgba(0, 0, 0, 0.1);
    }

    /* Active Shape */
    &:after {
      animation: ${animations.loader} 0.6s linear;
      animation-iteration-count: infinite;
      border-color: ${colors.active} transparent transparent;
      box-shadow: 0 0 0 1px transparent;
    }
  `,
);

export default StyledLoader;
