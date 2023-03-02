/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from 'react';

export default function (props: any) {
  const { children } = props;
  return React.createElement('div', {}, children(500, 1000));
}
