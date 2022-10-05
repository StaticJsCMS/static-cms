import React from 'react';
import { translate } from 'react-polyglot';

import type { CmsWidgetPreviewProps, TranslatedProps } from '../../../interface';

function UnknownPreview({ field, t }: TranslatedProps<CmsWidgetPreviewProps>) {
  return (
    <div className="nc-widgetPreview">
      {t('editor.editorWidgets.unknownPreview.noPreview', { widget: field.widget })}
    </div>
  );
}

export default translate()(UnknownPreview);
