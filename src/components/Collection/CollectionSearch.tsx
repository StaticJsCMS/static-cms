import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect, useState } from 'react';
import { translate } from 'react-polyglot';

import { transientOptions } from '../../lib';
import { colors, colorsRaw, lengths, zIndex } from '../../ui';

import type { KeyboardEvent, MouseEvent } from 'react';
import type { Collection, Collections, TranslatedProps } from '../../interface';

const SearchContainer = styled.div`
  position: relative;
`;

const SuggestionsContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Suggestions = styled.ul`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  padding: 10px 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border-radius: ${lengths.borderRadius};
  border: 1px solid ${colors.textFieldBorder};
  z-index: ${zIndex.zIndex1};
`;

const SuggestionHeader = styled.li`
  padding: 0 6px 6px 32px;
  font-size: 12px;
  color: ${colors.text};
`;

interface SuggestionItemProps {
  $isActive: boolean;
}

const SuggestionItem = styled(
  'li',
  transientOptions,
)<SuggestionItemProps>(
  ({ $isActive }) => `
    color: ${$isActive ? colors.active : colorsRaw.grayDark};
    background-color: ${$isActive ? colors.activeBackground : 'inherit'};
    padding: 6px 6px 6px 32px;
    cursor: pointer;
    position: relative;

    &:hover {
      color: ${colors.active};
      background-color: ${colors.activeBackground};
    }
  `,
);

const SuggestionDivider = styled.div`
  width: 100%;
`;

interface CollectionSearchProps {
  collections: Collections;
  collection?: Collection;
  searchTerm: string;
  onSubmit: (query: string, collection?: string) => void;
}

const CollectionSearch = ({
  collections,
  collection,
  searchTerm,
  onSubmit,
  t,
}: TranslatedProps<CollectionSearchProps>) => {
  const [query, setQuery] = useState(searchTerm);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const getSelectedSelectionBasedOnProps = useCallback(() => {
    return collection ? Object.keys(collections).indexOf(collection.name) : -1;
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

  const toggleSuggestions = useCallback((visible: boolean) => {
    setSuggestionsVisible(visible);
  }, []);

  const selectNextSuggestion = useCallback(() => {
    setSelectedCollectionIdx(
      Math.min(selectedCollectionIdx + 1, Object.keys(collections).length - 1),
    );
  }, [collections, selectedCollectionIdx]);

  const selectPreviousSuggestion = useCallback(() => {
    setSelectedCollectionIdx(Math.max(selectedCollectionIdx - 1, -1));
  }, [selectedCollectionIdx]);

  const resetSelectedSuggestion = useCallback(() => {
    setSelectedCollectionIdx(-1);
  }, []);

  const submitSearch = useCallback(() => {
    toggleSuggestions(false);
    if (selectedCollectionIdx !== -1) {
      onSubmit(query, Object.values(collections)[selectedCollectionIdx]?.name);
    } else {
      onSubmit(query);
    }
  }, [collections, onSubmit, query, selectedCollectionIdx, toggleSuggestions]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        submitSearch();
      }

      if (suggestionsVisible) {
        // allow closing of suggestions with escape key
        if (event.key === 'Escape') {
          toggleSuggestions(false);
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
      selectNextSuggestion,
      selectPreviousSuggestion,
      submitSearch,
      suggestionsVisible,
      toggleSuggestions,
    ],
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      toggleSuggestions(newQuery !== '');
      if (newQuery === '') {
        resetSelectedSuggestion();
      }
    },
    [resetSelectedSuggestion, toggleSuggestions],
  );

  const handleSuggestionClick = useCallback(
    (event: MouseEvent, idx: number) => {
      setSelectedCollectionIdx(idx);
      submitSearch();
      event.preventDefault();
    },
    [submitSearch],
  );

  return (
    <SearchContainer>
      <TextField
        onKeyDown={handleKeyDown}
        onClick={() => toggleSuggestions(true)}
        placeholder={t('collection.sidebar.searchAll')}
        onBlur={() => toggleSuggestions(false)}
        onFocus={() => toggleSuggestions(query !== '')}
        value={query}
        onChange={e => handleQueryChange(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {suggestionsVisible && (
        <SuggestionsContainer>
          <Suggestions>
            <SuggestionHeader>{t('collection.sidebar.searchIn')}</SuggestionHeader>
            <SuggestionItem
              $isActive={selectedCollectionIdx === -1}
              onClick={e => handleSuggestionClick(e, -1)}
              onMouseDown={e => e.preventDefault()}
            >
              {t('collection.sidebar.allCollections')}
            </SuggestionItem>
            <SuggestionDivider />
            {Object.values(collections).map((collection, idx) => (
              <SuggestionItem
                key={idx}
                $isActive={idx === selectedCollectionIdx}
                onClick={e => handleSuggestionClick(e, idx)}
                onMouseDown={e => e.preventDefault()}
              >
                {collection.label}
              </SuggestionItem>
            ))}
          </Suggestions>
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
};

export default translate()(CollectionSearch);
