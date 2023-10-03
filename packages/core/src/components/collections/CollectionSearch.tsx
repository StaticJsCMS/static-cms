import { Popper as BasePopper } from '@mui/base/Popper';
import { Search as SearchIcon } from '@styled-icons/material/Search';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

import type { Collection, Collections } from '@staticcms/core/interface';
import type { ChangeEvent, FC, FocusEvent, KeyboardEvent, MouseEvent } from 'react';

import './CollectionSearch.css';

export const classes = generateClassNames('CollectionSearch', [
  'root',
  'content',
  'icon-wrapper',
  'icon',
  'input',
  'search-in',
  'search-in-content',
  'search-in-label',
  'search-in-option',
]);

interface CollectionSearchProps {
  collections: Collections;
  collection?: Collection;
  searchTerm: string | undefined;
  onSubmit: (query: string, collection?: string) => void;
}

const CollectionSearch: FC<CollectionSearchProps> = ({
  collections: collectionsMap,
  collection,
  searchTerm = '',
  onSubmit,
}) => {
  const t = useTranslate();

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>();
  const [query, setQuery] = useState(searchTerm);
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const open = Boolean(anchorEl);

  const collections = useMemo(() => Object.values(collectionsMap), [collectionsMap]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    inputRef.current?.blur();
  }, []);

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleBlur = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const getSelectedSelectionBasedOnProps = useCallback(() => {
    return collection ? collections.findIndex(c => c.name === collection.name) : -1;
  }, [collection, collections]);

  const [selectedCollectionIdx, setSelectedCollectionIdx] = useState(
    getSelectedSelectionBasedOnProps(),
  );
  const [prevCollection, setPrevCollection] = useState(collection);

  useEffect(() => {
    if (prevCollection !== collection) {
      setSelectedCollectionIdx(getSelectedSelectionBasedOnProps());
    }
    setPrevCollection(collection);
  }, [collection, getSelectedSelectionBasedOnProps, prevCollection]);

  const selectNextSuggestion = useCallback(() => {
    setSelectedCollectionIdx(Math.min(selectedCollectionIdx + 1, collections.length - 1));
  }, [collections, selectedCollectionIdx]);

  const selectPreviousSuggestion = useCallback(() => {
    setSelectedCollectionIdx(Math.max(selectedCollectionIdx - 1, -1));
  }, [selectedCollectionIdx]);

  const resetSelectedSuggestion = useCallback(() => {
    setSelectedCollectionIdx(-1);
  }, []);

  const submitSearch = useCallback(
    (index: number) => {
      if (index !== -1) {
        onSubmit(query, collections[index]?.name);
      } else {
        onSubmit(query);
      }
      handleClose();
    },
    [collections, handleClose, onSubmit, query],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        submitSearch(selectedCollectionIdx);
      }

      if (open) {
        // allow closing of suggestions with escape key
        if (event.key === 'Escape') {
          handleClose();
        }

        if (event.key === 'ArrowDown') {
          selectNextSuggestion();
          event.preventDefault();
        } else if (event.key === 'ArrowUp') {
          selectPreviousSuggestion();
          event.preventDefault();
        }
      }
    },
    [
      handleClose,
      open,
      selectNextSuggestion,
      selectPreviousSuggestion,
      selectedCollectionIdx,
      submitSearch,
    ],
  );

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newQuery = event.target.value;
      setQuery(newQuery);

      if (newQuery !== '') {
        setAnchorEl(event.currentTarget);
        return;
      }

      resetSelectedSuggestion();
      handleClose();
    },
    [handleClose, resetSelectedSuggestion],
  );

  const handleSuggestionClick = useCallback(
    (event: MouseEvent, idx: number) => {
      event.preventDefault();
      setSelectedCollectionIdx(idx);
      submitSearch(idx);
    },
    [submitSearch],
  );

  const handleClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes['icon-wrapper']}>
          <SearchIcon className={classes.icon} />
        </div>
        <input
          type="text"
          id="first_name"
          className={classes.input}
          placeholder={t('collection.sidebar.searchAll')}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={query}
          onChange={handleQueryChange}
          onClick={handleClick}
        />
      </div>
      <BasePopper
        open={open}
        placement="top"
        anchorEl={anchorEl}
        tabIndex={0}
        className={classes['search-in']}
        slots={{
          root: 'div',
        }}
      >
        <div key="edit-content" contentEditable={false} className={classes['search-in-content']}>
          <div className={classes['search-in-label']}>{t('collection.sidebar.searchIn')}</div>
          <div
            className={classes['search-in-option']}
            onClick={e => handleSuggestionClick(e, -1)}
            onMouseDown={e => e.preventDefault()}
          >
            {t('collection.sidebar.allCollections')}
          </div>
          {collections.map((collection, idx) => (
            <div
              key={idx}
              onClick={e => handleSuggestionClick(e, idx)}
              onMouseDown={e => e.preventDefault()}
              className={classes['search-in-option']}
            >
              {collection.label}
            </div>
          ))}
        </div>
      </BasePopper>
    </div>
  );
};

export default CollectionSearch;
