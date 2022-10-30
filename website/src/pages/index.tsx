import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';

import Container from '../components/layout/Container';
import Page from '../components/layout/Page';
import config from '../lib/config';
import { getDocsMenuStaticProps } from '../lib/docs';
import homepageData from '../lib/homepage';
import releases from '../lib/releases';

import type { DocsMenuProps } from '../lib/docs';

const StyledHomagePageContent = styled('div')(
  ({ theme }) => `
    width: 100%;
    padding-top: 72px;
    display: flex;
    flex-direction: column;
    gap: 88px;
    align-items: center;

    ${theme.breakpoints.down('md')} {
      padding-top: 32px;
      gap: 0;
    }
  `,
);

const StyledIntroSection = styled('section')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIntroSectionContent = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`;

const StyledOverviewSection = styled('section')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${theme.breakpoints.down('md')} {
      margin-top: 64px;
    }
  `,
);

const StyledOverviewSectionContent = styled('div')(
  ({ theme }) => `
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 64px;

    ${theme.breakpoints.down('md')} {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  `,
);

const StyledOverviewList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledOverview = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledImageWrapper = styled('div')`
  width: 100%;
  position: relative;
`;

const StyledCallToActionSection = styled('section')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 0;
    overflow: visible;
    z-index: 1;

    ${theme.breakpoints.down('md')} {
      height: auto;
      margin-top: 64px;
    }
  `,
);

const StyledCallToActionContainer = styled('div')(
  ({ theme }) => `
    max-width: 1280px;
    width: 100%;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${theme.breakpoints.down('md')} {
      padding: 0;
    }
  `,
);

const StyledCallToActionCard = styled(Card)(
  ({ theme }) => `
    width: 80%;

    ${theme.breakpoints.down('md')} {
      width: 100%;
    }
  `,
);

const StyledCallToActionCardContent = styled(CardContent)(
  ({ theme }) => `
    display: flex;
    align-items: flex-start;
    padding: 24px 40px;
    line-height: 30px;
    gap: 24px;

    ${theme.breakpoints.down('md')} {
      flex-direction: column;
    }
  `,
);

const StyledCallToActionText = styled('div')`
  flex-grow: 1;
`;

const StyledReleasesSection = styled('section')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.palette.mode === 'light' ? '#dddee2' : '#242424'};
    padding: 64px 0;

    ${theme.breakpoints.down('md')} {
      padding: 48px 0;
    }
  `,
);

const StyledReleasesSectionContent = styled('div')(
  ({ theme }) => `
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 48px;

    ${theme.breakpoints.down('md')} {
      grid-template-columns: 1fr;
    }
  `,
);

const StyledReleaseCardContent = styled(CardContent)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledFeaturesSection = styled('section')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 80px;

    ${theme.breakpoints.down('md')} {
      height: auto;
      margin-top: 48px;
    }
  `,
);

const StyledFeaturesSectionIntro = styled('div')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 32px 0 104px;

    ${theme.breakpoints.down('md')} {
      padding: 32px 0 48px;
    }
  `,
);

const StyledFeaturesSectionContent = styled('div')(
  ({ theme }) => `
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 48px;

    ${theme.breakpoints.down('md')} {
      grid-template-columns: 1fr;
    }
  `,
);

const StyledFeature = styled('div')`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledFeatureText = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
`;

const Home = ({ docsGroups }: DocsMenuProps) => {
  const theme = useTheme();

  console.log('docsGroups', docsGroups)

  return (
    <Page url="/" docsGroups={docsGroups} fullWidth>
      <StyledHomagePageContent>
        <StyledIntroSection>
          <Container>
            <StyledIntroSectionContent>
              <Typography variant="h1" color="secondary">
                {homepageData.title}
              </Typography>
              <Typography variant="h2" color="text.primary">
                {homepageData.subtitle}
              </Typography>
              <Link href={homepageData.get_started.url}>
                <Button component="a" variant="contained" size="large">
                  {homepageData.get_started.title}
                </Button>
              </Link>
            </StyledIntroSectionContent>
          </Container>
        </StyledIntroSection>
        <StyledOverviewSection>
          <Container>
            <StyledOverviewSectionContent>
              <StyledOverviewList>
                {homepageData.overviews.map(overview => (
                  <StyledOverview key={overview.title}>
                    <Typography variant="h3" color="text.primary">
                      {overview.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {overview.description}
                    </Typography>
                  </StyledOverview>
                ))}
              </StyledOverviewList>
              <StyledImageWrapper>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/screenshot-editor.webp" />
              </StyledImageWrapper>
            </StyledOverviewSectionContent>
          </Container>
        </StyledOverviewSection>
        <StyledCallToActionSection>
          <StyledCallToActionContainer>
            <StyledCallToActionCard raised>
              <StyledCallToActionCardContent>
                <StyledCallToActionText>
                  <Typography variant="subtitle1" color="text.primary" component="strong">
                    {homepageData.call_to_action.title}
                  </Typography>
                  &nbsp;
                  <Typography variant="body1" color="text.secondary" component="span">
                    {homepageData.call_to_action.subtitle}
                  </Typography>
                </StyledCallToActionText>
                <Link href={homepageData.call_to_action.url}>
                  <Button
                    component="a"
                    variant="contained"
                    size="large"
                    sx={{ width: '188px', whiteSpace: 'nowrap' }}
                  >
                    {homepageData.call_to_action.button_text}
                  </Button>
                </Link>
              </StyledCallToActionCardContent>
            </StyledCallToActionCard>
          </StyledCallToActionContainer>
        </StyledCallToActionSection>
        <StyledReleasesSection>
          <Container>
            <StyledReleasesSectionContent>
              {[...Array(3)].map((_, index) => {
                if (index >= releases.length) {
                  return null;
                }

                const release = releases[index];
                return (
                  <CardActionArea
                    key={release.version}
                    href={`${config.repo_url}/releases/tag/${release.version}`}
                  >
                    <StyledReleaseCardContent>
                      <Typography
                        variant="subtitle1"
                        color="text.primary"
                        sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <>
                          <Chip label={release.version} color="secondary" />
                          {format(parseISO(release.date), 'MMMM dd, yyyy')}
                        </>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {release.description}
                      </Typography>
                    </StyledReleaseCardContent>
                  </CardActionArea>
                );
              })}
            </StyledReleasesSectionContent>
          </Container>
        </StyledReleasesSection>
        <StyledFeaturesSection>
          <Container>
            <StyledFeaturesSectionIntro>
              <Typography
                variant="h2"
                color="text.primary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  [theme.breakpoints.down('md')]: {
                    textAlign: 'center',
                  },
                }}
              >
                {homepageData.features_intro.title}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  [theme.breakpoints.down('md')]: {
                    textAlign: 'center',
                    marginTop: '24px',
                  },
                }}
              >
                {homepageData.features_intro.subtitle1} {homepageData.features_intro.subtitle2}
              </Typography>
            </StyledFeaturesSectionIntro>
            <StyledFeaturesSectionContent>
              {homepageData.features.map(feature => (
                <StyledFeature key={feature.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={feature.image} width="100%" height="auto" />
                  <StyledFeatureText>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </StyledFeatureText>
                </StyledFeature>
              ))}
            </StyledFeaturesSectionContent>
          </Container>
        </StyledFeaturesSection>
      </StyledHomagePageContent>
    </Page>
  );
};

export default Home;

export const getStaticProps = getDocsMenuStaticProps;
