import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getAdditionalLink } from '@staticcms/core/lib/registry';
import MainView from '../MainView';

const Page = () => {
  const { id } = useParams();
  const Content = useMemo(() => {
    if (!id) {
      return '';
    }

    const page = getAdditionalLink(id);
    if (!page) {
      return '';
    }

    return page.data;
  }, [id]);

  const pageContent = useMemo(() => {
    if (!Content) {
      return <div>Page not found</div>;
    }

    return (
      <div>
        <Content />
      </div>
    );
  }, [Content]);

  return <MainView showLeftNav>{pageContent}</MainView>;
};

export default Page;
