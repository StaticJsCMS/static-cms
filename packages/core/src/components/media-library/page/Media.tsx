import React from 'react';
import { translate } from 'react-polyglot';

import MainView from '../../MainView';
import MediaLibrary from '../common/MediaLibrary';

import type { FC } from 'react';
import type { TranslateProps } from 'react-polyglot';

const Media: FC<TranslateProps> = ({ t }) => {
  return (
    <MainView breadcrumbs={[{ name: t('app.header.media') }]} showQuickCreate showLeftNav noMargin>
      <MediaLibrary />
    </MainView>
  );
};

export default translate()(Media) as FC;
