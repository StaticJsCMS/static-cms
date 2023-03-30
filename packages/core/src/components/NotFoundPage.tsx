import React from 'react';
import { translate } from 'react-polyglot';

import type { ComponentType } from 'react';
import type { TranslateProps } from 'react-polyglot';

const NotFoundPage = ({ t }: TranslateProps) => {
  return (
    <div>
      <h2>{t('app.notFoundPage.header')}</h2>
    </div>
  );
};

export default translate()(NotFoundPage) as ComponentType<{}>;
