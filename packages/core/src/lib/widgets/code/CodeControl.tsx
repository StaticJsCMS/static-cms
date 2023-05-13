import Collapse from '@mui/material/Collapse';
import { ChevronRight as ChevronRightIcon } from '@styled-icons/material/ChevronRight';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ErrorMessage from '@staticcms/core/components/common/field/ErrorMessage';
import Hint from '@staticcms/core/components/common/field/Hint';
import Label from '@staticcms/core/components/common/field/Label';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import languages from './data/languages';
import SettingsButton from './SettingsButton';
import SettingsPane from './SettingsPane';

import type {
  CodeField,
  ProcessedCodeLanguage,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { LanguageName } from '@uiw/codemirror-extensions-langs';
import type { FC, MouseEvent } from 'react';

function valueToOption(val: string | { name: string; label?: string }): {
  value: string;
  label: string;
} {
  if (typeof val === 'string') {
    return { value: val, label: val };
  }
  return { value: val.name, label: val.label || val.name };
}

const CodeControl: FC<WidgetControlProps<string | { [key: string]: string }, CodeField>> = ({
  label,
  field,
  duplicate,
  onChange,
  hasErrors,
  value,
  forSingleList,
  errors,
  disabled,
}) => {
  const theme = useAppSelector(selectTheme);

  const keys = useMemo(() => {
    const defaults = {
      code: 'code',
      lang: 'lang',
    };

    const keys = field.keys ?? {};
    return { ...defaults, ...keys };
  }, [field]);

  const valueIsMap = useMemo(() => Boolean(!field.output_code_only), [field.output_code_only]);

  const [internalRawValue, setInternalValue] = useState(value ?? '');
  const internalValue = useMemo(
    () => (duplicate ? value ?? '' : internalRawValue),
    [internalRawValue, duplicate, value],
  );

  const [lang, setLang] = useState<ProcessedCodeLanguage | null>(null);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const toggleSettings = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setSettingsVisible(old => !old);
  }, []);

  const hideSettings = useCallback(() => {
    setSettingsVisible(false);
  }, []);

  const [open, setOpen] = useState(true);

  const handleOpenToggle = useCallback(() => {
    setOpen(oldOpen => !oldOpen);
    setSettingsVisible(false);
  }, []);

  const handleOnChange = useCallback(
    (newValue: string | { [key: string]: string } | null | undefined) => {
      setInternalValue(newValue ?? '');
      onChange(newValue ?? '');
    },
    [onChange],
  );

  const handleChange = useCallback(
    (newValue: string) => {
      if (valueIsMap) {
        handleOnChange({
          lang: lang?.label ?? '',
          code: newValue,
        });
      }
      handleOnChange(newValue);
    },
    [handleOnChange, lang?.label, valueIsMap],
  );

  const loadedLangExtension = useMemo(() => {
    if (!lang) {
      return null;
    }
    return loadLanguage(lang.codemirror_mode as LanguageName);
  }, [lang]);

  const extensions = useMemo(() => {
    if (!loadedLangExtension) {
      return [];
    }

    return [loadedLangExtension];
  }, [loadedLangExtension]);

  const code = useMemo(() => {
    if (typeof internalValue === 'string') {
      return internalValue;
    }

    return internalValue[keys.code];
  }, [internalValue, keys.code]);

  const uniqueId = useUUID();

  // If `allow_language_selection` is not set, default to true. Otherwise, use its value.
  const allowLanguageSelection = useMemo(
    () => Boolean(field.allow_language_selection),
    [field.allow_language_selection],
  );

  const availableLanguages = languages.map(language => valueToOption(language.label));

  const handleSetLanguage = useCallback((langLabel: string) => {
    const language = languages.find(language => language.label === langLabel);
    if (language) {
      setLang(language);
    }
  }, []);

  useEffect(() => {
    let langIdentifier: string;
    if (typeof internalValue !== 'string') {
      langIdentifier = internalValue[keys.lang];
    } else {
      langIdentifier = internalValue;
    }

    if (isEmpty(langIdentifier)) {
      return;
    }

    handleSetLanguage(langIdentifier);
  }, [field.default_language, handleSetLanguage, internalValue, keys.lang, valueIsMap]);

  return (
    <div
      data-testid="list-field"
      className={classNames(
        `
          relative
          flex
          flex-col
          border-b
          border-slate-400
          focus-within:border-blue-800
          dark:focus-within:border-blue-100
        `,
        !hasErrors && 'group/active-list',
      )}
    >
      <div
        data-testid="field-wrapper"
        className={classNames(
          `
            relative
            flex
            flex-col
            w-full
          `,
          forSingleList && 'mr-14',
        )}
      >
        <button
          data-testid="list-expand-button"
          className={classNames(
            `
              flex
              w-full
              justify-between
              px-3
              py-2
              text-left
              text-sm
              font-medium
              focus:outline-none
              focus-visible:ring
              gap-2
              focus-visible:ring-opacity-75
              items-center
            `,
            disabled && 'cursor-default',
          )}
          onClick={handleOpenToggle}
        >
          <Label
            key="label"
            hasErrors={hasErrors}
            className={classNames(
              !disabled &&
                `
                  group-focus-within/active-list:text-blue-500
                  group-hover/active-list:text-blue-500
                `,
            )}
            cursor="pointer"
            variant="inline"
            disabled={disabled}
          >
            {label}
          </Label>
          {open && allowLanguageSelection ? (
            <SettingsButton onClick={toggleSettings} disabled={disabled} />
          ) : null}
          <ChevronRightIcon
            className={classNames(
              open && 'rotate-90 transform',
              `
                transition-transform
                h-5
                w-5
              `,
              disabled
                ? `
                    text-slate-300
                    dark:text-slate-600
                  `
                : `
                    group-focus-within/active-list:text-blue-500
                    group-hover/active-list:text-blue-500
                  `,
            )}
          />
        </button>
        {open && allowLanguageSelection && settingsVisible ? (
          <SettingsPane
            uniqueId={uniqueId}
            languages={availableLanguages}
            language={valueToOption(lang?.label ?? '')}
            allowLanguageSelection={allowLanguageSelection}
            onChangeLanguage={handleSetLanguage}
            hideSettings={hideSettings}
          />
        ) : null}
        <Collapse in={open} appear={false}>
          <div>
            <CodeMirror
              value={code}
              height="auto"
              minHeight="120px"
              width="100%"
              editable={true}
              onChange={handleChange}
              extensions={extensions}
              theme={theme}
              readOnly={disabled}
            />
          </div>
        </Collapse>
        {field.hint ? (
          <Hint key="hint" hasErrors={hasErrors} cursor="pointer" disabled={disabled}>
            {field.hint}
          </Hint>
        ) : null}
        <ErrorMessage errors={errors} className="pt-2 pb-3" />
      </div>
    </div>
  );
};

export default CodeControl;
