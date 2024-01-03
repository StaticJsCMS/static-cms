import React from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';

const classes = generateClassNames('WidgetUnknownPreview', ['root']);

const UnknownPreview: FC<WidgetPreviewProps> = ({ field }) => {
  const t = useTranslate();

  return (
    <div className={classes.root}>
      {t('editor.editorWidgets.unknownPreview.noPreview', { widget: field.widget })}
    </div>
  );
};

export default UnknownPreview;
