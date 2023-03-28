import PopperUnstyled from '@mui/base/PopperUnstyled';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Search as SearchIcon } from '@styled-icons/material/Search';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { translate } from 'react-polyglot';

import type { Collection, Collections, TranslatedProps } from '@staticcms/core/interface';
import type { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react';

interface CollectionSearchProps {
  collections: Collections;
  collection?: Collection;
  searchTerm: string;
  onSubmit: (query: string, collection?: string) => void;
}

const CollectionSearch = ({
  collections: collectionsMap,
  collection,
  searchTerm,
  onSubmit,
  t,
}: TranslatedProps<CollectionSearchProps>) => {
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

  return (
    <div>
      <TextField
        onKeyDown={handleKeyDown}
        placeholder={t('collection.sidebar.searchAll')}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={query}
        onChange={handleQueryChange}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          inputRef,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="w-6 h-6" />
            </InputAdornment>
          ),
        }}
      />
      <PopperUnstyled
        open={open}
        component="div"
        placement="top"
        anchorEl={anchorEl}
        tabIndex={0}
        className="
          absolute
          overflow-auto
          rounded-md
          bg-white
          text-base
          shadow-lg
          ring-1
          ring-black
          ring-opacity-5
          focus:outline-none
          sm:text-sm
          z-40
          dark:bg-slate-700
        "
      >
        <div
          key="edit-content"
          contentEditable={false}
          className="
            flex
            flex-col
            min-w-[200px]
          "
        >
          <div
            className="
              text-md
              text-slate-500
              dark:text-slate-400
              py-2
              px-3
            "
          >
            {t('collection.sidebar.searchIn')}
          </div>
          <div
            className="
              cursor-pointer
              hover:bg-blue-500
              hover:color-gray-100
              py-2
              px-3
            "
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
              className="
                cursor-pointer
                hover:bg-blue-500
                hover:color-gray-100
                py-2
                px-3
              "
            >
              {collection.label}
            </div>
          ))}
        </div>
      </PopperUnstyled>
      {/* <Popover
        id="search-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
        disableScrollLock
        hideBackdrop
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          width: 300
        }}
      >
        <div>
          <div>{t('collection.sidebar.searchIn')}</div>
          <div onClick={e => handleSuggestionClick(e, -1)} onMouseDown={e => e.preventDefault()}>
            {t('collection.sidebar.allCollections')}
          </div>
          {collections.map((collection, idx) => (
            <div
              key={idx}
              onClick={e => handleSuggestionClick(e, idx)}
              onMouseDown={e => e.preventDefault()}
            >
              {collection.label}
            </div>
          ))}
        </div>
      </Popover> */}
    </div>
  );
};

export default translate()(CollectionSearch);
