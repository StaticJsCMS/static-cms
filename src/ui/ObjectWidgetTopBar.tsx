import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback } from 'react';

import { transientOptions } from '../lib';
import Icon from './Icon';
import { buttons, colors } from './styles';

import type { ReactNode } from 'react';
import type { CmsField, TranslatedProps } from '../interface';

const TopBarContainer = styled.div`
  align-items: center;
  background-color: ${colors.textFieldBorder};
  display: flex;
  justify-content: space-between;
  margin: 0 -14px;
  padding: 6px 13px;
`;

interface ExpandButtonContainerProps {
  $hasHeading: boolean;
}

const ExpandButtonContainer = styled(
  'div',
  transientOptions,
)<ExpandButtonContainerProps>(
  ({ $hasHeading }) => `
    ${
      $hasHeading
        ? `
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
        `
        : ''
    }
  `,
);

const ExpandButton = styled.button`
  ${buttons.button};
  padding: 4px;
  background-color: transparent;
  color: inherit;

  &:last-of-type {
    margin-right: 4px;
  }
`;

const AddButton = styled.button`
  ${buttons.button}
  padding: 4px 12px;

  ${Icon} {
    margin-left: 6px;
  }
`;

export interface ObjectWidgetTopBarProps {
  allowAdd?: boolean;
  types?: CmsField[];
  onAdd?: () => void;
  onAddType?: (name: string) => void;
  onCollapseToggle: () => void;
  collapsed: boolean;
  heading: ReactNode;
  label?: string;
}

const ObjectWidgetTopBar = ({
  allowAdd,
  types,
  onAdd,
  onAddType,
  onCollapseToggle,
  collapsed,
  heading,
  label,
  t,
}: TranslatedProps<ObjectWidgetTopBarProps>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const renderTypesDropdown = useCallback(
    (types: CmsField[]) => {
      if (!onAddType) {
        return null;
      }

      return (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {t('editor.editorWidgets.list.addType', { item: label })}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {types.map((type, idx) =>
              type ? (
                <MenuItem key={idx} onClick={() => onAddType(type.name)}>
                  {type.label ?? type.name}
                </MenuItem>
              ) : null,
            )}
          </Menu>
        </div>
      );
    },
    [open, handleClick, t, label, anchorEl, handleClose, onAddType],
  );

  const renderAddButton = useCallback(() => {
    return (
      <AddButton onClick={onAdd}>
        {t('editor.editorWidgets.list.add', { item: label })}
        <Icon type="add" size="xsmall" />
      </AddButton>
    );
  }, [t, label, onAdd]);

  const renderAddUI = useCallback(() => {
    if (!allowAdd) {
      return null;
    }
    if (types && types.length > 0) {
      return renderTypesDropdown(types);
    } else {
      return renderAddButton();
    }
  }, [allowAdd, types, renderTypesDropdown, renderAddButton]);

  return (
    <TopBarContainer>
      <ExpandButtonContainer $hasHeading={!!heading}>
        <ExpandButton onClick={onCollapseToggle} data-testid="expand-button">
          <Icon type="chevron" direction={collapsed ? 'right' : 'down'} size="small" />
        </ExpandButton>
        {heading}
      </ExpandButtonContainer>
      {renderAddUI()}
    </TopBarContainer>
  );
};

export default ObjectWidgetTopBar;
