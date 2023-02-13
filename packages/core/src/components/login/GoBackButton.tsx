import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Button from '../common/button/Button';

import type { TranslatedProps } from '@staticcms/core/interface';

interface GoBackButtonProps {
  href: string;
}

const GoBackButton = ({ href, t }: TranslatedProps<GoBackButtonProps>) => {
  return (
    <Button variant="text" href={href} startIcon={ArrowLeftIcon}>
      {t('ui.default.goBackToSite')}
    </Button>
  );
};

export default GoBackButton;
