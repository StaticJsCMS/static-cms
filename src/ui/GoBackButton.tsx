import styled from '@emotion/styled';
import React from 'react';

import Icon from './Icon';
import { colorsRaw } from './styles';

import type { TranslatedProps } from '../interface';

const GoBackButtonStyle = styled.a`
  display: flex;
  align-items: center;

  margin-top: 50px;
  padding: 10px;

  font-size: 14px;
`;

const ButtonText = styled.p`
  color: ${colorsRaw.gray};
  margin: 0 10px;
`;

interface GoBackButtonProps {
  href: string;
}

const GoBackButton = ({ href, t }: TranslatedProps<GoBackButtonProps>) => {
  return (
    <GoBackButtonStyle href={href}>
      <Icon type="arrow" size="small" />
      <ButtonText>{t('ui.default.goBackToSite')}</ButtonText>
    </GoBackButtonStyle>
  );
}

export default GoBackButton;
