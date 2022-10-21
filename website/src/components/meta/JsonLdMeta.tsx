import formatISO from 'date-fns/formatISO';
import Head from 'next/head';
import { jsonLdScriptProps } from 'react-schemaorg';

import config from '../../lib/config';

import type { BlogPosting } from 'schema-dts';

interface JsonLdMetaProps {
  url: string;
  title?: string;
  keywords?: string[];
  date: Date;
  image?: string;
  description?: string;
}

const JsonLdMeta = ({ url, title, keywords, date, image, description }: JsonLdMetaProps) => {
  return (
    <Head>
      <script
        {...jsonLdScriptProps<BlogPosting>({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: config.base_url.replace(/\/$/g, '') + url,
          headline: title ?? config.site_title,
          keywords: keywords ? keywords.join(',') : undefined,
          datePublished: date ? formatISO(date) : undefined,
          image,
          description,
        })}
      />
    </Head>
  );
};

export default JsonLdMeta;
