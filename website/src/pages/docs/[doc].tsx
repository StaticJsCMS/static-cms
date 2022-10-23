import { styled } from '@mui/material/styles';

import Page from '../../components/layout/Page';
import { fetchDocsContent } from '../../lib/docs';
import DocsLeftNav from '../../components/docs/DocsLeftNav';
import DocsRightNav from '../../components/docs/DocsRightNav';

import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { DocsPage } from '../../interface';

const StyledDocsView = styled('div')`
  display: grid;
  grid-template-columns: 300px auto 200px;
`;

interface DocsProps {
  groupedDocPages: Record<string, DocsPage[]>;
  title: string;
  slug: string;
  description?: string;
  content: string;
}

const Docs = ({ groupedDocPages, title, slug, description = '', content }: DocsProps) => {
  return (
    <Page title={title} url={`/docs/${slug}`} description={description} fullWidth>
      <StyledDocsView>
        <DocsLeftNav groupedDocPages={groupedDocPages} />
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
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
let groupedDocPages = fetchDocsContent()[1];

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: DocsProps }> => {
  const slug = params?.doc as string;

  if (process.env.NODE_ENV === 'development') {
    slugToDocsContent = buildSlugToDocsContent(fetchDocsContent()[0]);
    groupedDocPages = fetchDocsContent()[1];
  }

  const { content, data } = slugToDocsContent[slug];

  return {
    props: {
      groupedDocPages,
      title: data.title,
      slug: data.slug,
      description: '',
      content,
    },
  };
};
