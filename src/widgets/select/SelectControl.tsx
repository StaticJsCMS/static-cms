import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { List } from 'immutable';

import { validations } from '../../lib/widgets';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { CmsWidgetControlProps } from '../../interface';

interface Option {
  label: string;
  value: string;
}

function convertToOption(raw: string | Option | undefined): Option | undefined {
  if (typeof raw === 'string') {
    return { label: raw, value: raw };
  }

  return raw;
}

export default class SelectControl extends React.Component<
  CmsWidgetControlProps<string | string[] | null>
> {
  isValid = () => {
    const { field, value = '', t } = this.props;
    const min = field.min;
    const max = field.max;

    if (!field.multiple) {
      return { error: false };
    }

    const error = validations.validateMinMax(
      t,
      field.label ?? field.name,
      value as string[],
      min,
      max,
    );

    return error ? { error } : { error: false };
  };

  handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const selectedOption = event.target.value as string | string[];
    const { onChange, field } = this.props;
    const isMultiple: boolean = field.multiple ?? false;
    const isEmpty = isMultiple && Array.isArray(selectedOption) ? !selectedOption?.length : !selectedOption;

    if (field.required && isEmpty && isMultiple) {
      onChange(string[]());
    } else if (isEmpty) {
      onChange(null);
    } else if (typeof selectedOption === 'string') {
      onChange(selectedOption);
    } else if (isMultiple) {
      onChange(List(selectedOption));
    }
  };

  componentDidMount() {
    const { field, onChange, value } = this.props;
    if (field.required && field.multiple) {
      if (value && !List.isList(value)) {
        onChange(List([value]));
      } else if (!value) {
        onChange(List());
      }
    }
  }

  render() {
    const { field, value, forID, setActiveStyle, setInactiveStyle } = this.props;
    const fieldOptions: (string | Option)[] = field.options;
    const isMultiple = field.multiple ?? false;

    const options = [...(fieldOptions.map(convertToOption) as Option[])].filter(Boolean);

    return (
      <FormControl
        fullWidth
        sx={{
          '.MuiInputBase-root': {
            borderTopLeftRadius: 0,
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#dfdfe3',
            },
            '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#dfdfe3',
            },
          },
        }}
      >
        <Select
          id={forID}
          value={value ? (List.isList(value) ? value.toJS() as string[] : value) : isMultiple ? [] : ''}
          onChange={event => this.handleChange(event)}
          multiple={isMultiple}
          onFocus={setActiveStyle}
          onBlur={setInactiveStyle}
        >
          {options.map(option => (
            <MenuItem key={`option-${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
