import { ClassNames } from '@emotion/react';
import { styled } from '@mui/material/styles';
import 'codemirror/keymap/emacs';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/vim';
import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import materialTheme from 'codemirror/theme/material.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import uuid from 'uuid/v4';

import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import transientOptions from '../../lib/util/transientOptions';
import languageData from './data/languages';
import SettingsButton from './SettingsButton';
import SettingsPane from './SettingsPane';

import type { Editor } from 'codemirror';
import type { CodeField, WidgetControlProps } from '../../interface';

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
    display: flex;
    ${
      $collapsed
        ? `
          visibility: hidden;
          height: 0;
          width: 0;
        `
        : ''
    }
  `,
);

interface CodeLanguage {
  label: string;
  name: string;
  mode: string;
  mimeType: string;
}

const languages: CodeLanguage[] = languageData.map(lang => ({
  label: lang.label,
  name: lang.identifiers[0],
  mode: lang.codemirror_mode,
  mimeType: lang.codemirror_mime_type,
}));

const styleString = `
  padding: 0;
`;

const defaultLang = { name: '', mode: '', label: 'none' };

function valueToOption(val: string | { name: string; label?: string }): {
  value: string;
  label: string;
} {
  if (typeof val === 'string') {
    return { value: val, label: val };
  }
  return { value: val.name, label: val.label || val.name };
}

const modes = languages.map(valueToOption);

const themes = ['default', 'material'];

const settingsPersistKeys = {
  theme: 'cms.codemirror.theme',
  keyMap: 'cms.codemirror.keymap',
};

const CodeControl = ({
  field,
  onChange,
  hasErrors,
  value,
  t,
}: WidgetControlProps<string | { [key: string]: string }, CodeField>) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [collapsed, setCollapsed] = useState(false);

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

  // If the value is a map, keys can be customized via config.
  const getKeys = useCallback((field: CodeField) => {
    const defaults = {
      code: 'code',
      lang: 'lang',
    };

    const keys = field.keys ?? {};
    return { ...defaults, ...keys };
  }, []);

  const keys = useMemo(() => getKeys(field), [field, getKeys]);

  // Determine if the persisted value is a map rather than a plain string. A map value allows both the code string and the language to be persisted.
  const valueIsMap = useMemo(() => Boolean(!field.output_code_only), [field.output_code_only]);

  // This widget is not fully controlled, it only takes a value through props upon initialization.
  const getInitialLang = useCallback(() => {
    return valueIsMap && typeof internalValue !== 'string'
      ? internalValue && internalValue[keys.lang]
      : field.default_language;
  }, [field.default_language, keys.lang, internalValue, valueIsMap]);

  const [codemirrorEditor, setCodemirrorEditor] = useState<Editor | null>(null);
  const [lang, setLang] = useState(getInitialLang() ?? '');
  const [keyMap, setKeyMap] = useState(
    localStorage.getItem(settingsPersistKeys['keyMap']) || 'default',
  );
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [codemirrorKey, setCodemirrorKey] = useState(uuid());
  const [theme, setTheme] = useState(
    localStorage.getItem(settingsPersistKeys['theme']) || themes[themes.length - 1],
  );
  const [lastKnownValue, setLastKnownValue] = useState<string>(
    (internalValue && typeof internalValue === 'object'
      ? internalValue[keys.code]
      : internalValue) ?? '',
  );

  const getLanguageByName = useCallback((name: string) => {
    return languages.find(lang => lang.name === name);
  }, []);

  const handleChangeCodemirrorProps = useCallback(
    async (changedProps: { lang?: string; theme?: string; keyMap?: string }) => {
      if (changedProps.lang) {
        const { mode } = getLanguageByName(changedProps.lang) || {};
        if (mode) {
          require(`codemirror/mode/${mode}/${mode}.js`);
        }
      }

      // Changing CodeMirror props requires re-initializing the
      // detached/uncontrolled React CodeMirror component, so here we save and
      // restore the selections and cursor position after the state change.
      if (codemirrorEditor) {
        const cursor = codemirrorEditor.getDoc().getCursor();
        const selections = codemirrorEditor.getDoc().listSelections();
        setCodemirrorKey(uuid());
        codemirrorEditor.getDoc().setCursor(cursor);
        codemirrorEditor.getDoc().setSelections(selections);
      }

      if (changedProps.theme) {
        localStorage.setItem(settingsPersistKeys.theme, changedProps.theme);
      }

      if (changedProps.keyMap) {
        localStorage.setItem(settingsPersistKeys.keyMap, changedProps.keyMap);
      }

      // Only persist the language change if supported - requires the value to be
      // a map rather than just a code string.
      if (changedProps.lang && valueIsMap) {
        handleOnChange({
          ...(typeof internalValue !== 'string' ? internalValue : {}),
          lang: changedProps.lang,
        });
      }
    },
    [codemirrorEditor, getLanguageByName, handleOnChange, internalValue, valueIsMap],
  );

  const [prevLang, setPrevLang] = useState<string | undefined>();
  useEffect(() => {
    if (prevLang !== lang) {
      setPrevLang(lang);
      setTimeout(() => {
        handleChangeCodemirrorProps({ lang });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const [prevTheme, setPrevTheme] = useState<string | undefined>();
  useEffect(() => {
    if (prevTheme !== theme) {
      setPrevTheme(theme);
      setTimeout(() => {
        handleChangeCodemirrorProps({ theme });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const [prevKeyMap, setPrevKeyMap] = useState<string | undefined>();
  useEffect(() => {
    if (prevKeyMap !== keyMap) {
      setPrevKeyMap(keyMap);
      setTimeout(() => {
        handleChangeCodemirrorProps({ keyMap });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyMap]);

  const getKeyMapOptions = useCallback(() => {
    return ['emacs', 'vim', 'sublime', 'default'].map(keyMap => ({ value: keyMap, label: keyMap }));
  }, []);

  // If `allow_language_selection` is not set, default to true. Otherwise, use its value.
  const allowLanguageSelection = useMemo(
    () => Boolean(field.allow_language_selection),
    [field.allow_language_selection],
  );

  const handleChange = useCallback(
    (newValue: string) => {
      if (!codemirrorEditor) {
        return;
      }

      setLastKnownValue(newValue);

      if (valueIsMap) {
        handleOnChange({
          ...(typeof internalValue !== 'string' ? internalValue : {}),
          code: newValue,
        });
      }
      handleOnChange(newValue);
    },
    [codemirrorEditor, handleOnChange, internalValue, valueIsMap],
  );

  const showSettings = useCallback(() => {
    setSettingsVisible(true);
  }, []);

  const hideSettings = useCallback(() => {
    if (settingsVisible) {
      setSettingsVisible(false);
    }
    codemirrorEditor?.focus();
  }, [codemirrorEditor, settingsVisible]);

  const handleFocus = useCallback(() => {
    hideSettings();
  }, [hideSettings]);

  const langInfo = useMemo(() => getLanguageByName(lang), [getLanguageByName, lang]);
  const mode = langInfo?.mimeType || langInfo?.mode;

  const uniqueId = useMemo(() => uuid(), []);

  return (
    <StyledCodeControlWrapper>
      <ObjectWidgetTopBar
        key="file-control-top-bar"
        collapsed={collapsed}
        onCollapseToggle={handleCollapseToggle}
        heading={field.label ?? field.name}
        hasError={hasErrors}
        t={t}
      />
      <StyledCodeControlContent $collapsed={collapsed}>
        <ClassNames>
          {({ css, cx }) => (
            <div
              className={cx(
                css`
                  ${codeMirrorStyles};
                  ${materialTheme};
                  ${styleString};

                  width: 100%;
                  position: relative;
                `,
              )}
            >
              {!settingsVisible && <SettingsButton onClick={showSettings} />}
              {settingsVisible && (
                <SettingsPane
                  hideSettings={hideSettings}
                  uniqueId={uniqueId}
                  modes={modes}
                  mode={valueToOption(langInfo || defaultLang)}
                  theme={themes.find(t => t === theme) ?? themes[0]}
                  themes={themes}
                  keyMap={{ value: keyMap, label: keyMap }}
                  keyMaps={getKeyMapOptions()}
                  allowLanguageSelection={allowLanguageSelection}
                  onChangeLang={newLang => setLang(newLang)}
                  onChangeTheme={newTheme => setTheme(newTheme)}
                  onChangeKeyMap={newKeyMap => setKeyMap(newKeyMap)}
                />
              )}
              <ReactCodeMirror
                key={codemirrorKey}
                className={css`
                  height: 100%;
                  border-radius: 0 3px 3px;
                  overflow: hidden;

                  .CodeMirror {
                    height: auto !important;
                    cursor: text;
                    min-height: 300px;
                  }

                  .CodeMirror-scroll {
                    min-height: 300px;
                  }
                `}
                options={{
                  lineNumbers: true,
                  ...field.code_mirror_config,
                  extraKeys: {
                    'Shift-Tab': 'indentLess',
                    Tab: 'indentMore',
                    ...(field.code_mirror_config?.extra_keys ?? {}),
                  },
                  theme,
                  mode,
                  keyMap,
                  viewportMargin: Infinity,
                }}
                detach={true}
                editorDidMount={cm => {
                  setCodemirrorEditor(cm);
                }}
                value={lastKnownValue}
                onChange={(_editor, _data, newValue) => handleChange(newValue)}
                onFocus={handleFocus}
              />
            </div>
          )}
        </ClassNames>
      </StyledCodeControlContent>
      <Outline hasError={hasErrors} />
    </StyledCodeControlWrapper>
  );
};

export default CodeControl;
