import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useSearchScores } from '../../../util/search.util';
import { isNotEmpty } from '../../../util/string.util';
import SearchResult from './SearchResult';
import SuggestionLink from './SuggestionLink';

import type { ChangeEvent, FC } from 'react';
import type { SearchablePage } from '../../../interface';

const SEARCH_RESULTS_TO_SHOW = 5;

const StyledDialog = styled(Dialog)(
  ({ theme }) => `
    ${theme.breakpoints.between('md', 'lg')} {
      & .MuiDialog-paper {
        width: 60vw;
        height: 60vh;
        maxHeight: 600px;
      }
    }

    ${theme.breakpoints.up('lg')} {
      & .MuiDialog-paper {
        width: 600px;
        height: 600px;
      }
    }
  `,
);

const StyledDialogContent = styled(DialogContent)`
  padding: 0;
`;

const StyledTextField = styled(TextField)`
  height: 68px;

  & .MuiInputBase-root {
    padding: 16px;
  }

  & .MuiInputBase-root.MuiInput-root::after {
    border-bottom: unset;
  }

  & .MuiInput-root {
    font-size: 18px;
  }
`;

const StyledSuggestions = styled('div')`
  display: grid;
  gap: 48px;
  padding: 24px;
  grid-template-columns: repeat(2, minmax(0, 2fr));
  grid-template-rows: repeat(2, minmax(0, 2fr));
`;

const StyledSuggestionSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  searchablePages: SearchablePage[];
}

const SearchModal: FC<SearchModalProps> = ({ open, onClose, searchablePages }) => {
  const inputRef = useRef<HTMLInputElement>();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [canFocus, setCanFocus] = useState(true);
  const [search, setSearch] = useState('');

  const handleFocus = () => {
    if (canFocus && open && inputRef.current) {
      inputRef.current?.focus();
      setSearch('');
      setCanFocus(false);
    }
  };

  const handleClose = useCallback(() => {
    setCanFocus(true);
    onClose();
  }, [onClose]);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const searchResults = useSearchScores(search, searchablePages);

  const renderedResults = useMemo(
    () =>
      searchResults?.length > 0 ? (
        [...Array<unknown>(SEARCH_RESULTS_TO_SHOW)].map((_, index) => {
          if (searchResults.length <= index) {
            return;
          }

          const result = searchResults[index];
          const { entry } = result;
          let summary = entry.textContent;

          if (!result.isExactTitleMatch) {
            const match = new RegExp(
              `(?:[\\s]+[^\\s]+){0,10}[\\s]*${search}(?![^<>]*(([/"']|]]|\\b)>))[\\s]*(?:[^\\s]+\\s){0,25}`,
              'ig',
            ).exec(entry.textContent);
            if (match && match.length >= 1) {
              summary = `...${match[0].trim()}...`;
            } else {
              const match = new RegExp(
                `(?:[\\s]+[^\\s]+){0,10}[\\s]*(${search
                  .split(' ')
                  .join('|')})(?![^<>]*(([/"']|]]|\\b)>))[\\s]*(?:[^\\s]+\\s){0,25}`,
                'ig',
              ).exec(entry.textContent);
              if (match && match.length >= 1) {
                summary = `...${match[0].trim()}...`;
              }
            }
          }

          summary = summary?.replace(
            new RegExp(`(${search.split(' ').join('|')})(?![^<>]*(([/"']|]]|\\b)>))`, 'ig'),
            `<strong style="color: ${theme.palette.primary.main}">$1</strong>`,
          );

          return (
            <SearchResult
              key={`result-${entry.url}`}
              entry={entry}
              summary={summary}
              onClick={handleClose}
            />
          );
        })
      ) : isNotEmpty(search) ? (
        <Typography
          variant="h3"
          component="div"
          key="no-results"
          sx={{ width: '100%', textAlign: 'center', marginTop: '16px' }}
        >
          No results found
        </Typography>
      ) : (
        <StyledSuggestions>
          <StyledSuggestionSection>
            <Typography variant="h3" sx={{ marginBottom: '4px' }}>
              Getting Started
            </Typography>
            <SuggestionLink href="/docs/start-with-a-template">
              Start With a Template
            </SuggestionLink>
            <SuggestionLink href="/docs/add-to-your-site">Add to Your Site</SuggestionLink>
            <SuggestionLink href="/docs/configuration-options">
              Configuration Options
            </SuggestionLink>
            <SuggestionLink href="/docs/collection-overview">
              Collections
            </SuggestionLink>
          </StyledSuggestionSection>
          <StyledSuggestionSection>
            <Typography variant="h3" sx={{ marginBottom: '4px' }}>
              Backends
            </Typography>
            <SuggestionLink href="/docs/github-backend">GitHub</SuggestionLink>
            <SuggestionLink href="/docs/bitbucket-backend">Bitbucket</SuggestionLink>
            <SuggestionLink href="/docs/gitlab-backend">GitLab</SuggestionLink>
          </StyledSuggestionSection>
          <StyledSuggestionSection>
            <Typography variant="h3" sx={{ marginBottom: '4px' }}>
              Platform Guides
            </Typography>
            <SuggestionLink href="/docs/nextjs">Next</SuggestionLink>
            <SuggestionLink href="/docs/gatsby">Gatsby</SuggestionLink>
            <SuggestionLink href="/docs/jekyll">Jekyll</SuggestionLink>
            <SuggestionLink href="/docs/hugo">Hugo</SuggestionLink>
          </StyledSuggestionSection>
          <StyledSuggestionSection>
            <Typography variant="h3" sx={{ marginBottom: '4px' }}>
              Widgets
            </Typography>
            <SuggestionLink href="/docs/widget-string">String</SuggestionLink>
            <SuggestionLink href="/docs/widget-image">Image</SuggestionLink>
            <SuggestionLink href="/docs/widget-datetime">Datetime</SuggestionLink>
            <SuggestionLink href="/docs/widget-markdown">Markdown</SuggestionLink>
          </StyledSuggestionSection>
        </StyledSuggestions>
      ),
    [handleClose, search, searchResults, theme.palette.primary.main],
  );

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth
      onFocus={handleFocus}
    >
      <StyledDialogContent>
        <StyledTextField
          autoFocus
          id="search"
          placeholder="Search"
          fullWidth
          variant="standard"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            inputRef,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  sx={{ p: '0 6px', m: 0, width: 'auto', minWidth: 'unset' }}
                  onClick={onClose}
                >
                  ESC
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <div>{renderedResults}</div>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SearchModal;
