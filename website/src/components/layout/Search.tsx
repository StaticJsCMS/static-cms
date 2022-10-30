import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const StyledSearchBox = styled(TextField)(
  ({ theme }) => `
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;

    .MuiSvgIcon-root {
      color: rgba(255, 255, 255, 0.8);
    }

    .MuiInputBase-root {
      color: white;
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }

    ${theme.breakpoints.down('lg')} {
      display: none;
    }
  `,
);

const Search = () => {
  return (
    <StyledSearchBox
      placeholder="Search the docs"
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: <SearchIcon />,
      }}
    />
  );
};

export default Search;
