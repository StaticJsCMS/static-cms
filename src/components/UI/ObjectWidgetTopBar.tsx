import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import React, { useCallback } from 'react';

import { transientOptions } from '../../lib';
import { colors, colorsRaw, transitions } from './styles';

import type { MouseEvent, ReactNode } from 'react';
import type { Field, TranslatedProps } from '../../interface';

const TopBarContainer = styled('div')`
  position: relative;
  align-items: center;
  background-color: ${colors.textFieldBorder};
  display: flex;
  justify-content: space-between;
  padding: 2px 8px;
`;

interface ExpandButtonContainerProps {
  $hasError: boolean;
}

const ExpandButtonContainer = styled(
  'div',
  transientOptions,
)<ExpandButtonContainerProps>(
  ({ $hasError }) => `
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.6);
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    ${$hasError ? `color: ${colorsRaw.red}` : ''}
  `,
);

export interface ObjectWidgetTopBarProps {
  allowAdd?: boolean;
  types?: Field[];
  onAdd?: (event: MouseEvent) => void;
  onAddType?: (name: string) => void;
  onCollapseToggle: (event: MouseEvent) => void;
  collapsed: boolean;
  heading: ReactNode;
  label?: string;
  hasError?: boolean;
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
  hasError = false,
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
    (types: Field[]) => {
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
            variant="outlined"
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
      <Button
        onClick={onAdd}
        endIcon={<AddIcon fontSize="small" />}
        size="small"
        variant="outlined"
      >
        {t('editor.editorWidgets.list.add', { item: label })}
      </Button>
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
      <ExpandButtonContainer $hasError={hasError}>
        <IconButton onClick={onCollapseToggle} data-testid="expand-button">
          <ExpandMoreIcon
            sx={{
              transform: `rotateZ(${collapsed ? '-90deg' : '0deg'})`,
              transition: `transform ${transitions.main};`,
              color: hasError ? colorsRaw.red : undefined,
            }}
          />
        </IconButton>
        {heading}
      </ExpandButtonContainer>
      {renderAddUI()}
    </TopBarContainer>
  );
};

export default ObjectWidgetTopBar;
