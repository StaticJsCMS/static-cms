import { styled } from '@mui/material/styles';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import React, { useCallback, useMemo, useState } from 'react';
import uuid from 'uuid/v4';

import ObjectWidgetTopBar from '@staticcms/core/components/UI/ObjectWidgetTopBar';
import Outline from '@staticcms/core/components/UI/Outline';
import transientOptions from '@staticcms/core/lib/util/transientOptions';
import languages from './data/languages';
import SettingsButton from './SettingsButton';
import SettingsPane from './SettingsPane';

import type { CodeField, WidgetControlProps } from '@staticcms/core/interface';
import type { LanguageName } from '@uiw/codemirror-extensions-langs';
import type { FC } from 'react';

const StyledCodeControlWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

interface StyledCodeControlContentProps {
  $collapsed: boolean;
}

const StyledCodeControlContent = styled(
  'div',
  transientOptions,
)<StyledCodeControlContentProps>(
  ({ $collapsed }) => `
    display: block;
    width: 100%;
    ${
      $collapsed
        ? `
          display: none;
        `
        : ''
    }
  `,
);

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
  field,
  onChange,
  hasErrors,
  value,
  t,
}) => {
  const keys = useMemo(() => {
    const defaults = {
      code: 'code',
      lang: 'lang',
    };

    const keys = field.keys ?? {};
    return { ...defaults, ...keys };
  }, [field]);

  const valueIsMap = useMemo(() => Boolean(!field.output_code_only), [field.output_code_only]);

  const [internalValue, setInternalValue] = useState(value ?? '');
  const [lang, setLang] = useState(() => {
    return valueIsMap && typeof internalValue !== 'string'
      ? internalValue && internalValue[keys.lang]
      : field.default_language ?? '';
  });
  const [collapsed, setCollapsed] = useState(false);

  const [hasFocus, setHasFocus] = useState(false);
  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  const handleCollapseToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

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
          ...(typeof internalValue !== 'string' ? internalValue : {}),
          code: newValue,
        });
      }
      handleOnChange(newValue);
    },
    [handleOnChange, internalValue, valueIsMap],
  );

  const loadedLangExtension = useMemo(() => {
    if (!lang) {
      return null;
    }
    return loadLanguage(lang as LanguageName);
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

  const [settingsVisible, setSettingsVisible] = useState(false);
  const showSettings = useCallback(() => {
    setSettingsVisible(true);
  }, []);

  const hideSettings = useCallback(() => {
    setSettingsVisible(false);
  }, []);

  const uniqueId = useMemo(() => uuid(), []);

  // If `allow_language_selection` is not set, default to true. Otherwise, use its value.
  const allowLanguageSelection = useMemo(
    () => Boolean(field.allow_language_selection),
    [field.allow_language_selection],
  );

  const availableLanguages = languages.map(language =>
    valueToOption({ name: language.codemirror_mode, label: language.label }),
  );

  return (
    <StyledCodeControlWrapper>
      {allowLanguageSelection ? (
        !settingsVisible ? (
          <SettingsButton onClick={showSettings} />
        ) : (
          <SettingsPane
            hideSettings={hideSettings}
            uniqueId={uniqueId}
            languages={availableLanguages}
            language={valueToOption(lang)}
            allowLanguageSelection={allowLanguageSelection}
            onChangeLanguage={newLang => setLang(newLang)}
          />
        )
      ) : null}
      <ObjectWidgetTopBar
        key="file-control-top-bar"
        collapsed={collapsed}
        onCollapseToggle={handleCollapseToggle}
        heading={field.label ?? field.name}
        hasError={hasErrors}
        t={t}
      />
      <StyledCodeControlContent $collapsed={collapsed}>
        <CodeMirror
          value={code}
          height="auto"
          minHeight="120px"
          width="100%"
          editable={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          extensions={extensions}
        />
      </StyledCodeControlContent>
      <Outline active={hasFocus} hasError={hasErrors} />
    </StyledCodeControlWrapper>
  );
};

export default CodeControl;
