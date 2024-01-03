declare module '*.svg' {
  import type { FC } from 'react';
  import type { SvgProps } from '@staticcms/core';

  const content: FC<SvgProps>;
  export default content;
}
