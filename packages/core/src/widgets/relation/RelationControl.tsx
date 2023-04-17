import * as fuzzy from 'fuzzy';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  currentBackend,
  expandSearchEntries,
  getEntryField,
  mergeExpandedEntries,
  sortByScore,
} from '@staticcms/core/backend';
import Autocomplete from '@staticcms/core/components/common/autocomplete/Autocomplete';
import Field from '@staticcms/core/components/common/field/Field';
import Pill from '@staticcms/core/components/common/pill/Pill';
import CircularProgress from '@staticcms/core/components/common/progress/CircularProgress';
import { isNullish } from '@staticcms/core/lib/util/null.util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import {
  addFileTemplateFields,
  compileStringTemplate,
  expandPath,
  extractTemplateVars,
} from '@staticcms/core/lib/widgets/stringTemplate';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';

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

function getSelectedValue(value: string, options: HitOption[], isMultiple: boolean): string | null;
function getSelectedValue(
  value: string[],
  options: HitOption[],
  isMultiple: boolean,
): string[] | null;
function getSelectedValue(
  value: string | string[] | null | undefined,
  options: HitOption[],
  isMultiple: boolean,
): string | string[] | null;
function getSelectedValue(
  value: string | string[] | null | undefined,
  options: HitOption[],
  isMultiple: boolean,
): string | string[] | null {
  if (isMultiple && Array.isArray(value)) {
    const selectedOptions = getSelectedOptions(value);
    if (selectedOptions === null) {
      return null;
    }

    const selected = selectedOptions
      .map(i => options.find(o => o.value === i))
      .filter(Boolean)
      .map(option => (typeof option === 'string' ? option : option?.value)) as string[];

    return selected;
  } else {
    return options.find(option => option.value === value)?.value ?? null;
  }
}

const DEFAULT_OPTIONS_LIMIT = 20;

