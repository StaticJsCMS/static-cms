import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import React from 'react';

import type { TranslatedProps } from '../../interface';

interface GoBackButtonProps {
  href: string;
}

const GoBackButton = ({ href, t }: TranslatedProps<GoBackButtonProps>) => {
  return (
    <Button href={href} startIcon={<ArrowBackIcon />}>
      {t('ui.default.goBackToSite')}
    </Button>
  );
};

export default GoBackButton;
