declare module '*.svg' {
  import type { FC } from 'react';
  import type { SvgProps } from '@staticcms/core/interface';

  const content: FC<SvgProps>;
  export default content;
}
