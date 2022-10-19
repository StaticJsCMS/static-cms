import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import isHotkey from 'is-hotkey';
import React from 'react';

import { shadows, zIndex } from '../../components/UI/styles';
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
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  label: string;
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

const SettingsSelect = ({
  value,
  label,
  options,
  onChange,
  uniqueId,
  type,
}: SettingsSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${uniqueId}-select-${type}-label`}>{label}</InputLabel>
      <Select
        labelId={`${uniqueId}-select-${type}-label`}
        id={`${uniqueId}-select-${type}`}
        value={value.value}
        label={label}
        onChange={handleChange}
      >
        {options.map(({ label, value }) =>
          value ? (
            <MenuItem key={`${uniqueId}-select-${type}-option-${value}`} value={value}>
              {label}
            </MenuItem>
          ) : null,
        )}
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
          <SettingsSelect
            type="mode"
            label="Mode"
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
            <SettingsSelect
              type="theme"
              label="Theme"
              uniqueId={uniqueId}
              value={{ value: theme, label: theme }}
              options={themes.map(t => ({ value: t, label: t }))}
              onChange={onChangeTheme}
            />
          </>
        )}
        <SettingsSelect
          type="keymap"
          label="KeyMap"
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
