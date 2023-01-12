import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAsset as getAssetAction } from '@staticcms/core/actions/media';
import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '@staticcms/core/constants/collectionViews';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { selectEntryCollectionTitle } from '@staticcms/core/lib/util/collection.util';
import { selectIsLoadingAsset } from '@staticcms/core/reducers/selectors/medias';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Collection, Entry, Field } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ConnectedProps } from 'react-redux';

const EntryCard = ({
  collection,
  entry,
  path,
  image,
  imageField,
  collectionLabel,
  viewStyle = VIEW_STYLE_LIST,
}: NestedCollectionProps) => {
  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);

  const imageUrl = useMediaAsset(image, collection, imageField, entry);

  return (
    <Card>
      <CardActionArea component={Link} to={path}>
        {viewStyle === VIEW_STYLE_GRID && image && imageField ? (
          <CardMedia component="img" height="140" image={imageUrl} />
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
    remainingFields?: Field[] | undefined;
  };
  collection: Collection;
  imageField?: Field;
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
    image = encodeURI(image.trim());
  }

  const isLoadingAsset = selectIsLoadingAsset(state);

  return {
    ...ownProps,
    path: `/collections/${collection.name}/entries/${entry.slug}`,
    image,
    imageField:
      'fields' in collection
        ? collection.fields?.find(f => f.name === inferedFields.imageField && f.widget === 'image')
        : undefined,
    isLoadingAsset,
  };
}

const mapDispatchToProps = {
  getAsset: getAssetAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type NestedCollectionProps = ConnectedProps<typeof connector>;

export default connector(EntryCard);
