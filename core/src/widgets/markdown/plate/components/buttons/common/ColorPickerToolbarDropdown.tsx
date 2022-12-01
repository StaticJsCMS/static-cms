import { DEFAULT_COLORS, DEFAULT_CUSTOM_COLORS } from '@udecode/plate';
import {
  getMark,
  getPluginType,
  removeMark,
  setMarks,
  usePlateEditorRef,
} from '@udecode/plate-core';
import React, { useCallback, useEffect, useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { useMdPlateEditorState } from '@staticcms/markdown';
import ColorPicker from '../../color-picker/ColorPicker';
import ToolbarDropdown from './dropdown/ToolbarDropdown';

import type { ColorType } from '@udecode/plate';
import type { FC } from 'react';
import type { BaseEditor } from 'slate';
import type { ToolbarButtonProps } from './ToolbarButton';

export interface ColorPickerToolbarDropdownProps extends Omit<ToolbarButtonProps, 'onClick'> {
  pluginKey: string;
  colors?: ColorType[];
  customColors?: ColorType[];
  closeOnSelect?: boolean;
}

const ColorPickerToolbarDropdown: FC<ColorPickerToolbarDropdownProps> = ({
  pluginKey,
  colors = DEFAULT_COLORS,
  customColors = DEFAULT_CUSTOM_COLORS,
  closeOnSelect = true,
  ...controlProps
}) => {
  const [open, setOpen] = useState(false);
  const editor = useMdPlateEditorState();
  const editorRef = usePlateEditorRef();

  const type = getPluginType(editorRef, pluginKey);

  const color = editorRef && getMark(editorRef, type);

  const [selectedColor, setSelectedColor] = useState<string>();

  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const updateColor = useCallback(
    (value: string) => {
      if (editorRef && editor && editor.selection) {
        setSelectedColor(value);

        Transforms.select(editorRef as BaseEditor, editor.selection);
        ReactEditor.focus(editorRef as ReactEditor);

        setMarks(editor, { [type]: value });
      }
    },
    [editor, editorRef, type],
  );

  const updateColorAndClose = useCallback(
    (value: string) => {
      updateColor(value);
      closeOnSelect && onToggle();
    },
    [closeOnSelect, onToggle, updateColor],
  );

  const clearColor = useCallback(() => {
    if (editorRef && editor && editor.selection) {
      Transforms.select(editorRef as BaseEditor, editor.selection);
      ReactEditor.focus(editorRef as ReactEditor);

      if (selectedColor) {
        removeMark(editor, { key: type });
      }

      closeOnSelect && onToggle();
    }
  }, [closeOnSelect, editor, editorRef, onToggle, selectedColor, type]);

  useEffect(() => {
    if (editor?.selection) {
      setSelectedColor(color);
    }
  }, [color, editor?.selection]);

  return (
    <ToolbarDropdown active={Boolean(color)} activeColor={color} {...controlProps}>
      <ColorPicker
        color={selectedColor || color}
        colors={colors}
        customColors={customColors}
        updateColor={updateColorAndClose}
        updateCustomColor={updateColor}
        clearColor={clearColor}
        open={open}
      />
    </ToolbarDropdown>
  );
};

export default ColorPickerToolbarDropdown;
