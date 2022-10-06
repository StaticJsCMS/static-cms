import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAsset } from '../../../actions/media';
import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '../../../constants/collectionViews';
import { transientOptions } from '../../../lib';
import { selectEntryCollectionTitle } from '../../../reducers/collections';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import { colors, colorsRaw, components, lengths, zIndex } from '../../../ui';

import type { ConnectedProps } from 'react-redux';
import type { CollectionViewStyle } from '../../../constants/collectionViews';
import type { Collection, Entry, EntryField, State } from '../../../interface';

const ListCard = styled.li`
  ${components.card};
  width: ${lengths.topCardWidth};
  margin-left: 12px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const ListCardLink = styled(Link)`
  display: block;
  max-width: 100%;
  padding: 16px 22px;

  &:hover {
    background-color: ${colors.foreground};
  }
`;

const GridCard = styled.li`
  ${components.card};
  flex: 0 0 335px;
  height: 240px;
  overflow: hidden;
  margin-left: 12px;
  margin-bottom: 16px;
`;

const GridCardLink = styled(Link)`
  display: block;
  height: 100%;
  outline-offset: -2px;

  &,
  &:hover {
    background-color: ${colors.foreground};
    color: ${colors.text};
  }
`;

const CollectionLabel = styled.h2`
  font-size: 12px;
  color: ${colors.textLead};
  text-transform: uppercase;
`;

const ListCardTitle = styled.h2`
  margin-bottom: 0;
`;

const CardHeading = styled.h2`
  margin: 0 0 2px;
`;

interface CardBodyProps {
  $hasImage: boolean;
}

const CardBody = styled(
  'div',
  transientOptions,
)<CardBodyProps>(
  ({ $hasImage }) => `
    padding: 16px 22px;
    height: 90px;
    position: relative;
    margin-bottom: ${$hasImage && 0};

    &:after {
      content: '';
      position: absolute;
      display: block;
      z-index: ${zIndex.zIndex1};
      bottom: 0;
      left: -20%;
      height: 140%;
      width: 140%;
      box-shadow: inset 0 -15px 24px ${colorsRaw.white};
    }
  `,
);

interface CardImageProps {
  $src: string;
}

const CardImage = styled(
  'div',
  transientOptions,
)<CardImageProps>(
  ({ $src }) => `
    background-image: url(${$src});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 150px;
  `,
);

const EntryCard = ({
  collection,
  entry,
  path,
  summary,
  image,
  imageField,
  collectionLabel,
  viewStyle = VIEW_STYLE_LIST,
  getAsset,
}: NestedCollectionProps) => {
  if (viewStyle === VIEW_STYLE_LIST) {
    return (
      <ListCard>
        <ListCardLink to={path}>
          {collectionLabel ? <CollectionLabel>{collectionLabel}</CollectionLabel> : null}
          <ListCardTitle>{summary}</ListCardTitle>
        </ListCardLink>
      </ListCard>
    );
  }

  if (viewStyle === VIEW_STYLE_GRID) {
    return (
      <GridCard>
        <GridCardLink to={path}>
          <CardBody $hasImage={Boolean(image)}>
            {collectionLabel ? <CollectionLabel>{collectionLabel}</CollectionLabel> : null}
            <CardHeading>{summary}</CardHeading>
          </CardBody>
          {image && imageField ? (
            <CardImage
              $src={getAsset({ collection, entry, path: image, field: imageField }).toString()}
            />
          ) : null}
        </GridCardLink>
      </GridCard>
    );
  }

  return null;
};

interface EntryCardOwnProps {
  entry: Entry;
  inferedFields: {
    titleField?: string | null | undefined;
    descriptionField?: string | null | undefined;
    imageField?: string | null | undefined;
    remainingFields?: EntryField[] | undefined;
  };
  collection: Collection;
  imageField?: EntryField;
  collectionLabel?: string;
  viewStyle?: CollectionViewStyle;
}

function mapStateToProps(state: State, ownProps: EntryCardOwnProps) {
  const { entry, inferedFields, collection } = ownProps;
  const entryData = entry.data;
  const summary = selectEntryCollectionTitle(collection, entry);

  let image = inferedFields.imageField
    ? (entryData[inferedFields.imageField] as string | undefined)
    : undefined;
  if (image) {
    image = encodeURI(image);
  }

  const isLoadingAsset = selectIsLoadingAsset(state.medias);

  return {
    ...ownProps,
    summary,
    path: `/collections/${collection.name}/entries/${entry.slug}`,
    image,
    imageField: collection.fields?.find(
      f => f.name === inferedFields.imageField && f.widget === 'image',
    ),
    isLoadingAsset,
  };
}

function mapDispatchToProps() {
  return {
    getAsset,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export type NestedCollectionProps = ConnectedProps<typeof connector>;

export default connector(EntryCard);
