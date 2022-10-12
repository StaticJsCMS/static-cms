import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Link, useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import { components, buttons, shadows } from '../../ui';
import NavLink from '../UI/NavLink';

import type { Collection, TranslatedProps } from '../../interface';

const CollectionTopContainer = styled.div`
  ${components.cardTop};
  margin-bottom: 22px;
`;

const CollectionTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CollectionTopHeading = styled.h1`
  ${components.cardTopHeading};
`;

const CollectionTopNewButton = styled(Link)`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};

  padding: 0 30px;
`;

const CollectionTopDescription = styled.p`
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