const RelationControl: FC<WidgetControlProps<string | string[], RelationField>> = ({
  value,
  field,
  duplicate,
  config,
  locale,
  label,
  errors,
  hasErrors,
  disabled,
  forSingleList,
  onChange,
}) => {
  const [internalRawValue, setInternalValue] = useState(value);
  const internalValue = useMemo(
    () => (duplicate ? value : internalRawValue),
    [internalRawValue, duplicate, value],
  );
  const [initialOptions, setInitialOptions] = useState<HitOption[]>([]);

  const searchCollectionSelector = useMemo(
    () => selectCollection(field.collection),
    [field.collection],
  );
  const searchCollection = useAppSelector(searchCollectionSelector);

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
          const value = parseNestedFields(hit, valuesPaths[i]) as string;

          const label = displayField
            .map(key => {
              const displayPaths = expandPath({ data: hit.data, path: key });
              const path = displayPaths[i] ?? displayPaths[0];
              if (isNullish(path) || isEmpty(path)) {
                return value;
              }
              return parseNestedFields(hit, displayPaths[i] ?? displayPaths[0]);
            })
            .join(' ');

          acc.push({ data: hit.data, value, label });
        }

        return acc;
      }, [] as HitOption[]);

      return options;
    },
    [field.display_fields, field.value_field, parseNestedFields],
  );

  const [options, setOptions] = useState<HitOption[]>([]);
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const loading = useMemo(() => !entries, [entries]);

  const filterOptions = useCallback(
    (inputValue: string) => {
      if (!entries) {
        return;
      }

      const searchFields = field.search_fields;
      const limit = field.options_length || DEFAULT_OPTIONS_LIMIT;
      const expandedEntries = expandSearchEntries(entries, searchFields);
      const hits = fuzzy
        .filter(inputValue, expandedEntries, {
          extract: entry => {
            return getEntryField(entry.field, entry);
          },
        })
        .sort(sortByScore)
        .map(f => f.original);

      let options = uniqBy(parseHitOptions(mergeExpandedEntries(hits)), o => o.value);

      if (limit !== undefined && limit > 0) {
        options = options.slice(0, limit);
      }

      setOptions(options);
    },
    [entries, field.options_length, field.search_fields, parseHitOptions],
  );

  useEffect(() => {
    if (!loading || !searchCollection) {
      return;
    }

    const getOptions = async () => {
      const backend = currentBackend(config);

      const options = await backend.listAllEntries(searchCollection);
      setEntries(options);

      const hitOptions = parseHitOptions(options);

      if (value) {
        const byValue = hitOptions.reduce((acc, option) => {
          acc[option.value] = option;
          return acc;
        }, {} as Record<string, HitOption>);

        const newFilteredValue =
          typeof value === 'string'
            ? value in byValue
              ? [value]
              : []
            : value.filter(v => v && v in byValue);

        const newInitialOptions = newFilteredValue.map(v => byValue[v]);

        setInitialOptions(newInitialOptions);
      }

      setOptions(hitOptions);
    };

    getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCollection, config, loading, parseHitOptions]);

  const uniqueOptions = useMemo(() => {
    let uOptions = uniqOptions(initialOptions, options);

    const limit = field.options_length || DEFAULT_OPTIONS_LIMIT;
    if (limit !== undefined && limit > 0) {
      uOptions = uOptions.slice(0, limit);
    }

    return uOptions;
  }, [field.options_length, initialOptions, options]);

  const uniqueOptionsByValue = useMemo(
    () =>
      uniqueOptions.reduce((acc, option) => {
        acc[option.value] = option;
        return acc;
      }, {} as Record<string, HitOption>),
    [uniqueOptions],
  );

  const selectedValue = useMemo(() => {
    let selected = getSelectedValue(internalValue, uniqueOptions, isMultiple);
    if (isMultiple && !selected) {
      selected = [];
    }
    return selected;
  }, [internalValue, isMultiple, uniqueOptions]);

  const ref = useRef<HTMLButtonElement | null>(null);

  const handleChange = useCallback(
    (newValue: string | string[] | null) => {
      if (!newValue) {
        setInternalValue(newValue);
        onChange(newValue);
        return;
      }

      if (Array.isArray(newValue)) {
        const newFilteredValue = newValue.filter(v => v && v in uniqueOptionsByValue);
        const newInitialOptions = newFilteredValue.map(v => uniqueOptionsByValue[v]);
        setInitialOptions(newInitialOptions);
        setInternalValue(newFilteredValue);
        onChange(newFilteredValue);
      } else {
        if (!(newValue in uniqueOptionsByValue)) {
          setInternalValue(null);
          onChange(null);
          return;
        }
        setInitialOptions([uniqueOptionsByValue[newValue]]);
        setInternalValue(newValue);
        onChange(newValue);
      }
    },
    [onChange, uniqueOptionsByValue],
  );

  return (
    <Field
      inputRef={ref}
      label={label}
      errors={errors}
      noPadding={!hasErrors}
      hint={field.hint}
      forSingleList={forSingleList}
      cursor="text"
      disabled={disabled}
    >
      <Autocomplete
        label={
          <>
            {Array.isArray(selectedValue) && selectedValue.length > 0 ? (
              <div className="flex flex-wrap gap-2 w-full p-2 pr-0 max-w-fit">
                {selectedValue.map(selectValue => {
                  const option = uniqueOptionsByValue[selectValue];
                  return (
                    <Pill key={selectValue} noWrap disabled={disabled}>
                      {option?.label ?? selectValue}
                    </Pill>
                  );
                })}
              </div>
            ) : null}
            {loading ? (
              <CircularProgress
                key="loading-indicator"
                className="absolute inset-y-0 right-4 flex items-center pr-2"
                data-testid="relation-loading-indicator"
                size="small"
              />
            ) : null}
          </>
        }
        ref={ref}
        value={selectedValue}
        options={uniqueOptions}
        disabled={disabled}
        displayValue={item => {
          if (!item || Array.isArray(item)) {
            return '';
          }

          const option = uniqueOptionsByValue[item];
          if (!option) {
            return '';
          }

          return option.label;
        }}
        onQuery={filterOptions}
        onChange={handleChange}
      />
    </Field>
  );
};

export default RelationControl;
