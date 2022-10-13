import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import find from 'lodash/find';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { QUERY_SUCCESS } from '../../actions/search';
import { stringTemplate } from '../../lib/widgets';

import type { ListChildComponentProps } from 'react-window';
import type { CmsFieldRelation, CmsWidgetControlProps, Entry, EntryData } from '../../interface';

// TODO Remove if sorting not needed
// function arrayMove(array, from, to) {
//   const slicedArray = array.slice();
//   slicedArray.splice(to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0]);
//   return slicedArray;
// }

function Option({ index, style, data }: ListChildComponentProps<{ options: React.ReactNode[] }>) {
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

const RelationControl = ({
  value,
  field,
  onChange,
  onBlur,
  queryHits,
  query,
  locale,
}: CmsWidgetControlProps<string | string[], CmsFieldRelation>) => {
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
      const templateVars = stringTemplate.extractTemplateVars(field);
      // return non template fields as is
      if (templateVars.length <= 0) {
        return get(hitData, field) as string;
      }
      const data = stringTemplate.addFileTemplateFields(hit.path, hitData);
      const value = stringTemplate.compileStringTemplate(field, null, hit.slug, data);
      return value;
    },
    [locale],
  );

  const parseHitOptions = useCallback(
    (hits: Entry[]) => {
      const valueField = field.value_field;
      const displayField = field.display_fields || [field.value_field];
      const options = hits.reduce((acc, hit) => {
        const valuesPaths = stringTemplate.expandPath({ data: hit.data, path: valueField });
        for (let i = 0; i < valuesPaths.length; i++) {
          const label = displayField
            .map(key => {
              const displayPaths = stringTemplate.expandPath({ data: hit.data, path: key });
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

  useEffect(() => {
    let alive = true;

    const initialSearch = async () => {
      // if the field has a previous value perform an initial search based on the value field
      // this is required since each search is limited by optionsLength so the selected value
      // might not show up on the search
      const collection = field.collection;
      const file = field.file;
      const initialSearchValues: string[] = value
        ? typeof value !== 'string'
          ? getSelectedOptions(value) ?? []
          : [value]
        : [];
      if (initialSearchValues && initialSearchValues.length > 0) {
        const searchFieldsArray = field.search_fields;
        const response = await query('', collection, searchFieldsArray, '', file); // TODO Fix this query(forID, collection, searchFieldsArray, '', file)

        if (alive) {
          const hits = response?.type === QUERY_SUCCESS ? response.payload.hits : [];
          const options = parseHitOptions(hits);
          const initialOptions = initialSearchValues
            .map(v => {
              const selectedOption = options.find(o => o.value === v);
              return selectedOption;
            })
            .filter(Boolean) as HitOption[];

          setInitialOptions(initialOptions);
        }
      }
    };

    initialSearch();

    return () => {
      alive = false;
    };
  }, [
    field.collection,
    field.file,
    field.name,
    field.search_fields,
    onChange,
    parseHitOptions,
    query,
    value,
  ]);

  // TODO Do we need sorting?
  // const onSortEnd =
  //   options =>
  //   ({ oldIndex, newIndex }) => {
  //     const { onChange, field } = this.props;
  //     const value = options.map(optionToString);
  //     const newValue = arrayMove(value, oldIndex, newIndex);
  //     const metadata =
  //       (!isEmpty(options) && {
  //         [field.name]: {
  //           [field.collection]: {
  //             [last(newValue)]: last(options).data,
  //           },
  //         },
  //       }) ||
  //       {};
  //     onChange(fromJS(newValue), metadata);
  //   };

  const handleChange = useCallback(
    (selectedOption: HitOption | HitOption[] | null) => {
      if (Array.isArray(selectedOption)) {
        const options = selectedOption;
        setInitialOptions(options.filter(Boolean));
        const value = options.map(optionToString);
        onChange(value);
      } else {
        setInitialOptions([selectedOption].filter(Boolean) as HitOption[]);
        const value = optionToString(selectedOption);
        onChange(value);
      }
    },
    [onChange],
  );

  const [options, setOptions] = useState<HitOption[]>([]);
  const [open, setOpen] = React.useState(false);
  const loading = useMemo(() => open && options.length === 0, [open, options.length]);

  React.useEffect(() => {
    let alive = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const collection = field.collection;
      const optionsLength = field.options_length || 20;
      const searchFieldsArray = field.search_fields;
      const file = field.file;

      const response = await query('', collection, searchFieldsArray, '', file, optionsLength); // TODO Fix this query(forID, collection, searchFieldsArray, '', file, optionsLength)
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
  }, [
    field.collection,
    field.file,
    field.options_length,
    field.search_fields,
    initialOptions,
    loading,
    parseHitOptions,
    query,
  ]);

  // TODO Remove? const isClearable = !(field.required ?? true) || isMultiple;

  const queryOptions = parseHitOptions(queryHits);
  const uniqueOptions = uniqOptions(initialOptions, queryOptions);
  const selectedValue = getSelectedValue(value, options, isMultiple);

  return (
    <Autocomplete
      disablePortal
      options={uniqueOptions}
      sx={{ width: 300 }}
      renderInput={params => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      value={selectedValue}
      onChange={(_event, newValue) => handleChange(newValue)}
      multiple={isMultiple}
      onBlur={onBlur}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
    />
  );

  // TODO Remove after testing
  // return (
  //   <SortableSelect
  //     useDragHandle
  //     // react-sortable-hoc props:
  //     axis="xy"
  //     onSortEnd={this.onSortEnd(selectedValue)}
  //     distance={4}
  //     // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
  //     getHelperDimensions={({ node }) => node.getBoundingClientRect()}
  //     // react-select props:
  //     components={{ MenuList, MultiValue, MultiValueLabel }}
  //     value={selectedValue}
  //     cacheOptions
  //     defaultOptions
  //     loadOptions={this.loadOptions}
  //     onChange={this.handleChange}
  //     onFocus={setActiveStyle}
  //     onBlur={setInactiveStyle}
  //     styles={reactSelectStyles}
  //     isMulti={isMultiple}
  //     isClearable={isClearable}
  //     placeholder=""
  //   />
  // );
};

export default RelationControl;
