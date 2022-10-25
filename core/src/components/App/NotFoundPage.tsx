import { styled } from '@mui/material/styles';
import React from 'react';
import { translate } from 'react-polyglot';

import { lengths } from '../../components/UI/styles';

import type { ComponentType } from 'react';
import type { TranslateProps } from 'react-polyglot';

const NotFoundContainer = styled('div')`
  margin: ${lengths.pageMargin};
`;

const NotFoundPage = ({ t }: TranslateProps) => {
  return (
    <NotFoundContainer>
      <h2>{t('app.notFoundPage.header')}</h2>
    </NotFoundContainer>
  );
};

export default translate()(NotFoundPage) as ComponentType<{}>;
