import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import isHotkey from 'is-hotkey';
import React from 'react';

import { shadows, text, zIndex } from '../../components/UI/styles';
import SettingsButton from './SettingsButton';

import type { SelectChangeEvent } from '@mui/material/Select';

const SettingsPaneContainer = styled('div')`
  position: absolute;
  right: 0;
  width: 200px;
  z-index: ${zIndex.zIndex10};
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  overflow-y: scroll;
  padding: 12px;
  border-radius: 0 3px 3px 0;
  ${shadows.drop};
`;

const SettingsFieldLabel = styled('label')`
  ${text.fieldLabel};
  font-size: 11px;
  display: block;
  margin-top: 8px;
  margin-bottom: 2px;
`;

const SettingsSectionTitle = styled('h3')`
  font-size: 14px;
  margin-top: 14px;
  margin-bottom: 0;

  &:first-of-type {
    margin-top: 4px;
  }
`;

interface SettingsSelectProps {
  type: 'mode' | 'theme' | 'keymap';
  uniqueId: string;
  value: {
    value: string;
    label: string;
  };
  options: {
    value: string;
    label: string;
  }[];
  onChange: (newValue: string) => void;
}

const SettingsSelect = ({ value, options, onChange, uniqueId, type }: SettingsSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${uniqueId}-select-${type}-label`}>Age</InputLabel>
      <Select
        labelId={`${uniqueId}-select-${type}-label`}
        id={`${uniqueId}-select-${type}`}
        value={value.value}
        label="Age"
        onChange={handleChange}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={`${uniqueId}-select-${type}-option-${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface SettingsPaneProps {
  hideSettings: () => void;
  uniqueId: string;
  modes: {
    value: string;
    label: string;
  }[];
  mode: {
    value: string;
    label: string;
  };
  theme: string;
  themes: string[];
  keyMap: { value: string; label: string };
  keyMaps: {
    value: string;
    label: string;
  }[];
  allowLanguageSelection: boolean;
  onChangeLang: (lang: string) => void;
  onChangeTheme: (theme: string) => void;
  onChangeKeyMap: (keyMap: string) => void;
}

const SettingsPane = ({
  hideSettings,
  uniqueId,
  modes,
  mode,
  theme,
  themes,
  keyMap,
  keyMaps,
  allowLanguageSelection,
  onChangeLang,
  onChangeTheme,
  onChangeKeyMap,
}: SettingsPaneProps) => {
  return (
    <SettingsPaneContainer onKeyDown={e => isHotkey('esc', e) && hideSettings()}>
      <SettingsButton onClick={hideSettings} showClose={true} />
      {allowLanguageSelection && (
        <>
          <SettingsSectionTitle>Field Settings</SettingsSectionTitle>
          <SettingsFieldLabel htmlFor={`${uniqueId}-select-mode`}>Mode</SettingsFieldLabel>
          <SettingsSelect
            type="mode"
            uniqueId={uniqueId}
            value={mode}
            options={modes}
            onChange={onChangeLang}
          />
        </>
      )}
      <>
        <SettingsSectionTitle>Global Settings</SettingsSectionTitle>
        {themes && (
          <>
            <SettingsFieldLabel htmlFor={`${uniqueId}-select-theme`}>Theme</SettingsFieldLabel>
            <SettingsSelect
              type="theme"
              uniqueId={uniqueId}
              value={{ value: theme, label: theme }}
              options={themes.map(t => ({ value: t, label: t }))}
              onChange={onChangeTheme}
            />
          </>
        )}
        <SettingsFieldLabel htmlFor={`${uniqueId}-select-keymap`}>KeyMap</SettingsFieldLabel>
        <SettingsSelect
          type="keymap"
          uniqueId={uniqueId}
          value={keyMap}
          options={keyMaps}
          onChange={onChangeKeyMap}
        />
      </>
    </SettingsPaneContainer>
  );
};

export default SettingsPane;
