import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

import Blockquote from '../../components/docs/components/Blockquote';
import Header2 from '../../components/docs/components/Header2';
import Header3 from '../../components/docs/components/Header3';
import DocsContent from '../../components/docs/DocsContent';
import DocsLeftNav from '../../components/docs/DocsLeftNav';
import DocsRightNav from '../../components/docs/DocsRightNav';
import Page from '../../components/layout/Page';
import { fetchDocsContent } from '../../lib/docs';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { DocsGroup, DocsPage } from '../../interface';

const StyledDocsView = styled('div')(
  ({ theme }) => `
    display: grid;
    grid-template-columns: calc(100% - 240px) 240px;
    margin-left: 280px;
    width: calc(100% - 280px);
    padding-top: 16px;

    ${theme.breakpoints.down('lg')} {
      grid-template-columns: unset
    }
  `,
);

const StyledDocsContentWrapper = styled('main')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  margin-bottom: 40px;
`;

interface DocsProps {
  docsGroups: DocsGroup[];
  title: string;
  slug: string;
  description?: string;
  source: MDXRemoteSerializeResult;
}

const Docs = ({ docsGroups, title, slug, description = '', source }: DocsProps) => {
  const theme = useTheme();

  return (
    <Page
      title={title}
      url={`/docs/${slug}`}
      description={description}
      docsGroups={docsGroups}
      fullWidth
    >
      <DocsLeftNav docsGroups={docsGroups} />
      <StyledDocsView className={theme.palette.mode}>
        <StyledDocsContentWrapper>
          <DocsContent>
            <Typography variant="h1">{title}</Typography>
            <MDXRemote
              {...source}
              components={{ h2: Header2, h3: Header3, blockquote: Blockquote }}
            />
          </DocsContent>
        </StyledDocsContentWrapper>
        <DocsRightNav />
      </StyledDocsView>
    </Page>
  );
};

export default Docs;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchDocsContent()[0].map(docs => `/docs/${docs.data.slug}`);
  return {
    paths,
    fallback: false,
  };
};

const buildSlugToDocsContent = (docsContents: DocsPage[]) => {
  const hash: Record<string, DocsPage> = {};
  docsContents.forEach(docs => (hash[docs.data.slug] = docs));
  return hash;
};

let slugToDocsContent = buildSlugToDocsContent(fetchDocsContent()[0]);
let docsGroups = fetchDocsContent()[1];

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: DocsProps }> => {
  const slug = params?.doc as string;

  if (process.env.NODE_ENV === 'development') {
    slugToDocsContent = buildSlugToDocsContent(fetchDocsContent()[0]);
    docsGroups = fetchDocsContent()[1];
  }

  const { content, data } = slugToDocsContent[slug];
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    props: {
      docsGroups,
      title: data.title,
      slug: data.slug,
      description: '',
      source,
    },
  };
};
