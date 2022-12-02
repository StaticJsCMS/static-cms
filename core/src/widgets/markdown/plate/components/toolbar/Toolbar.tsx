import { styled } from '@mui/material/styles';
import React from 'react';

import AlignToolbarButtons from '../buttons/AlignToolbarButtons';
import BasicElementToolbarButtons from '../buttons/BasicElementToolbarButtons';
import BasicMarkToolbarButtons from '../buttons/BasicMarkToolbarButtons';
import ColorToolbarButtons from '../buttons/ColorToolbarButtons';
import ListToolbarButtons from '../buttons/ListToolbarButtons';
import MediaToolbarButton from '../buttons/MediaToolbarButtons';

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
  containerRef: HTMLElement | null;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  entry: Entry;
}

const Toolbar: FC<ToolbarProps> = ({ containerRef, collection, field, entry }) => {
  return (
    <StyledToolbar>
      <BasicMarkToolbarButtons key="basic-mark-buttons" extended />
      <StyledDivider />
      <BasicElementToolbarButtons key="basic-element-buttons" />
      <StyledDivider />
      <ListToolbarButtons key="list-buttons" />
      <StyledDivider />
      <ColorToolbarButtons key="color-buttons" />
      <StyledDivider />
      <AlignToolbarButtons key="align-mark-buttons" />
      <StyledDivider />
      <MediaToolbarButton
        key="media-buttons"
        containerRef={containerRef}
        collection={collection}
        field={field}
        entry={entry}
      />
    </StyledToolbar>
  );
};

export default Toolbar;
