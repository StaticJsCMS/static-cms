import { styled } from '@mui/material/styles';

import type { NestedHeading } from './DocsTableOfContents';

const StyledList = styled('ul')(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
      
    ${theme.breakpoints.down('lg')} {
      margin-top: 0;
    }
  `,
);

const StyledListItem = styled('li')(
  ({ theme }) => `
    & > a {
      display: flex;
      padding-left: 32px;
      text-indent: -16px;
      color: ${theme.palette.text.secondary};
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      line-height: 28px;
      border-left: 2px solid transparent;
    }

    &.active > a {
      color: ${theme.palette.primary.main};
      border-left: 2px solid ${theme.palette.primary.main};
    }

    & > a:hover {
      color: ${theme.palette.primary.main};
      text-decoration: underline;
    }
  `,
);

const StyledChildListItem = styled(StyledListItem)`
  & > a {
    padding-left: 48px;
    text-indent: -16px;
  }
`;

interface DocsHeadingsProps {
  headings: NestedHeading[];
  activeId: string | undefined;
}

const DocsHeadings = ({ headings, activeId }: DocsHeadingsProps) => (
  <StyledList>
    {headings.map(heading => (
      <StyledListItem key={heading.id} className={heading.id === activeId ? 'active' : ''}>
        <a
          href={`#${heading.id}`}
          onClick={e => {
            e.preventDefault();
            document.querySelector(`#${heading.id}`)?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <StyledList>
            {heading.items.map(child => (
              <StyledChildListItem key={child.id} className={child.id === activeId ? 'active' : ''}>
                <a
                  href={`#${child.id}`}
                  onClick={e => {
                    e.preventDefault();
                    document.querySelector(`#${child.id}`)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  {child.title}
                </a>
              </StyledChildListItem>
            ))}
          </StyledList>
        )}
      </StyledListItem>
    ))}
  </StyledList>
);

export default DocsHeadings;
