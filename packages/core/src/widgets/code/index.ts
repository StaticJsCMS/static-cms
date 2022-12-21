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
      getDefaultValue: (
        defaultValue: string | { [key: string]: string } | null | undefined,
        field: CodeField,
      ) => {
        if (field.output_code_only) {
          return String(defaultValue);
        }

        const langKey = field.keys?.['lang'] ?? 'lang';
        const codeKey = field.keys?.['code'] ?? 'code';

        if (typeof defaultValue === 'string') {
          return {
            [langKey]: field.default_language ?? '',
            [codeKey]: defaultValue,
          };
        }

        return {
          [langKey]: field.default_language ?? defaultValue?.[langKey] ?? '',
          [codeKey]: defaultValue?.[codeKey] ?? '',
        };
      },
    },
  };
};

export * from './SettingsButton';
export { default as CodeSettingsButton } from './SettingsButton';
export * from './SettingsPane';
export { default as CodeSettingsPane } from './SettingsPane';
export { controlComponent as CodeControl, previewComponent as CodePreview, schema as CodeSchema };

export default CodeWidget;
