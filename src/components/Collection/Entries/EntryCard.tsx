import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAsset } from '../../../actions/media';
import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '../../../constants/collectionViews';
import { selectEntryCollectionTitle } from '../../../lib/util/collection.util';
import { selectIsLoadingAsset } from '../../../reducers/medias';

import type { ConnectedProps } from 'react-redux';
import type { CollectionViewStyle } from '../../../constants/collectionViews';
import type { CmsField, Collection, Entry } from '../../../interface';
import type { RootState } from '../../../store';

const EntryCard = ({
  collection,
  entry,
  path,
  image,
  imageField,
  collectionLabel,
  viewStyle = VIEW_STYLE_LIST,
  getAsset,
}: NestedCollectionProps) => {
  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);

  return (
    <Card>
      <CardActionArea component={Link} to={path}>
        {viewStyle === VIEW_STYLE_GRID && image && imageField ? (
          <CardMedia
            component="img"
            height="140"
            image={getAsset(collection, entry, image, imageField).toString()}
          />
        ) : null}
        <CardContent>
          {collectionLabel ? (
            <Typography gutterBottom variant="h5" component="div">
              {collectionLabel}
            </Typography>
          ) : null}
          <Typography gutterBottom variant="h6" component="div" sx={{ margin: 0 }}>
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface EntryCardOwnProps {
  entry: Entry;
  inferedFields: {
    titleField?: string | null | undefined;
    descriptionField?: string | null | undefined;
    imageField?: string | null | undefined;
    remainingFields?: CmsField[] | undefined;
  };
  collection: Collection;
  imageField?: CmsField;
  collectionLabel?: string;
  viewStyle?: CollectionViewStyle;
}

function mapStateToProps(state: RootState, ownProps: EntryCardOwnProps) {
  const { entry, inferedFields, collection } = ownProps;
  const entryData = entry.data;

  let image = inferedFields.imageField
    ? (entryData?.[inferedFields.imageField] as string | undefined)
    : undefined;
  if (image) {
    image = encodeURI(image);
  }

  const isLoadingAsset = selectIsLoadingAsset(state.medias);

  return {
    ...ownProps,
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
