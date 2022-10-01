import React, { ReactNode, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Icon from './Icon';
import { colors, buttons } from './styles';
import Dropdown, { StyledDropdownButton, DropdownItem } from './Dropdown';
import { TranslatedProps } from '../interface';
import { List } from 'immutable';

const TopBarContainer = styled.div`
  align-items: center;
  background-color: ${colors.textFieldBorder};
  display: flex;
  justify-content: space-between;
  margin: 0 -14px;
  padding: 6px 13px;
`;

const ExpandButtonContainer = styled.div`
  ${props =>
    props.hasHeading &&
    css`
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
    `};
`;

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
  ${buttons.widget}
  padding: 4px 12px;

  ${Icon} {
    margin-left: 6px;
  }
`;

interface ObjectWidgetTopBarProps {
  allowAdd: boolean;
  types: List<Map<string, any>>;
  onAdd: () => void;
  onAddType: (name: string) => void;
  onCollapseToggle: () => void;
  collapsed: boolean;
  heading: ReactNode;
  label: string;
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
  t
}: TranslatedProps<ObjectWidgetTopBarProps>) => {
  const renderTypesDropdown = useCallback((types: List<Map<string, any>>) => {
    return (
      <Dropdown
        renderButton={() => (
          <StyledDropdownButton>
            {t('editor.editorWidgets.list.addType', { item: this.props.label })}
          </StyledDropdownButton>
        )}
      >
        {types.toJS().map((type: Record<string, any>, idx: number) => (
          <DropdownItem
            key={idx}
            label={type.get('label', type.name)}
            onClick={() => onAddType(type.name)}
          />
        ))}
      </Dropdown>
    );
  }, [t, onAddType]);

  const renderAddUI = useCallback(() => {
    if (!allowAdd) {
      return null;
    }
    if (types && types.size > 0) {
      return renderTypesDropdown(types);
    } else {
      return renderAddButton();
    }
  }, [allowAdd, types, renderTypesDropdown, renderAddButton])

  renderAddButton() {
    return (
      <AddButton onClick={this.props.onAdd}>
        {this.props.t('editor.editorWidgets.list.add', { item: this.props.label })}
        <Icon type="add" size="xsmall" />
      </AddButton>
    );
  }


    return (
      <TopBarContainer>
        <ExpandButtonContainer hasHeading={!!heading}>
          <ExpandButton onClick={onCollapseToggle} data-testid="expand-button">
            <Icon type="chevron" direction={collapsed ? 'right' : 'down'} size="small" />
          </ExpandButton>
          {heading}
        </ExpandButtonContainer>
        {this.renderAddUI()}
      </TopBarContainer>
    );
}

export default ObjectWidgetTopBar;
