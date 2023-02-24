import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';
import React from 'react';
import { translate } from 'react-polyglot';

import ViewStyleControl from '../../common/view-style/ViewStyleControl';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

interface MediaHeaderProps {
  viewStyle: ViewStyle;
  onChangeViewStyle: (viewStyle: ViewStyle) => void;
}

const MediaHeader: FC<TranslatedProps<MediaHeaderProps>> = ({
  viewStyle,
  onChangeViewStyle,
  t,
}) => {
  return (
    <div className="flex items-center px-5 py-4">
      <div className="flex flex-grow gap-4">
        <h2 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-300">
          <span className="mr-2">
            <PhotoIcon className="w-6 h-6" />
          </span>
          {t('app.header.media')}
        </h2>
      </div>
      <div className="flex gap-2 items-center relative z-10">
        <ViewStyleControl viewStyle={viewStyle} onChangeViewStyle={onChangeViewStyle} />
      </div>
    </div>
  );
};

export default translate()(MediaHeader);
