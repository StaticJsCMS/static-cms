import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ClassNames } from '@emotion/react';
import { Record } from 'immutable';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import uuid from 'uuid/v4';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import CodeMirror from 'codemirror';
import 'codemirror/keymap/vim';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/emacs';
import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import materialTheme from 'codemirror/theme/material.css';

import SettingsPane from './SettingsPane';
import SettingsButton from './SettingsButton';
import languageData from './data/languages.json';
import { CmsFieldCode, CmsWidgetControlProps } from '../../interface';

// TODO: relocate as a utility function
function getChangedProps(previous, next, keys) {
  const propNames = keys || uniq(Object.keys(previous), Object.keys(next));
  const changedProps = propNames.reduce((acc, prop) => {
    if (previous[prop] !== next[prop]) {
      acc[prop] = next[prop];
    }
    return acc;
  }, {});
  if (!isEmpty(changedProps)) {
    return changedProps;
  }
}

const languages = languageData.map(lang => ({
  label: lang.label,
  name: lang.identifiers[0],
  mode: lang.codemirror_mode,
  mimeType: lang.codemirror_mime_type,
}));

const styleString = `
  padding: 0;
`;

const defaultLang = { name: '', mode: '', label: 'none' };

function valueToOption(val) {
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

const CodeControl = ({classNameWrapper, forID, isNewEditorComponent, field, value}: CmsWidgetControlProps<string | Record<string, string>, CmsFieldCode>) => {
  const [isActive, setIsActive] = useState(false);
  const [unknownLang, setUnknownLang] = useState<string | null>(null);
  const [lang, setLang] = useState('');
  const [keyMap, setKeyMap] = useState(localStorage.getItem(settingsPersistKeys['keyMap']) || 'default');
  const [settingsVisibile, setSettingsVisible] = useState(false);
  const [codeMirrorKey, setCodeMirrorKey] = useState(uuid());
  const [theme, setTheme] = useState(localStorage.getItem(settingsPersistKeys['theme']) || themes[themes.length - 1]);
  const [lastKnownValue, setLastKnownValue] = useState(value && typeof value === 'object' ? value[keys.code] : value);

  const keys = useMemo(() => getKeys(field), []);

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     !isEqual(this.state, nextState) || this.props.classNameWrapper !== nextProps.classNameWrapper
  //   );
  // }

  // componentDidMount() {
  //   this.setState({
  //     lang: this.getInitialLang() || '',
  //   });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.updateCodeMirrorProps(prevState);
  // }

  const getLanguageByName = useCallback((name: string) => {
    return languages.find(lang => lang.name === name);
  }, []);

  const handleChangeCodeMirrorProps = useCallback(async (changedProps: { lang: string | undefined }) => {
    if (changedProps.lang) {
      const { mode } = getLanguageByName(changedProps.lang) || {};
      if (mode) {
        require(`codemirror/mode/${mode}/${mode}.js`);
      }
    }

    // Changing CodeMirror props requires re-initializing the
    // detached/uncontrolled React CodeMirror component, so here we save and
    // restore the selections and cursor position after the state change.
    if (this.cm) {
      const cursor = this.cm.doc.getCursor();
      const selections = this.cm.doc.listSelections();
      this.setState({ codeMirrorKey: uuid() }, () => {
        this.cm.doc.setCursor(cursor);
        this.cm.doc.setSelections(selections);
      });
    }

    for (const key of ['theme', 'keyMap']) {
      if (changedProps[key]) {
        localStorage.setItem(settingsPersistKeys[key], changedProps[key]);
      }
    }

    // Only persist the language change if supported - requires the value to be
    // a map rather than just a code string.
    if (changedProps.lang && this.valueIsMap()) {
      onChange(this.toValue('lang', changedProps.lang));
    }
  }, []);

  const updateCodeMirrorProps = useCallback((prevState) => {
    const keys = ['lang', 'theme', 'keyMap'];
    const changedProps = getChangedProps(prevState, this.state, keys);
    if (changedProps) {
      this.handleChangeCodeMirrorProps(changedProps);
    }
  }, []);

  getKeyMapOptions = () => {
    return Object.keys(CodeMirror.keyMap)
      .sort()
      .filter(keyMap => ['emacs', 'vim', 'sublime', 'default'].includes(keyMap))
      .map(keyMap => ({ value: keyMap, label: keyMap }));
  };

  // This widget is not fully controlled, it only takes a value through props
  // upon initialization.
  getInitialLang = () => {
    const { value, field } = this.props;
    const lang =
      (this.valueIsMap() && value && value.get(this.keys.lang)) || field.default_language;
    const langInfo = this.getLanguageByName(lang);
    if (lang && !langInfo) {
      this.setState({ unknownLang: lang });
    }
    return lang;
  };

  // If `allow_language_selection` is not set, default to true. Otherwise, use
  // its value.
  allowLanguageSelection =
    !this.props.field.has('allow_language_selection') ||
    !!this.props.field.allow_language_selection;

  toValue = this.valueIsMap()
    ? (type, value) => (this.props.value || Record()).set(this.keys[type], value)
    : (type, value) => (type === 'code' ? value : this.props.value);

  // If the value is a map, keys can be customized via config.
  getKeys(field) {
    const defaults = {
      code: 'code',
      lang: 'lang',
    };

    // Force default keys if widget is an editor component code block.
    if (this.props.isEditorComponent) {
      return defaults;
    }

    const keys = field.get('keys', Record()).toJS();
    return { ...defaults, ...keys };
  }

  // Determine if the persisted value is a map rather than a plain string. A map
  // value allows both the code string and the language to be persisted.
  valueIsMap() {
    const { field, isEditorComponent } = this.props;
    return !field.output_code_only || isEditorComponent;
  }

  handleChange(newValue) {
    const cursor = this.cm.doc.getCursor();
    const selections = this.cm.doc.listSelections();
    this.setState({ lastKnownValue: newValue });
    this.props.onChange(this.toValue('code', newValue), { cursor, selections });
  }

  showSettings = () => {
    this.setState({ settingsVisible: true });
  };

  hideSettings = () => {
    if (this.state.settingsVisible) {
      this.setState({ settingsVisible: false });
    }
    this.cm.focus();
  };

  handleFocus = () => {
    this.hideSettings();
    this.props.setActiveStyle();
    this.setActive();
  };

  handleBlur = () => {
    this.setInactive();
    this.props.setInactiveStyle();
  };

  setActive = () => this.setState({ isActive: true });
  setInactive = () => this.setState({ isActive: false });

    const langInfo = this.getLanguageByName(lang);
    const mode = langInfo?.mimeType || langInfo?.mode;

    return (
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              classNameWrapper,
              css`
                ${codeMirrorStyles};
                ${materialTheme};
                ${styleString};
              `,
            )}
          >
            {!settingsVisible && <SettingsButton onClick={this.showSettings} />}
            {settingsVisible && (
              <SettingsPane
                hideSettings={this.hideSettings}
                forID={forID}
                modes={modes}
                mode={valueToOption(langInfo || defaultLang)}
                theme={themes.find(t => t === theme)}
                themes={themes}
                keyMap={{ value: keyMap, label: keyMap }}
                keyMaps={this.getKeyMapOptions()}
                allowLanguageSelection={this.allowLanguageSelection}
                onChangeLang={newLang => this.setState({ lang: newLang })}
                onChangeTheme={newTheme => this.setState({ theme: newTheme })}
                onChangeKeyMap={newKeyMap => this.setState({ keyMap: newKeyMap })}
              />
            )}
            <ReactCodeMirror
              key={codeMirrorKey}
              id={forID}
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
                ...widget.codeMirrorConfig,
                extraKeys: {
                  'Shift-Tab': 'indentLess',
                  Tab: 'indentMore',
                  ...(widget.codeMirrorConfig.extraKeys || {}),
                },
                theme,
                mode,
                keyMap,
                viewportMargin: Infinity,
              }}
              detach={true}
              editorDidMount={cm => {
                this.cm = cm;
                if (isNewEditorComponent) {
                  this.handleFocus();
                }
              }}
              value={lastKnownValue}
              onChange={(editor, data, newValue) => this.handleChange(newValue)}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </div>
        )}
      </ClassNames>
    );
}
