import React from 'react';

import { useData } from '@staticcms/core/lib';

import type { ValueOrNestedValue } from '@staticcms/core/interface';
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
