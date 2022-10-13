import { ClassNames } from '@emotion/react';
import 'codemirror/keymap/emacs';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/vim';
import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import materialTheme from 'codemirror/theme/material.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import uuid from 'uuid/v4';

import languageData from './data/languages';
import SettingsButton from './SettingsButton';
import SettingsPane from './SettingsPane';

import type { Editor } from 'codemirror';
import type { CmsFieldCode, CmsWidgetControlProps } from '../../interface';

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
  isEditorComponent,
  isNewEditorComponent,
  field,
  value,
  onChange,
  onBlur
}: CmsWidgetControlProps<string | { [key: string]: string }, CmsFieldCode>) => {
  // If the value is a map, keys can be customized via config.
  const getKeys = useCallback(
    (field: CmsFieldCode) => {
      const defaults = {
        code: 'code',
        lang: 'lang',
      };

      // Force default keys if widget is an editor component code block.
      if (isEditorComponent) {
        return defaults;
      }

      const keys = field.keys ?? {};
      return { ...defaults, ...keys };
    },
    [isEditorComponent],
  );

  const keys = useMemo(() => getKeys(field), [field, getKeys]);

  // Determine if the persisted value is a map rather than a plain string. A map value allows both the code string and the language to be persisted.
  const valueIsMap = useMemo(
    () => Boolean(!field.output_code_only || isEditorComponent),
    [field.output_code_only, isEditorComponent],
  );

  // This widget is not fully controlled, it only takes a value through props upon initialization.
  const getInitialLang = useCallback(() => {
    return valueIsMap && typeof value !== 'string'
      ? value && value[keys.lang]
      : field.default_language;
  }, [field.default_language, keys.lang, value, valueIsMap]);

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
    (value && typeof value === 'object' ? value[keys.code] : value) ?? '',
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
        onChange({ ...(typeof value !== 'string' ? value : {}), lang: changedProps.lang });
      }
    },
    [codemirrorEditor, getLanguageByName, onChange, value, valueIsMap],
  );

  const [prevLang, setPrevLang] = useState<string | undefined>();
  useEffect(() => {
    if (prevLang !== lang) {
      handleChangeCodemirrorProps({ lang });
    }
    setPrevLang(lang);
  }, [handleChangeCodemirrorProps, lang, prevLang]);

  const [prevTheme, setPrevTheme] = useState<string | undefined>();
  useEffect(() => {
    if (prevTheme !== theme) {
      handleChangeCodemirrorProps({ theme });
    }
    setPrevTheme(theme);
  }, [handleChangeCodemirrorProps, theme, prevTheme]);

  const [prevKeyMap, setPrevKeyMap] = useState<string | undefined>();
  useEffect(() => {
    if (prevKeyMap !== keyMap) {
      handleChangeCodemirrorProps({ keyMap });
    }
    setPrevKeyMap(keyMap);
  }, [handleChangeCodemirrorProps, keyMap, prevKeyMap]);

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
        onChange({ ...(typeof value !== 'string' ? value : {}), code: newValue });
      }
      onChange(newValue);
    },
    [codemirrorEditor, onChange, value, valueIsMap],
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
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            css`
              ${codeMirrorStyles};
              ${materialTheme};
              ${styleString};
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
              ...field.codeMirrorConfig,
              extraKeys: {
                'Shift-Tab': 'indentLess',
                Tab: 'indentMore',
                ...(field.codeMirrorConfig.extraKeys || {}),
              },
              theme,
              mode,
              keyMap,
              viewportMargin: Infinity,
            }}
            detach={true}
            editorDidMount={cm => {
              setCodemirrorEditor(cm);
              if (isNewEditorComponent) {
                handleFocus();
              }
            }}
            value={lastKnownValue}
            onChange={(_editor, _data, newValue) => handleChange(newValue)}
            onFocus={handleFocus}
            onBlur={() => onBlur()}
          />
        </div>
      )}
    </ClassNames>
  );
};

export default CodeControl;
