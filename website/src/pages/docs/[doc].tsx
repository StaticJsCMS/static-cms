import Page from '../../components/layout/Page';
import { fetchDocsContent } from '../../lib/docs';

import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { DocsPage } from '../../interface';

interface DocsProps {
  title: string;
  slug: string;
  description?: string;
  content: string;
}

const Docs = ({ title, slug, description = '', content }: DocsProps) => {
  return (
    <Page title={title} url={`/docs/${slug}`} description={description}>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </Page>
  );
};

export default Docs;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchDocsContent()[0].map(docs => `/news/${docs.data.slug}`);
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

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: DocsProps }> => {
  const slug = params?.doc as string;

  if (process.env.NODE_ENV === 'development') {
    slugToDocsContent = buildSlugToDocsContent(fetchDocsContent()[0]);
  }

  const { content, data } = slugToDocsContent[slug];

  return {
    props: {
      title: data.title,
      slug: data.slug,
      description: '',
      content,
    },
  };
};
