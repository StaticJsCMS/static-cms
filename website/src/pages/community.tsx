import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CommunitySection from '../components/community/CommunitySection';
import Container from '../components/layout/Container';
import Page from '../components/layout/Page';
import communityData from '../lib/community';
import { getDocsMenuStaticProps } from '../lib/docs';

import type { DocsMenuProps } from '../lib/docs';

const StyledCommunityContent = styled('div')(
  ({ theme }) => `
    width: 100%;
    padding-top: 72px;
    min-height: calc(100vh - 72px);
    display: flex;
    flex-direction: column;
    gap: 80px;

    ${theme.breakpoints.between('md', 'lg')} {
      padding-top: 48px;
      gap: 56px
    }

    ${theme.breakpoints.down('md')} {
      padding-top: 32px;
      gap: 40px
    }
  `,
);

const StyledTitle = styled('div')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    ${theme.breakpoints.down('lg')} {
      gap: 8px
    }
  `,
);

const StyledCommunityLinks = styled('section')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.palette.mode === 'light' ? '#dddee2' : '#242424'};
    padding: 64px 0 32px;
    flex-grow: 1;

    ${theme.breakpoints.between('md', 'lg')} {
      padding: 48px 0 32px;
    }

    ${theme.breakpoints.down('md')} {
      padding: 40px 0 32px;
    }
  `,
);

const StyledCommunityLinksContent = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const Community = ({ docsGroups }: DocsMenuProps) => {
  return (
    <Page url="/community" docsGroups={docsGroups} fullWidth>
      <StyledCommunityContent>
        <Container>
          <StyledTitle>
            <Typography variant="h1" color="secondary">
              {communityData.title}
            </Typography>
            <Typography variant="h2" color="text.primary">
              {communityData.subtitle}
            </Typography>
          </StyledTitle>
        </Container>
        <StyledCommunityLinks>
          <Container>
            <StyledCommunityLinksContent>
              {communityData.sections.map(section => (
                <CommunitySection key={section.title} section={section} />
              ))}
            </StyledCommunityLinksContent>
          </Container>
        </StyledCommunityLinks>
      </StyledCommunityContent>
    </Page>
  );
};

export default Community;

export const getStaticProps = getDocsMenuStaticProps;
