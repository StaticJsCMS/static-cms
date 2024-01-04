import React, { useEffect, useMemo, useState } from 'react';

import { currentBackend } from '@staticcms/core/backend';
import Pill from '@staticcms/core/components/common/pill/Pill';
import { getFields } from '@staticcms/core/lib/util/collection.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { getSelectedValue, parseHitOptions } from './util';

import type { Entry, RelationField, ValueOrNestedValue } from '@staticcms/core/interface';
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

export interface RelationSummaryProps {
  field: RelationField;
  value: ValueOrNestedValue;
  locale: string | undefined;
  entry: Entry;
}

const RelationSummary: FC<RelationSummaryProps> = ({ value, field, locale, entry }) => {
  const [initialOptions, setInitialOptions] = useState<HitOption[]>([]);

  const searchCollection = useAppSelector(state => selectCollection(state, field.collection));
  const searchCollectionFields = useMemo(
    () => getFields(searchCollection, entry.slug),
    [entry.slug, searchCollection],
  );

  const isMultiple = useMemo(() => {
    return field.multiple ?? false;
  }, [field.multiple]);

  const [entries, setEntries] = useState<Entry[] | null>(null);
  const loading = useMemo(() => !entries, [entries]);

  const config = useAppSelector(selectConfig);

  useEffect(() => {
    if (!loading || !searchCollection || !config) {
      return;
    }

    const getOptions = async () => {
      const backend = currentBackend(config);

      const options = await backend.listAllEntries(searchCollection, config);
      setEntries(options);

      const hitOptions = parseHitOptions(options, field, locale, searchCollectionFields);

      const byValue = hitOptions.reduce(
        (acc, option) => {
          acc[option.value] = option;
          return acc;
        },
        {} as Record<string, HitOption>,
      );

      const newFilteredValue = Array.isArray(value)
        ? value.filter(v => v && String(v) in byValue)
        : String(value) in byValue
          ? [value]
          : [];

      const newInitialOptions = newFilteredValue.map(v => byValue[String(v)]);

      setInitialOptions(newInitialOptions);
    };

    getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCollection, config, loading, field, locale, searchCollectionFields]);

  const uniqueOptionsByValue = useMemo(
    () =>
      initialOptions.reduce(
        (acc, option) => {
          acc[option.value] = option;
          return acc;
        },
        {} as Record<string, HitOption>,
      ),
    [initialOptions],
  );

  const selectedValue = useMemo(() => {
    let selected = getSelectedValue(value, initialOptions, isMultiple);
    if (isMultiple && !selected) {
      selected = [];
    }
    return selected;
  }, [isMultiple, initialOptions, value]);

  return (
    <span>
      {Array.isArray(selectedValue) ? (
        <div className={classes.values}>
          {selectedValue.map(selectValue => {
            const option = uniqueOptionsByValue[String(selectValue)];
            return (
              <Pill key={String(selectValue)} noWrap>
                {option?.label ?? selectValue}
              </Pill>
            );
          })}
        </div>
      ) : selectedValue ? (
        uniqueOptionsByValue[String(selectedValue)].label ?? String(selectedValue)
      ) : (
        String(value)
      )}
    </span>
  );
};

export default RelationSummary;
