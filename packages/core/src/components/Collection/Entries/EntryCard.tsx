import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { VIEW_STYLE_GRID, VIEW_STYLE_LIST } from '@staticcms/core/constants/collectionViews';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { getPreviewCard } from '@staticcms/core/lib/registry';
import {
  selectEntryCollectionTitle,
  selectFields,
  selectTemplateName,
} from '@staticcms/core/lib/util/collection.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import useWidgetsFor from '../../common/widget/useWidgetsFor';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Collection, Entry, FileOrImageField, MediaField } from '@staticcms/core/interface';

export interface EntryCardProps {
  entry: Entry;
  imageFieldName?: string | null | undefined;
  collection: Collection;
  collectionLabel?: string;
  viewStyle?: CollectionViewStyle;
}

const EntryCard = ({
  collection,
  entry,
  collectionLabel,
  viewStyle = VIEW_STYLE_LIST,
  imageFieldName,
}: EntryCardProps) => {
  const entryData = entry.data;

  const path = useMemo(
    () => `/collections/${collection.name}/entries/${entry.slug}`,
    [collection.name, entry.slug],
  );

  const imageField = useMemo(
    () =>
      'fields' in collection
        ? (collection.fields?.find(
            f => f.name === imageFieldName && f.widget === 'image',
          ) as FileOrImageField)
        : undefined,
    [collection, imageFieldName],
  );

  const image = useMemo(() => {
    let i = imageFieldName ? (entryData?.[imageFieldName] as string | undefined) : undefined;

    if (i) {
      i = encodeURI(i.trim());
    }

    return i;
  }, [entryData, imageFieldName]);

  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);

  const fields = selectFields(collection, entry.slug);
  const imageUrl = useMediaAsset(image, collection as Collection<MediaField>, imageField, entry);

  const config = useAppSelector(selectConfig);

  const { widgetFor, widgetsFor } = useWidgetsFor(config, collection, fields, entry);

  const PreviewCardComponent = useMemo(
    () => getPreviewCard(selectTemplateName(collection, entry.slug)) ?? null,
    [collection, entry.slug],
  );

  if (PreviewCardComponent) {
    return (
      <Card>
        <CardActionArea
          component={Link}
          to={path}
          sx={{
            height: '100%',
            position: 'relative',
            display: 'flex',
            width: '100%',
            justifyContent: 'start',
          }}
        >
          <PreviewCardComponent
            collection={collection}
            fields={fields}
            entry={entry}
            viewStyle={viewStyle === VIEW_STYLE_LIST ? 'list' : 'grid'}
            widgetFor={widgetFor}
            widgetsFor={widgetsFor}
          />
        </CardActionArea>
      </Card>
    );
  }

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

export default EntryCard;
