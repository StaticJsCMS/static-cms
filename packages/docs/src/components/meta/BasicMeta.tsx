import Head from 'next/head';

import config from '../../lib/config';

interface BasicMetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  url: string;
}

const BasicMeta = ({ title, description, keywords, url }: BasicMetaProps) => {
  return (
    <Head>
      <title>{title ? [title, config.site_title].join(' | ') : config.site_title}</title>
      <meta name="description" content={description ? description : config.site_description} />
      <meta
        name="keywords"
        content={keywords ? keywords.join(',') : config.site_keywords.join(',')}
      />
      <link rel="canonical" href={config.base_url.replace(/\/$/g, '') + url} />
    </Head>
  );
};

export default BasicMeta;
