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
}

const Toolbar: FC<ToolbarProps> = ({ useMdx, collection, field }) => {
  const groups = [
    <BasicMarkToolbarButtons key="basic-mark-buttons" useMdx={useMdx} extended />,
    <BasicElementToolbarButtons key="basic-element-buttons" />,
    <ListToolbarButtons key="list-buttons" />,
    useMdx ? <ColorToolbarButtons key="color-buttons" /> : null,
    useMdx ? <AlignToolbarButtons key="align-mark-buttons" /> : null,
    !useMdx ? <ShortcodeToolbarButton key="shortcode-button" /> : null,
    <AddButtons key="add-buttons" collection={collection} field={field} />,
  ].filter(Boolean);

  return (
    <div
      className="
        flex
        flex-wrap
        relative
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
      "
    >
      {groups.map((group, index) => [
        index !== 0 ? <div key={`toolbar-divider-${index}`} /> : null,
        group,
      ])}
    </div>
  );
};

export default Toolbar;
