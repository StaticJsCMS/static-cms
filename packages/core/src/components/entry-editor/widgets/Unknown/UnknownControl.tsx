import React from 'react';
import { translate } from 'react-polyglot';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { TranslatedProps, WidgetControlProps } from '@staticcms/core/interface';

import './UnknownControl.css';

const classes = generateClassNames('WidgetUnknown', ['root']);

const UnknownControl = ({ field, t }: TranslatedProps<WidgetControlProps<unknown>>) => {
  return (
    <div className={classes.root}>
      {t('editor.editorWidgets.unknownControl.noControl', { widget: field.widget })}
    </div>
  );
};

export default translate()(UnknownControl);
