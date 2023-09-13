import { Option } from '@mui/base/Option';
import { Select } from '@mui/base/Select';
import { UnfoldMore as UnfoldMoreIcon } from '@styled-icons/material/UnfoldMore';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  someNode,
  toggleNodeType,
} from '@udecode/plate';
import React, { useCallback, useMemo, useState } from 'react';

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { useMdPlateEditorState } from '@staticcms/markdown/plate/plateTypes';

import type { SelectRootSlotProps } from '@mui/base/Select';
import type { FC, FocusEvent, KeyboardEvent, MouseEvent } from 'react';

import './FontTypeSelect.css';

const classes = generateClassNames('WidgetMarkdown_FontTypeSelect', [
  'root',
  'disabled',
  'select',
  'popper',
  'option',
  'option-selected',
  'option-label',
  'more-button',
  'more-button-icon',
]);

type Option = {
  value: string;
  label: string;
};

const types: Option[] = [
  {
    value: ELEMENT_H1,
    label: 'Heading 1',
  },
  {
    value: ELEMENT_H2,
    label: 'Heading 2',
  },
  {
    value: ELEMENT_H3,
    label: 'Heading 3',
  },
  {
    value: ELEMENT_H4,
    label: 'Heading 4',
  },
  {
    value: ELEMENT_H5,
    label: 'Heading 5',
  },
  {
    value: ELEMENT_H6,
    label: 'Heading 6',
  },
  {
    value: ELEMENT_PARAGRAPH,
    label: 'Paragraph',
  },
];

const Button = React.forwardRef(function Button<TValue extends {}, Multiple extends boolean>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState: _, children, ...other } = props;
  return (
    <button type="button" {...other} ref={ref} className={classes['more-button']}>
      {children}
      <UnfoldMoreIcon className={classes['more-button-icon']} />
    </button>
  );
});

export interface FontTypeSelectProps {
  disabled?: boolean;
}

/**
 * Toolbar button to toggle the type of elements in selection.
 */
const FontTypeSelect: FC<FontTypeSelectProps> = ({ disabled = false }) => {
  const editor = useMdPlateEditorState();
  const [version, setVersion] = useState(0);

  const selection = useDebounce(editor?.selection, 100);

  const value = useMemo(() => {
    return (
      selection &&
      types.find(type => someNode(editor, { match: { type: type.value }, at: selection?.anchor }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, selection, version]);

  const handleChange = useCallback(
    (_event: KeyboardEvent | FocusEvent | MouseEvent | null, newValue: string | null) => {
      if (!newValue || value?.value === newValue) {
        return;
      }

      toggleNodeType(editor, {
        activeType: newValue,
      });

      setVersion(oldVersion => oldVersion + 1);
    },
    [editor, value?.value],
  );

  return (
    <div className={classNames(classes.root, disabled && classes.disabled)}>
      <Select
        value={value?.value ?? ELEMENT_PARAGRAPH}
        onChange={handleChange}
        disabled={disabled}
        slots={{
          root: Button,
        }}
        slotProps={{
          root: {
            className: classes.select,
          },
          popper: {
            disablePortal: false,
            className: classNames(classes.popper, 'CMS_Scrollbar_root', 'CMS_Scrollbar_secondary'),
          },
        }}
        data-testid="font-type-select"
      >
        {types.map(type => {
          const selected = (value?.value ?? ELEMENT_PARAGRAPH) === type.value;

          return (
            <Option
              key={type.value}
              value={type.value}
              slotProps={{
                root: {
                  className: classNames(classes.option, selected && classes['option-selected']),
                },
              }}
            >
              <span className={classes['option-label']}>{type.label}</span>
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default FontTypeSelect;
