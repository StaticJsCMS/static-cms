import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import isHotkey from 'is-hotkey';
import React from 'react';

import { shadows, zIndex } from '@staticcms/core/components/UI/styles';
import SettingsButton from './SettingsButton';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { FC } from 'react';

const SettingsPaneContainer = styled('div')`
  position: absolute;
  top: 1px;
  bottom: 1px;
  right: 1px;
  width: 200px;
  z-index: ${zIndex.zIndex10};
  background-color: #fff;
  overflow: hidden;
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
  type: 'language';
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

const SettingsSelect: FC<SettingsSelectProps> = ({
  value,
  label,
  options,
  onChange,
  uniqueId,
  type,
}) => {
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

export interface SettingsPaneProps {
  hideSettings: () => void;
  uniqueId: string;
  languages: {
    value: string;
    label: string;
  }[];
  language: {
    value: string;
    label: string;
  };
  allowLanguageSelection: boolean;
  onChangeLanguage: (lang: string) => void;
}

const SettingsPane: FC<SettingsPaneProps> = ({
  hideSettings,
  uniqueId,
  languages,
  language,
  onChangeLanguage,
}) => {
  return (
    <SettingsPaneContainer onKeyDown={e => isHotkey('esc', e) && hideSettings()}>
      <SettingsButton onClick={hideSettings} showClose={true} />
      <>
        <SettingsSectionTitle>Field Settings</SettingsSectionTitle>
        <SettingsSelect
          type="language"
          label="Language"
          uniqueId={uniqueId}
          value={language}
          options={languages}
          onChange={onChangeLanguage}
        />
      </>
    </SettingsPaneContainer>
  );
};

export default SettingsPane;
