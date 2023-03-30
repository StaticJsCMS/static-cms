import React, { useCallback } from 'react';
import { translate } from 'react-polyglot';
import { useNavigate } from 'react-router-dom';

import useIcon from '@staticcms/core/lib/hooks/useIcon';
import Button from '../common/button/Button';

import type { Collection, TranslatedProps } from '@staticcms/core/interface';

interface CollectionHeaderProps {
  collection: Collection;
  newEntryUrl?: string;
}

const CollectionHeader = ({
  collection,
  newEntryUrl,
  t,
}: TranslatedProps<CollectionHeaderProps>) => {
  const navigate = useNavigate();

  const collectionLabel = collection.label;
  const collectionLabelSingular = collection.label_singular;

  const onNewClick = useCallback(() => {
    if (newEntryUrl) {
      navigate(newEntryUrl);
    }
  }, [navigate, newEntryUrl]);

  const icon = useIcon(collection.icon);

  return (
    <>
      <div className="flex flex-grow gap-4">
        <h2 className="text-xl font-semibold flex items-center text-gray-800 dark:text-gray-300">
          <div className="mr-2 flex">{icon}</div>
          {collectionLabel}
        </h2>
        {newEntryUrl ? (
          <Button onClick={onNewClick}>
            {t('collection.collectionTop.newButton', {
              collectionLabel: collectionLabelSingular || collectionLabel,
            })}
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default translate()(CollectionHeader);
