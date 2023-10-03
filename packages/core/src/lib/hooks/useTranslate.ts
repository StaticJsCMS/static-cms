import { useTranslate as useReactPolyglotTranslate } from 'react-polyglot';

import type { t } from 'react-polyglot';

export default function useTranslate(): t {
  return useReactPolyglotTranslate() as t;
}
