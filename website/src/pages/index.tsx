import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import Page from '../components/layout/Page';

import type { NextPage } from 'next';
const StyledHomagePageContent = styled('div')`
  padding-top: 64px;
`;

const Home: NextPage = () => {
  return (
    <Page url="/">
      <StyledHomagePageContent>
        <Typography variant="h1">
          Open source content management for your Git workflow
        </Typography>
        <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
          Use Static CMS with any static site generator for a faster and more flexible web project
        </Typography>
        <Link href="/docs/start-with-a-template">
          <Button component="a" variant="contained" size="large" sx={{ mt: 2 }}>
            Get Started
          </Button>
        </Link>

        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <div>
          <a href="https://nextjs.org/docs">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples">
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </StyledHomagePageContent>
    </Page>
  );
};

export default Home;
