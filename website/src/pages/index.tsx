import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

import Container from '../components/layout/Container';
import Page from '../components/layout/Page';
import homepageData from '../lib/homepage';

import Card from '@mui/material/Card';
import type { NextPage } from 'next';

const StyledHomagePageContent = styled('div')`
  width: 100%;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  gap: 88px;
  align-items: center;
`;

const StyleIntroSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`;

const StyledFeaturesSection = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;
`;

const StyledFeaturesList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledFeature = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledImageWrapper = styled('div')`
  width: 100%;
  position: relative;
`;

const StyledCallToActionSection = styled('div')``;

const StyledCard = styled(Card)``;

const StyledReleasesSection = styled('div')`
  width: 100%;
  background: #51555d;
  padding: 64px 0;
`;

const Home: NextPage = () => {
  return (
    <Page url="/" fullWidth>
      <StyledHomagePageContent>
        <Container>
          <StyleIntroSection>
            <Typography variant="h1">{homepageData.title}</Typography>
            <Typography variant="h5" component="h2" color="text.primary">
              {homepageData.subtitle}
            </Typography>
            <Link href={homepageData.get_started.url}>
              <Button component="a" variant="contained" size="large">
                {homepageData.get_started.title}
              </Button>
            </Link>
          </StyleIntroSection>
        </Container>
        <Container>
          <StyledFeaturesSection>
            <StyledFeaturesList>
              {homepageData.features.map(feature => (
                <StyledFeature key={feature.title}>
                  <Typography variant="h6" component="h3" color="text.primary">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </StyledFeature>
              ))}
            </StyledFeaturesList>
            <StyledImageWrapper>
              <Image layout="fill" src="/img/screenshot-editor.webp" />
            </StyledImageWrapper>
          </StyledFeaturesSection>
        </Container>
        <div />
        <StyledCallToActionSection>
          <Container>
            <StyledCard>Test</StyledCard>
          </Container>
        </StyledCallToActionSection>
        <StyledReleasesSection />
      </StyledHomagePageContent>
    </Page>
  );
};

export default Home;
