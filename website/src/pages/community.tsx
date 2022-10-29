import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CommunitySection from '../components/community/CommunitySection';
import Container from '../components/layout/Container';
import Page from '../components/layout/Page';
import communityData from '../lib/community';

const StyledCommunityContent = styled('div')`
  width: 100%;
  padding-top: 72px;
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const StyledTitle = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const StyledCommunityLinks = styled('section')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.palette.mode === 'light' ? '#dddee2' : '#242424'};
    padding: 64px 0 32px;
    flex-grow: 1;
  `,
);

const StyledCommunityLinksContent = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const Community = () => {
  return (
    <Page url="/community" fullWidth>
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
