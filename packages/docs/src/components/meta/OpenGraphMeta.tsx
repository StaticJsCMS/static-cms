import Head from 'next/head';
import { useMemo } from 'react';

import config from '../../lib/config';

interface OpenGraphMetaProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

const OpenGraphMeta = ({ url, title, description, image }: OpenGraphMetaProps) => {
  const imageUrl = useMemo(() => {
    return image
      ? `${config.base_url.replace(/\/$/g, '')}/${image.replace(/^\//g, '')}`
      : `${config.base_url.replace(/\/$/g, '')}/${config.site_image.replace(/^\//g, '')}`;
  }, [image]);

  return (
    <Head>
      <meta property="og:site_name" content={config.site_title} />
      <meta property="og:url" content={config.base_url.replace(/\/$/g, '') + url} />
      <meta property="og:title" content={title ? [title, config.site_title].join(' | ') : ''} />
      <meta
        property="og:description"
        content={description ? description : config.site_description}
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="article" />
    </Head>
  );
};

export default OpenGraphMeta;
