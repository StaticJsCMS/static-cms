import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getAdditionalLink } from '@staticcms/core/lib/registry';
import MainView from '../MainView';

const Page = () => {
  const { id } = useParams();
  const { data: Content, title } = useMemo(() => {
    if (!id) {
      return { data: '', title: '' };
    }

    const page = getAdditionalLink(id);
    if (!page) {
      return { data: '', title: '' };
    }

    return page;
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

  return (
    <MainView breadcrumbs={[{ name: title }]} showQuickCreate showLeftNav>
      {pageContent}
    </MainView>
  );
};

export default Page;
