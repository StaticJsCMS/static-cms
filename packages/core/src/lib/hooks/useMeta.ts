import { useEffect } from 'react';

export interface MetaProps {
  name: string;
  content: string;
}

export default function useMeta({ name, content }: MetaProps) {
  useEffect(() => {
    const head = document.querySelector('head');
    if (!head) {
      return;
    }

    const meta = document.createElement('meta');

    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    head.appendChild(meta);

    return () => {
      head.removeChild(meta);
    };
  }, [content, name]);
}
