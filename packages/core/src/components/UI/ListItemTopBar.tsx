import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import React from 'react';

import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { MouseEvent, ReactNode } from 'react';

export interface DragHandleProps {
  listeners: SyntheticListenerMap | undefined;
}

const DragHandle = ({ listeners }: DragHandleProps) => {
  return (
    <span {...listeners}>
      <DragHandleIcon />
    </span>
  );
};

export interface ListItemTopBarProps {
  className?: string;
  title: ReactNode;
  collapsed?: boolean;
  onCollapseToggle?: (event: MouseEvent) => void;
  onRemove: (event: MouseEvent) => void;
  isVariableTypesList?: boolean;
  listeners: SyntheticListenerMap | undefined;
}

const ListItemTopBar = ({
  className,
  title,
  collapsed = false,
  onCollapseToggle,
  onRemove,
  // isVariableTypesList = false,
  listeners,
}: ListItemTopBarProps) => {
  return (
    <div className={className}>
      {/* TODO $collapsed={collapsed} $isVariableTypesList={isVariableTypesList} */}
      {onCollapseToggle ? (
        <IconButton onClick={onCollapseToggle} data-testid="expand-button">
          <ExpandMoreIcon
            sx={{
              transform: `rotateZ(${collapsed ? '-90deg' : '0deg'})`,
              // TODO transition: `transform ${transitions.main};`,
            }}
          />
        </IconButton>
      ) : null}
      <div key="title" onClick={onCollapseToggle} data-testid="list-item-title">
        {title}
      </div>
      {listeners ? <DragHandle listeners={listeners} /> : null}
      {onRemove ? (
        <div data-testid="remove-button" onClick={onRemove}>
          <CloseIcon />
        </div>
      ) : null}
    </div>
  );
};

export default ListItemTopBar;
