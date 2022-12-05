import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import find from 'lodash/find';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { QUERY_SUCCESS } from '@staticcms/core/actions/search';
import { isNotEmpty } from '@staticcms/core/lib/util/string.util';
import {
  addFileTemplateFields,
  compileStringTemplate,
  expandPath,
  extractTemplateVars,
} from '@staticcms/core/lib/widgets/stringTemplate';

import type {
  Entry,
  EntryData,
  RelationField,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC, ReactNode } from 'react';
import type { ListChildComponentProps } from 'react-window';

function Option({ index, style, data }: ListChildComponentProps<{ options: ReactNode[] }>) {
  return <div style={style}>{data.options[index]}</div>;
}

export interface HitOption {
  data: EntryData;
  value: string;
  label: string;
}

export interface Option {
  value: string;
  label: string;
}

function optionToString(option: Option | HitOption | null): string {
  return option && option.value ? option.value : '';
}

function convertToOption(raw: string | HitOption): HitOption;
function convertToOption(raw: string | Option | HitOption): Option;
function convertToOption(raw: string | HitOption | undefined): HitOption | undefined;
function convertToOption(raw: string | Option | HitOption | undefined): Option | undefined;
function convertToOption(raw: string | Option | HitOption | undefined): Option | undefined {
  if (typeof raw === 'string') {
    return { label: raw, value: raw };
  }
  return raw;
}

function getSelectedOptions(value: HitOption[] | undefined | null): HitOption[] | null;
function getSelectedOptions(value: string[] | undefined | null): string[] | null;
function getSelectedOptions(value: string[] | HitOption[] | undefined | null) {
  if (!value || !Array.isArray(value)) {
    return null;
  }

  return value;
}

function uniqOptions(initial: HitOption[], current: HitOption[]): HitOption[] {
  return uniqBy(initial.concat(current), o => o.value);
}

function getSelectedValue(
  value: string,
  options: HitOption[],
  isMultiple: boolean,
): HitOption | null;
function getSelectedValue(
  value: string[],
  options: HitOption[],
  isMultiple: boolean,
): HitOption[] | null;
function getSelectedValue(
  value: string | string[] | null | undefined,
  options: HitOption[],
  isMultiple: boolean,
): HitOption | HitOption[] | null;
function getSelectedValue(
  value: string | string[] | null | undefined,
  options: HitOption[],
  isMultiple: boolean,
): HitOption | HitOption[] | null {
  if (isMultiple && Array.isArray(value)) {
    const selectedOptions = getSelectedOptions(value);
    if (selectedOptions === null) {
      return null;
    }

    const selected = selectedOptions
      .map(i => options.find(o => o.value === i))
      .filter(Boolean)
      .map(convertToOption) as HitOption[];

    return selected;
  } else {
    return find(options, ['value', value]) ?? null;
  }
}

const RelationControl: FC<WidgetControlProps<string | string[], RelationField>> = ({
  path,
  value,
  field,
  onChange,
  query,
  locale,
  label,
  hasErrors,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [initialOptions, setInitialOptions] = useState<HitOption[]>([]);

  const isMultiple = useMemo(() => {
    return field.multiple ?? false;
  }, [field.multiple]);

  const parseNestedFields = useCallback(
    (hit: Entry, field: string): string => {
      const hitData =
        locale != null && hit.i18n != null && hit.i18n[locale] != null
          ? hit.i18n[locale].data
          : hit.data;
      const templateVars = extractTemplateVars(field);
      // return non template fields as is
      if (templateVars.length <= 0) {
        return get(hitData, field) as string;
      }
      const data = addFileTemplateFields(hit.path, hitData);
      return compileStringTemplate(field, null, hit.slug, data);
    },
    [locale],
  );

  const parseHitOptions = useCallback(
    (hits: Entry[]) => {
      const valueField = field.value_field;
      const displayField = field.display_fields || [field.value_field];
      const options = hits.reduce((acc, hit) => {
        const valuesPaths = expandPath({ data: hit.data, path: valueField });
        for (let i = 0; i < valuesPaths.length; i++) {
          const label = displayField
            .map(key => {
              const displayPaths = expandPath({ data: hit.data, path: key });
              return parseNestedFields(hit, displayPaths[i] || displayPaths[0]);
            })
            .join(' ');
          const value = parseNestedFields(hit, valuesPaths[i]) as string;
          acc.push({ data: hit.data, value, label });
        }

        return acc;
      }, [] as HitOption[]);

      return options;
    },
    [field.display_fields, field.value_field, parseNestedFields],
  );

  const handleChange = useCallback(
    (selectedOption: HitOption | HitOption[] | null) => {
      if (Array.isArray(selectedOption)) {
        const options = selectedOption;
        setInitialOptions(options.filter(Boolean));
        const newValue = options.map(optionToString);
        setInternalValue(newValue);
        onChange(newValue);
      } else {
        setInitialOptions([selectedOption].filter(Boolean) as HitOption[]);
        const newValue = optionToString(selectedOption);
        setInternalValue(newValue);
        onChange(newValue);
      }
    },
    [onChange],
  );

  const [options, setOptions] = useState<HitOption[]>([]);
  const [open, setOpen] = useState(false);
  const valueNotEmpty = useMemo(
    () => (Array.isArray(internalValue) ? internalValue.length > 0 : isNotEmpty(internalValue)),
    [internalValue],
  );
  const loading = useMemo(
    () => (open || valueNotEmpty) && options.length === 0,
    [open, valueNotEmpty, options.length],
  );

  useEffect(() => {
    let alive = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      const collection = field.collection;
      const optionsLength = field.options_length || 20;
      const searchFieldsArray = field.search_fields;
      const file = field.file;

      const response = await query(path, collection, searchFieldsArray, '', file, optionsLength);
      if (alive) {
        if (response?.type === QUERY_SUCCESS) {
          const hits = response.payload.hits ?? [];
          const options = parseHitOptions(hits);
          setOptions(uniqOptions(initialOptions, options));
        }
      }
    })();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.collection, field.file, field.options_length, field.search_fields, loading]);

  const uniqueOptions = uniqOptions(initialOptions, options);
  const selectedValue = getSelectedValue(internalValue, uniqueOptions, isMultiple);

  return (
    <Autocomplete
      key="relation-control-autocomplete"
      disablePortal
      options={uniqueOptions}
      fullWidth
      renderInput={params => (
        <TextField
          key="relation-control-input"
          {...params}
          label={label}
          error={hasErrors}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      value={selectedValue ? selectedValue : isMultiple ? [] : null}
      onChange={(_event, newValue) => handleChange(newValue)}
      multiple={isMultiple}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
    />
  );
};

export default RelationControl;
