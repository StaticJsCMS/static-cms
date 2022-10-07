import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import isHotkey from 'is-hotkey';
import React from 'react';

import { shadows, text, zIndex } from '../../ui';
import SettingsButton from './SettingsButton';

import type { SelectChangeEvent } from '@mui/material/Select';

const SettingsPaneContainer = styled.div`
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

const SettingsFieldLabel = styled.label`
  ${text.fieldLabel};
  font-size: 11px;
  display: block;
  margin-top: 8px;
  margin-bottom: 2px;
`;

const SettingsSectionTitle = styled.h3`
  font-size: 14px;
  margin-top: 14px;
  margin-bottom: 0;

  &:first-of-type {
    margin-top: 4px;
  }
`;

interface SettingsSelectProps {
  type: 'mode' | 'theme' | 'keymap';
  forID: string;
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

const SettingsSelect = ({ value, options, onChange, forID, type }: SettingsSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${forID}-select-${type}-label`}>Age</InputLabel>
      <Select
        labelId={`${forID}-select-${type}-label`}
        id={`${forID}-select-${type}`}
        value={value.value}
        label="Age"
        onChange={handleChange}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={`${forID}-select-${type}-option-${value}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface SettingsPaneProps {
  hideSettings: () => void;
  forID: string;
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
  forID,
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
          <SettingsFieldLabel htmlFor={`${forID}-select-mode`}>Mode</SettingsFieldLabel>
          <SettingsSelect
            type="mode"
            forID={forID}
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
            <SettingsFieldLabel htmlFor={`${forID}-select-theme`}>Theme</SettingsFieldLabel>
            <SettingsSelect
              type="theme"
              forID={forID}
              value={{ value: theme, label: theme }}
              options={themes.map(t => ({ value: t, label: t }))}
              onChange={onChangeTheme}
            />
          </>
        )}
        <SettingsFieldLabel htmlFor={`${forID}-select-keymap`}>KeyMap</SettingsFieldLabel>
        <SettingsSelect
          type="keymap"
          forID={forID}
          value={keyMap}
          options={keyMaps}
          onChange={onChangeKeyMap}
        />
      </>
    </SettingsPaneContainer>
  );
};

export default SettingsPane;
