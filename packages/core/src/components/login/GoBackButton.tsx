import { ArrowBack as ArrowBackIcon } from '@styled-icons/material/ArrowBack';
import React from 'react';

import Button from '../common/button/Button';

import type { TranslatedProps } from '@staticcms/core/interface';

interface GoBackButtonProps {
  href: string;
}

const GoBackButton = ({ href, t }: TranslatedProps<GoBackButtonProps>) => {
  return (
    <Button variant="text" href={href} startIcon={ArrowBackIcon}>
      {t('ui.default.goBackToSite')}
    </Button>
  );
};

export default GoBackButton;
