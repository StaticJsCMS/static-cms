import Link from 'next/link';
import { useMemo } from 'react';

import type { DetailedHTMLProps, AnchorHTMLAttributes, ReactNode } from 'react';

enum LinkType {
  SAME_SITE,
  SAME_PAGE,
  EXTERNAL,
}

interface AnchorProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  children?: ReactNode;
}

const Anchor = ({ href = '', children = '' }: AnchorProps) => {
  const type: LinkType = useMemo(() => {
    if (href.startsWith('#')) {
      return LinkType.SAME_PAGE;
    }

    if (href.startsWith('/') || href.startsWith('.')) {
      return LinkType.SAME_SITE;
    }

    return LinkType.EXTERNAL;
  }, [href]);

  if (type === LinkType.SAME_PAGE) {
    return (
      <a
        href={href}
        onClick={e => {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth',
          });
        }}
      >
        {children}
      </a>
    );
  }

  if (type === LinkType.SAME_SITE) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default Anchor;
