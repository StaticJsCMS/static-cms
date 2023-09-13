import React from 'react';
import { translate } from 'react-polyglot';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { TranslatedProps, WidgetPreviewProps } from '@staticcms/core/interface';

const classes = generateClassNames('WidgetUnknownPreview', ['root']);

const UnknownPreview = ({ field, t }: TranslatedProps<WidgetPreviewProps>) => {
  return (
    <div className={classes.root}>
      {t('editor.editorWidgets.unknownPreview.noPreview', { widget: field.widget })}
    </div>
  );
};

export default translate()(UnknownPreview);
