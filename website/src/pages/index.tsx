import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

import Page from '../components/layout/Page';
import homepageData from '../lib/homepage';

import type { NextPage } from 'next';

const StyledHomagePageContent = styled('div')`
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 88px;
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

const Home: NextPage = () => {
  return (
    <Page url="/">
      <StyledHomagePageContent>
        <StyleIntroSection>
          <Typography variant="h1">Open source content management for your Git workflow</Typography>
          <Typography variant="h5" component="h2" color="text.primary">
            Use Static CMS with any static site generator for a faster and more flexible web project
          </Typography>
          <Link href="/docs/start-with-a-template">
            <Button component="a" variant="contained" size="large">
              Get Started
            </Button>
          </Link>
        </StyleIntroSection>
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
      </StyledHomagePageContent>
    </Page>
  );
};

export default Home;
