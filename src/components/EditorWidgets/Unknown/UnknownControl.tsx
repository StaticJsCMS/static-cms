import React from 'react';
import { translate } from 'react-polyglot';

import type { CmsWidgetControlProps, TranslatedProps } from '../../../interface';

const UnknownControl = ({ field, t }: TranslatedProps<CmsWidgetControlProps>) => {
  return <div>{t('editor.editorWidgets.unknownControl.noControl', { widget: field.widget })}</div>;
};

export default translate()(UnknownControl);
