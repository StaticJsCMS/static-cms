import controlComponent from './CodeControl';
import previewComponent from './CodePreview';
import schema from './schema';

import type { CodeField, WidgetParam } from '@staticcms/core/interface';

const CodeWidget = (): WidgetParam<string | { [key: string]: string }, CodeField> => {
  return {
    name: 'code',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export * from './SettingsButton';
export { default as CodeSettingsButton } from './SettingsButton';
export * from './SettingsPane';
export { default as CodeSettingsPane } from './SettingsPane';
export { controlComponent as CodeControl, previewComponent as CodePreview, schema as CodeSchema };

export default CodeWidget;
