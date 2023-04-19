import React from 'react';

import AddButtons from '../buttons/AddButtons';
import AlignToolbarButtons from '../buttons/AlignToolbarButtons';
import BasicElementToolbarButtons from '../buttons/BasicElementToolbarButtons';
import BasicMarkToolbarButtons from '../buttons/BasicMarkToolbarButtons';
import ColorToolbarButtons from '../buttons/ColorToolbarButtons';
import ListToolbarButtons from '../buttons/ListToolbarButtons';
import ShortcodeToolbarButton from '../buttons/ShortcodeToolbarButton';

import type { Collection, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface ToolbarProps {
  useMdx: boolean;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  disabled: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ useMdx, collection, field, disabled }) => {
  const groups = [
    <BasicMarkToolbarButtons
      key="basic-mark-buttons"
      useMdx={useMdx}
      extended
      disabled={disabled}
    />,
    <BasicElementToolbarButtons key="basic-element-buttons" disabled={disabled} />,
    <ListToolbarButtons key="list-buttons" disabled={disabled} />,
    useMdx ? <ColorToolbarButtons key="color-buttons" disabled={disabled} /> : null,
    useMdx ? <AlignToolbarButtons key="align-mark-buttons" disabled={disabled} /> : null,
    !useMdx ? <ShortcodeToolbarButton key="shortcode-button" disabled={disabled} /> : null,
    <AddButtons key="add-buttons" collection={collection} field={field} disabled={disabled} />,
  ].filter(Boolean);

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        select-none
        min-h-markdown-toolbar
        -mx-3
        -my-5
        px-2
        pt-2
        pb-1.5
        mb-1.5
        border-bottom-2
        border-gray-400
        gap-0.5
        shadow-md
        bg-slate-50
        dark:bg-slate-900
        sticky
        top-0
        z-10
      "
    >
      {groups}
    </div>
  );
};

export default Toolbar;
