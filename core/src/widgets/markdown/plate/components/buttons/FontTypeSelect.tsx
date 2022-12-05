import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  focusEditor,
} from '@udecode/plate';
import { someNode, toggleNodeType } from '@udecode/plate-core';
import React, { useCallback, useMemo, useState } from 'react';

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import { useMdPlateEditorState } from '@staticcms/markdown';

import type { SelectChangeEvent } from '@mui/material/Select';
import type { FC } from 'react';

const StyledSelect = styled(Select<string>)`
  padding: 0;

  & .MuiSelect-select {
    padding: 4px 7px;
  }
`;

const types = [
  {
    type: ELEMENT_H1,
    label: 'Heading 1',
  },
  {
    type: ELEMENT_H2,
    label: 'Heading 2',
  },
  {
    type: ELEMENT_H3,
    label: 'Heading 3',
  },
  {
    type: ELEMENT_H4,
    label: 'Heading 4',
  },
  {
    type: ELEMENT_H5,
    label: 'Heading 5',
  },
  {
    type: ELEMENT_H6,
    label: 'Heading 6',
  },
  {
    type: ELEMENT_PARAGRAPH,
    label: 'Paragraph',
  },
];

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
      types.find(type => someNode(editor, { match: { type: type.type }, at: selection?.anchor }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, selection, version]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      event.preventDefault();

      if (value?.type === event.target.value) {
        return;
      }

      toggleNodeType(editor, {
        activeType: event.target.value,
      });

      setVersion(oldVersion => oldVersion + 1);

      setTimeout(() => {
        focusEditor(editor);
      });
    },
    [editor, value?.type],
  );

  return (
    <FormControl sx={{ width: 120 }}>
      <StyledSelect
        labelId="font-type-select-label"
        id="font-type-select"
        value={value?.type ?? ELEMENT_PARAGRAPH}
        onChange={handleChange}
        size="small"
        disabled={disabled}
      >
        {types.map(type => (
          <MenuItem key={type.type} value={type.type}>
            {type.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default FontTypeSelect;
