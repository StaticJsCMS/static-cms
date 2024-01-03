import React, { useEffect } from 'react';

import { loadMedia } from '@staticcms/core/actions/mediaLibrary';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { useAppDispatch } from '@staticcms/core/store/hooks';
import MainView from '../MainView';
import MediaLibrary from './common/MediaLibrary';

import type { FC } from 'react';

const MediaPage: FC = () => {
  const t = useTranslate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadMedia({}));
  }, [dispatch]);

  return (
    <MainView
      breadcrumbs={[{ name: t('app.header.media') }]}
      showQuickCreate
      showLeftNav
      noMargin
      noScroll
    >
      <MediaLibrary />
    </MainView>
  );
};

export default MediaPage;
