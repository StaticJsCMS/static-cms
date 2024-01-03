import React from 'react';

import useData from './useData';

import type { ValueOrNestedValue } from '@staticcms/core';
import type { FC } from 'react';

export interface DataProps {
  path: string;
  value: ValueOrNestedValue;
}

const Data: FC<DataProps> = ({ path, value }) => {
  const data = useData(value, path);
  return <>{data}</>;
};

export default Data;
