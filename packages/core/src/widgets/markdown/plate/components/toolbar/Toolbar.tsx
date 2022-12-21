import { styled } from '@mui/material/styles';
import React from 'react';

import AlignToolbarButtons from '../buttons/AlignToolbarButtons';
import BasicElementToolbarButtons from '../buttons/BasicElementToolbarButtons';
import BasicMarkToolbarButtons from '../buttons/BasicMarkToolbarButtons';
import ColorToolbarButtons from '../buttons/ColorToolbarButtons';
import ListToolbarButtons from '../buttons/ListToolbarButtons';
import MediaToolbarButton from '../buttons/MediaToolbarButtons';
import ShortcodeToolbarButton from '../buttons/ShortcodeToolbarButton';

import type { FC } from 'react';
import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';

const StyledToolbar = styled('div')(
  ({ theme }) => `
    display: flex;
    align-items: center;
    user-select: none;
    box-sizing: content-box;
    color: rgb(68,68,68);
    min-height: 40px;
    position: relative;
    flex-wrap: wrap;
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    padding: 12px;
    border-bottom: 2px solid #eee;
    gap:2px;
    background: ${theme.palette.background.paper};
  `,
);

const StyledDivider = styled('div')(
  ({ theme }) => `
    height: 18px;
    width: 1px;
    background: ${theme.palette.text.secondary};
    margin: 0 4px;
    opacity: 0.5;
  `,
);

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
    <StyledToolbar>
      {groups.map((group, index) => [
        index !== 0 ? <StyledDivider key={`toolbar-divider-${index}`} /> : null,
        group,
      ])}
    </StyledToolbar>
  );
};

export default Toolbar;
