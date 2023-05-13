declare module 'react-scroll-sync' {
  import type { ReactNode, FC, Ref } from 'react';

  export interface ScrollSyncProps {
    children?: ReactNode;
    onSync?(el: Element): void;
    proportional?: boolean | undefined;
    vertical?: boolean | undefined;
    horizontal?: boolean | undefined;
    enabled?: boolean | undefined;
  }

  export interface ScrollSyncPaneProps {
    attachTo?: HTMLElement | Ref<HTMLElement | undefined> | undefined;
    children?: ReactNode;
    group?: string | string[] | undefined;
    enabled?: boolean | undefined;
  }

  export const ScrollSync: FC<ScrollSyncProps>;
  export const ScrollSyncPane: FC<ScrollSyncPaneProps>;
}
