/* eslint-disable react/display-name */
/* eslint-disable import/prefer-default-export */
import React from 'react';

import type { FC } from 'react';

export const translate = () => (Component: FC) => {
  const t = (key: string, _options: unknown) => key;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    return React.createElement(Component, { t, ...props });
  };
};
