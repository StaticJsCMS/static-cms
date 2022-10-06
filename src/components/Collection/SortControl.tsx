import React from 'react';
import { translate } from 'react-polyglot';

import { ControlButton } from './ControlButton';
import { SortDirection, TranslatedProps } from '../../interface';

import type { CmsField, Sort } from '../../interface';

function nextSortDirection(direction: SortDirection) {
  switch (direction) {
    case SortDirection.Ascending:
      return SortDirection.Descending;
    case SortDirection.Descending:
      return SortDirection.None;
    default:
      return SortDirection.Ascending;
  }
}

function sortIconProps(sortDir: SortDirection) {
  return {
    icon: 'chevron',
    iconDirection: sortIconDirections[sortDir],
    iconSmall: true,
  };
}

const sortIconDirections: Record<SortDirection, string> = {
  [SortDirection.Ascending]: 'up',
  [SortDirection.Descending]: 'down',
};

interface SortControlProps {
  fields: CmsField[];
  onSortClick: () => void;
  sort: Sort;
}

function SortControl({ t, fields, onSortClick, sort }: TranslatedProps<SortControlProps>) {
  const hasActiveSort = Object.values(sort).find(s => s.direction !== SortDirection.None);

  return (
    <Dropdown
      renderButton={() => {
        return (
          <ControlButton active={hasActiveSort} title={t('collection.collectionTop.sortBy')} />
        );
      }}
      closeOnSelection={false}
      dropdownTopOverlap="30px"
      dropdownWidth="160px"
      dropdownPosition="left"
    >
      {fields.map(field => {
        const sortDir = sort?.getIn([field.key, 'direction']);
        const isActive = sortDir && sortDir !== SortDirection.None;
        const nextSortDir = nextSortDirection(sortDir);
        return (
          <DropdownItem
            key={field.key}
            label={field.label}
            onClick={() => onSortClick(field.key, nextSortDir)}
            isActive={isActive}
            {...(isActive && sortIconProps(sortDir))}
          />
        );
      })}
    </Dropdown>
  );
}

export default translate()(SortControl);
