import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

import { transientOptions } from '../../lib/util';
import { buttons, colors, lengths, transitions } from './styles';

import type { ComponentClass, MouseEvent, ReactNode } from 'react';

interface TopBarProps {
  $isVariableTypesList: boolean;
  $collapsed: boolean;
}

const TopBar = styled(
  'div',
  transientOptions,
)<TopBarProps>(
  ({ $isVariableTypesList, $collapsed }) => `
    display: flex;
    justify-content: space-between;
    height: 32px!important;
    border-radius: ${
      !$isVariableTypesList
        ? $collapsed
          ? lengths.borderRadius
          : `${lengths.borderRadius} ${lengths.borderRadius} 0 0`
        : $collapsed
        ? `0 ${lengths.borderRadius} ${lengths.borderRadius} ${lengths.borderRadius}`
        : `0 ${lengths.borderRadius} 0 0`
    }!important;
    position: relative;
  `,
);

const TopBarButton = styled.button`
  ${buttons.button};
  color: ${colors.controlLabel};
  background: transparent;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  width: 32px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledTitle = styled.div`
  position: absolute;
  left: 36px;
  line-height: 30px;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
`;

const TopBarButtonSpan = TopBarButton.withComponent('span');

const DragIconContainer = styled(TopBarButtonSpan)`
  width: 100%;
  cursor: move;
`;

export interface DragHandleProps {
  dragHandleHOC: (render: () => ReactNode) => ComponentClass;
}

const DragHandle = ({ dragHandleHOC }: DragHandleProps) => {
  const Handle = dragHandleHOC(() => (
    <DragIconContainer>
      <DragHandleIcon />
    </DragIconContainer>
  ));
  return <Handle />;
};

export interface ListItemTopBarProps {
  className?: string;
  title?: ReactNode;
  collapsed?: boolean;
  onCollapseToggle?: (event: MouseEvent) => void;
  onRemove: (event: MouseEvent) => void;
  dragHandleHOC: (render: () => ReactNode) => ComponentClass;
  isVariableTypesList?: boolean;
}

const ListItemTopBar = ({
  className,
  title,
  collapsed = false,
  onCollapseToggle,
  onRemove,
  dragHandleHOC,
  isVariableTypesList = false,
}: ListItemTopBarProps) => {
  return (
    <TopBar className={className} $collapsed={collapsed} $isVariableTypesList={isVariableTypesList}>
      {onCollapseToggle ? (
        <TopBarButton onClick={onCollapseToggle}>
          <ExpandMoreIcon
            sx={{
              transform: `rotateX(${collapsed ? '-90deg' : '0deg'})`,
              transition: `transform ${transitions.main};`,
            }}
          />
        </TopBarButton>
      ) : null}
      {title ? <StyledTitle onClick={onCollapseToggle}>{title}</StyledTitle> : null}
      {dragHandleHOC ? <DragHandle dragHandleHOC={dragHandleHOC} /> : null}
      {onRemove ? (
        <TopBarButton onClick={onRemove}>
          <CloseIcon />
        </TopBarButton>
      ) : null}
    </TopBar>
  );
};

const StyledListItemTopBar = styled(ListItemTopBar)`
  display: flex;
  justify-content: space-between;
  height: 26px;
  border-radius: ${lengths.borderRadius} ${lengths.borderRadius} 0 0;
  position: relative;
  border-top-left-radius: 0;
`;

export default StyledListItemTopBar;
