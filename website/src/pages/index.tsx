import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import Page from '../components/layout/Page';

import type { NextPage } from 'next';

const StyledHomagePageContent = styled('div')`
  padding-top: 64px;
`;

const StyledFeaturesSection = styled('div')`
  display: grid;
  grid-template-columns: repeat(minmax(0, 1fr), 2);
`;

const Home: NextPage = () => {
  return (
    <Page url="/">
      <StyledHomagePageContent>
        <Typography variant="h1">Open source content management for your Git workflow</Typography>
        <Typography variant="h5" component="h2" color="text.primary" sx={{ mt: 2 }}>
          Use Static CMS with any static site generator for a faster and more flexible web project
        </Typography>
        <Link href="/docs/start-with-a-template">
          <Button component="a" variant="contained" size="large" sx={{ mt: 2 }}>
            Get Started
          </Button>
        </Link>
        <StyledFeaturesSection>
          <Typography variant="h3" component="h2" color="text.primary" sx={{ mt: 2 }}>
            Use Static CMS with any static site generator for a faster and more flexible web project
          </Typography>
        </StyledFeaturesSection>
      </StyledHomagePageContent>
    </Page>
  );
};

export default Home;
