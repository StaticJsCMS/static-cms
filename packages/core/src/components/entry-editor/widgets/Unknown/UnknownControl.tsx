import React from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

import './UnknownControl.css';

const classes = generateClassNames('WidgetUnknown', ['root']);

const UnknownControl: FC<WidgetControlProps<unknown>> = ({ field }) => {
  const t = useTranslate();

  return (
    <div className={classes.root}>
      {t('editor.editorWidgets.unknownControl.noControl', { widget: field.widget })}
    </div>
  );
};

export default UnknownControl;
