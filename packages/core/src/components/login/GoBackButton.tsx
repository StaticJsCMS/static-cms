import { ArrowBack as ArrowBackIcon } from '@styled-icons/material/ArrowBack';
import React from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import Button from '../common/button/Button';

import type { FC } from 'react';

interface GoBackButtonProps {
  href: string;
}

const GoBackButton: FC<GoBackButtonProps> = ({ href }) => {
  const t = useTranslate();

  return (
    <Button variant="text" href={href} startIcon={ArrowBackIcon}>
      {t('ui.default.goBackToSite')}
    </Button>
  );
};

export default GoBackButton;
