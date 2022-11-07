import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

import SearchModal from './SearchModal';

import type { SearchablePage } from '../../../interface';

const StyledSearchPlaceholderBox = styled(Button)(
  ({ theme }) => `
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    width: 244px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    padding: 0 12px;
    color: inherit;
    text-transform: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: inherit;
    }

    ${theme.breakpoints.down('lg')} {
      display: none;
    }
  `,
);

export interface SearchProps {
  searchablePages: SearchablePage[];
}

const Search = ({ searchablePages }: SearchProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <StyledSearchPlaceholderBox onClick={handleOpen}>
        <SearchIcon />
        <Typography
          variant="body2"
          color="inherit"
          sx={{
            fontFamily: "'Roboto',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            opacity: 0.8,
          }}
        >
          Search the docs
        </Typography>
      </StyledSearchPlaceholderBox>
      <SearchModal open={open} onClose={handleClose} searchablePages={searchablePages} />
    </>
  );
};

export default Search;
