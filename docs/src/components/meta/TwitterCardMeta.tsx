import Head from 'next/head';
import { useMemo } from 'react';

import config from '../../lib/config';

interface TwitterCardMetaProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

const TwitterCardMeta = ({ url, title, description, image }: TwitterCardMetaProps) => {
  const imageUrl = useMemo(() => {
    return image
      ? `${config.base_url.replace(/\/$/g, '')}/${image.replace(/^\//g, '')}`
      : `${config.base_url.replace(/\/$/g, '')}/${config.site_image.replace(/^\//g, '')}`;
  }, [image]);

  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={config.base_url.replace(/\/$/g, '') + url} />
      <meta
        property="twitter:title"
        content={title ? [title, config.site_title].join(' | ') : config.site_title}
      />
      <meta
        property="twitter:description"
        content={description ? description : config.site_description}
      />
      <meta property="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default TwitterCardMeta;
