import { useMemo } from 'react';

export const getAnchor = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 \-_]/g, '')
    .replace(/[ ]/g, '-');
};

const useAnchor = (text: string) => {
  return useMemo(() => getAnchor(text), [text]);
};

export default useAnchor;
