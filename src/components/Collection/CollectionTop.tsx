import React from 'react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';

import { components, buttons, shadows } from '../../ui';

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
  const { collectionLabel, collectionLabelSingular, collectionDescription } =
    getCollectionProps(collection);

  return (
    <CollectionTopContainer>
      <CollectionTopRow>
        <CollectionTopHeading>{collectionLabel}</CollectionTopHeading>
        {newEntryUrl ? (
          <CollectionTopNewButton to={newEntryUrl}>
            {t('collection.collectionTop.newButton', {
              collectionLabel: collectionLabelSingular || collectionLabel,
            })}
          </CollectionTopNewButton>
        ) : null}
      </CollectionTopRow>
      {collectionDescription ? (
        <CollectionTopDescription>{collectionDescription}</CollectionTopDescription>
      ) : null}
    </CollectionTopContainer>
  );
};

export default translate()(CollectionTop);
