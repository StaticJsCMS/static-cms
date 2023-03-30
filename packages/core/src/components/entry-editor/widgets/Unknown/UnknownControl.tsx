import React from 'react';
import { translate } from 'react-polyglot';

import type { WidgetControlProps, TranslatedProps } from '@staticcms/core/interface';

const UnknownControl = ({ field, t }: TranslatedProps<WidgetControlProps<unknown>>) => {
  return (
    <div
      className="
        px-4
        py-2
        text-small
        text-gray-900
        dark:text-gray-100
      "
    >
      {t('editor.editorWidgets.unknownControl.noControl', { widget: field.widget })}
    </div>
  );
};

export default translate()(UnknownControl);
