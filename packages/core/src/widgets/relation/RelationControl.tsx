import * as fuzzy from 'fuzzy';
import uniqBy from 'lodash/uniqBy';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  currentBackend,
  expandSearchEntries,
  getEntryField,
  mergeExpandedEntries,
} from '@staticcms/core/backend';
import Autocomplete from '@staticcms/core/components/common/autocomplete/Autocomplete';
import Field from '@staticcms/core/components/common/field/Field';
import Pill from '@staticcms/core/components/common/pill/Pill';
import CircularProgress from '@staticcms/core/components/common/progress/CircularProgress';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { getFields } from '@staticcms/core/lib/util/collection.util';
import { fileSearch, sortByScore } from '@staticcms/core/lib/util/search.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { getSelectedValue, parseHitOptions } from './util';

import type {
  ConfigWithDefaults,
  Entry,
  ObjectValue,
  RelationField,
  WidgetControlProps,
} from '@staticcms/core';
import type { FC, ReactNode } from 'react';
import type { ListChildComponentProps } from 'react-window';
import type { HitOption } from './types';

import './RelationControl.css';

export const classes = generateClassNames('WidgetRelation', [
  'root',
  'error',
  'required',
  'disabled',
  'for-single-list',
  'values',
  'loading',
]);

function Option({ index, style, data }: ListChildComponentProps<{ options: ReactNode[] }>) {
  return <div style={style}>{data.options[index]}</div>;
}

export interface Option {
  value: string;
  label: string;
}

function uniqOptions(initial: HitOption[], current: HitOption[]): HitOption[] {
  return uniqBy(initial.concat(current), o => o.value);
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
  entry,
}) => {
  const [internalRawValue, setInternalValue] = useState(value);
  const internalValue = useMemo(
    () => (duplicate ? value : internalRawValue),
    [internalRawValue, duplicate, value],
  );
  const [initialOptions, setInitialOptions] = useState<HitOption[]>([]);

  const searchCollection = useAppSelector(state => selectCollection(state, field.collection));
  const searchCollectionFields = useMemo(
    () => getFields(searchCollection, entry.slug),
    [entry.slug, searchCollection],
  );

  const isMultiple = useMemo(() => {
    return field.multiple ?? false;
  }, [field.multiple]);

  const [options, setOptions] = useState<HitOption[]>([]);
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const loading = useMemo(() => !entries, [entries]);

  const filterOptions = useCallback(
    (inputValue: string) => {
      if (!entries) {
        return;
      }

      const searchFields = field.search_fields;
      const file = field.file;
      const limit = field.options_length || DEFAULT_OPTIONS_LIMIT;

      let hits: Entry<ObjectValue>[];

      if (file) {
        hits = fileSearch(
          entries.find(e => e.slug === file),
          searchFields,
          inputValue,
        );
      } else {
        const expandedEntries = expandSearchEntries(entries, searchFields);
        hits = mergeExpandedEntries(
          fuzzy
            .filter(inputValue, expandedEntries, {
              extract: entry => {
                return getEntryField(entry.field, entry);
              },
            })
            .sort(sortByScore)
            .map(f => f.original),
        );
      }

      let options = uniqBy(
        parseHitOptions(hits, field, locale, searchCollectionFields),
        o => o.value,
      );

      if (limit !== undefined && limit > 0) {
        options = options.slice(0, limit);
      }

      setOptions(options);
    },
    [entries, field, locale, searchCollectionFields],
  );

  useEffect(() => {
    if (!loading || !searchCollection) {
      return;
    }

    let alive = true;

    const getOptions = async () => {
      const backend = currentBackend(config);

      const options = await backend.listAllEntries(
        searchCollection,
        config as unknown as ConfigWithDefaults,
      );

      if (alive) {
        setEntries(options);

        const hitOptions = parseHitOptions(options, field, locale, searchCollectionFields);

        if (value) {
          const byValue = hitOptions.reduce(
            (acc, option) => {
              acc[option.value] = option;
              return acc;
            },
            {} as Record<string, HitOption>,
          );

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
      }
    };

    getOptions();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCollection, config, loading, field, locale, searchCollectionFields]);

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
      uniqueOptions.reduce(
        (acc, option) => {
          acc[option.value] = option;
          return acc;
        },
        {} as Record<string, HitOption>,
      ),
    [uniqueOptions],
  );

  const selectedValue = useMemo(() => {
    let selected = getSelectedValue(internalValue, uniqueOptions, isMultiple);
    if (isMultiple && !selected) {
      selected = [];
    }
    return selected;
  }, [internalValue, isMultiple, uniqueOptions]);

  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (newValue: string | string[] | undefined) => {
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

  const isRequired = useMemo(() => field.required ?? true, [field.required]);

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
      rootClassName={classNames(
        classes.root,
        disabled && classes.disabled,
        field.required !== false && classes.required,
        hasErrors && classes.error,
        forSingleList && classes['for-single-list'],
      )}
    >
      <Autocomplete
        label={
          Array.isArray(selectedValue) && selectedValue.length > 0 ? (
            <div className={classes.values}>
              {selectedValue.map(selectValue => {
                const option = uniqueOptionsByValue[selectValue];
                return (
                  <Pill key={selectValue} noWrap disabled={disabled}>
                    {option?.label ?? selectValue}
                  </Pill>
                );
              })}
            </div>
          ) : null
        }
        inputRef={ref}
        value={selectedValue}
        options={uniqueOptions}
        disabled={disabled}
        required={isRequired}
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
        endAdornment={
          loading ? (
            <CircularProgress
              key="loading-indicator"
              className={classes.loading}
              data-testid="relation-loading-indicator"
              size="small"
            />
          ) : null
        }
        onQuery={filterOptions}
        onChange={handleChange}
      />
    </Field>
  );
};

export default RelationControl;
