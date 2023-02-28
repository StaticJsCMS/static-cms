import React from 'react';

import AlignToolbarButtons from '../buttons/AlignToolbarButtons';
import BasicElementToolbarButtons from '../buttons/BasicElementToolbarButtons';
import BasicMarkToolbarButtons from '../buttons/BasicMarkToolbarButtons';
import ColorToolbarButtons from '../buttons/ColorToolbarButtons';
import ListToolbarButtons from '../buttons/ListToolbarButtons';
import MediaToolbarButton from '../buttons/MediaToolbarButtons';
import ShortcodeToolbarButton from '../buttons/ShortcodeToolbarButton';

import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface ToolbarProps {
  useMdx: boolean;
  containerRef: HTMLElement | null;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  entry: Entry;
}

const Toolbar: FC<ToolbarProps> = ({ useMdx, containerRef, collection, field, entry }) => {
  const groups = [
    <BasicMarkToolbarButtons key="basic-mark-buttons" useMdx={useMdx} extended />,
    <BasicElementToolbarButtons key="basic-element-buttons" />,
    <ListToolbarButtons key="list-buttons" />,
    useMdx ? <ColorToolbarButtons key="color-buttons" /> : null,
    useMdx ? <AlignToolbarButtons key="align-mark-buttons" /> : null,
    <MediaToolbarButton
      key="media-buttons"
      containerRef={containerRef}
      collection={collection}
      field={field}
      entry={entry}
    />,
    !useMdx ? <ShortcodeToolbarButton key="shortcode-button" /> : null,
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
        -m-5
        mb-0
        p-2
        border-bottom-2
        border-gray-400
        gap-0.5
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
