import React from 'react';
import { translate } from 'react-polyglot';

import MainView from '../MainView';
import MediaLibrary from './common/MediaLibrary';

import type { FC } from 'react';
import type { TranslateProps } from 'react-polyglot';

const MediaPage: FC<TranslateProps> = ({ t }) => {
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

export default translate()(MediaPage) as FC;
