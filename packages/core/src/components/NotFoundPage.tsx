import React from 'react';

import useTranslate from '../lib/hooks/useTranslate';

import type { FC } from 'react';

const NotFoundPage: FC = () => {
  const t = useTranslate();

  return (
    <div>
      <h2>{t('app.notFoundPage.header')}</h2>
    </div>
  );
};

export default NotFoundPage;
