import React from 'react';
import { translate } from 'react-polyglot';

import type { WidgetPreviewProps, TranslatedProps } from '@staticcms/core/interface';

const UnknownPreview = ({ field, t }: TranslatedProps<WidgetPreviewProps>) => {
  return (
    <div className="nc-widgetPreview">
      {t('editor.editorWidgets.unknownPreview.noPreview', { widget: field.widget })}
    </div>
  );
};

export default translate()(UnknownPreview);
