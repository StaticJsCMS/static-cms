import React from 'react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';

import { lengths } from '../../ui';

import type { ComponentType } from 'react';
import type { TranslateProps } from 'react-polyglot';

const NotFoundContainer = styled.div`
  margin: ${lengths.pageMargin};
`;

function NotFoundPage({ t }: TranslateProps) {
  return (
    <NotFoundContainer>
      <h2>{t('app.notFoundPage.header')}</h2>
    </NotFoundContainer>
  );
}

export default translate()(NotFoundPage) as ComponentType<{}>;
