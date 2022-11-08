import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';

import type { SearchablePage } from '../../../interface';

const StyledSearchResultBody = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  overflow: hidden;
`;

const StyledSearchResultTitleWrapper = styled('div')`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const StyledSearchResultTitle = styled('h3')(
  ({ theme }) => `
    margin: 0;
    font-size: 18px;
    line-height: 22px;
    color: ${theme.palette.primary.main};
  `,
);

const StyledSearchResultContent = styled('div')(
  ({ theme }) => `
    margin: 0;
    font-size: 16px;
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: ${theme.palette.text.secondary};

    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 4px;
    }
  `,
);

interface SearchResultProps {
  entry: SearchablePage;
  summary: string;
  onClick: () => void;
}

const SearchResult = ({ entry: { url, title }, summary, onClick }: SearchResultProps) => {
  const theme = useTheme();

  // const Icon = useMemo(() => {
  //   switch (type) {
  //     case NEWS:
  //       return ArticleIcon;
  //     case BULLETIN:
  //       return NewspaperIcon;
  //     default:
  //       return WebIcon;
  //   }
  // }, [type]);

  return (
    <Link href={url}>
      <Button
        href={url}
        key={`result-${url}`}
        onClick={onClick}
        // startIcon={<Icon fontSize="large" />}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          textAlign: 'left',
          width: '100%',
          color: theme.palette.text.secondary,
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
          textTransform: 'unset',
          gap: '8px',
          padding: '16px',
          boxSize: 'border-box',
          borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
          '&:hover': {
            color: theme.palette.text.primary,
          },
          '.MuiButton-startIcon': {
            marginLeft: 0,
            '*:nth-of-type(1)': {
              fontSize: '24px',
            },
          },
        }}
      >
        <StyledSearchResultBody>
          <StyledSearchResultTitleWrapper>
            <StyledSearchResultTitle>{title}</StyledSearchResultTitle>
          </StyledSearchResultTitleWrapper>
          <StyledSearchResultContent
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          />
        </StyledSearchResultBody>
      </Button>
    </Link>
  );
};

export default SearchResult;
