import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useCallback } from 'react';
import { translate } from 'react-polyglot';
import { useNavigate } from 'react-router-dom';

import { components } from '@staticcms/core/components/UI/styles';

import type { Collection, TranslatedProps } from '@staticcms/core/interface';

const CollectionTopRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CollectionTopHeading = styled('h1')`
  ${components.cardTopHeading};
`;

const CollectionTopDescription = styled('p')`
  ${components.cardTopDescription};
  margin-bottom: 0;
`;

function getCollectionProps(collection: Collection) {
  const collectionLabel = collection.label;
  const collectionLabelSingular = collection.label_singular;
  const collectionDescription = collection.description;

  return {
    collectionLabel,
    collectionLabelSingular,
    collectionDescription,
  };
}

interface CollectionTopProps {
  collection: Collection;
  newEntryUrl?: string;
}

const CollectionTop = ({ collection, newEntryUrl, t }: TranslatedProps<CollectionTopProps>) => {
  const navigate = useNavigate();

  const { collectionLabel, collectionLabelSingular, collectionDescription } =
    getCollectionProps(collection);

  const onNewClick = useCallback(() => {
    if (newEntryUrl) {
      navigate(newEntryUrl);
    }
  }, [navigate, newEntryUrl]);

  return (
    <Card>
      <CardContent>
        <CollectionTopRow>
          <CollectionTopHeading>{collectionLabel}</CollectionTopHeading>
          {newEntryUrl ? (
            <Button onClick={onNewClick} variant="contained">
              {t('collection.collectionTop.newButton', {
                collectionLabel: collectionLabelSingular || collectionLabel,
              })}
            </Button>
          ) : null}
        </CollectionTopRow>
        {collectionDescription ? (
          <CollectionTopDescription>{collectionDescription}</CollectionTopDescription>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default translate()(CollectionTop);
