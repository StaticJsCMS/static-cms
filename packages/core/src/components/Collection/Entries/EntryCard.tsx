import get from 'lodash/get';
import React, { useMemo } from 'react';

import { VIEW_STYLE_LIST } from '@staticcms/core/constants/collectionViews';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { getFieldPreview, getPreviewCard } from '@staticcms/core/lib/registry';
import {
  selectEntryCollectionTitle,
  selectFields,
  selectTemplateName,
} from '@staticcms/core/lib/util/collection.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Card from '../../common/card/Card';
import CardActionArea from '../../common/card/CardActionArea';
import CardContent from '../../common/card/CardContent';
import CardMedia from '../../common/card/CardMedia';
import TableCell from '../../common/table/TableCell';
import TableRow from '../../common/table/TableRow';
import useWidgetsFor from '../../common/widget/useWidgetsFor';

import type { CollectionViewStyle } from '@staticcms/core/constants/collectionViews';
import type { Collection, Entry, Field } from '@staticcms/core/interface';

interface EntryCardProps {
  entry: Entry;
  inferredFields: {
    titleField?: string | null | undefined;
    descriptionField?: string | null | undefined;
    imageField?: string | null | undefined;
    remainingFields?: Field[] | undefined;
  };
  collection: Collection;
  imageField?: Field;
  viewStyle?: CollectionViewStyle;
  summaryFields: string[];
}

const EntryCard = ({
  collection,
  entry,
  viewStyle = VIEW_STYLE_LIST,
  summaryFields,
  inferredFields,
}: EntryCardProps) => {
  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);

  const path = useMemo(
    () => `/collections/${collection.name}/entries/${entry.slug}`,
    [collection.name, entry.slug],
  );

  const image = useMemo(() => {
    let image = inferredFields.imageField
      ? (entry.data?.[inferredFields.imageField] as string | undefined)
      : undefined;

    if (image) {
      image = encodeURI(image.trim());
    }

    return image;
  }, [entry.data, inferredFields.imageField]);

  const imageField = useMemo(
    () =>
      'fields' in collection
        ? collection.fields?.find(f => f.name === inferredFields.imageField && f.widget === 'image')
        : undefined,
    [collection, inferredFields.imageField],
  );

  const fields = selectFields(collection, entry.slug);
  const imageUrl = useMediaAsset(image, collection, imageField, entry);

  const config = useAppSelector(selectConfig);

  const { widgetFor, widgetsFor } = useWidgetsFor(config, collection, fields, entry);

  const templateName = useMemo(
    () => selectTemplateName(collection, entry.slug),
    [collection, entry.slug],
  );

  const PreviewCardComponent = useMemo(() => getPreviewCard(templateName) ?? null, [templateName]);

  const theme = useAppSelector(selectTheme);

  if (viewStyle === VIEW_STYLE_LIST) {
    return (
      <TableRow>
        {summaryFields.map(fieldName => {
          if (fieldName === 'summary') {
            return (
              <TableCell key={fieldName} to={path}>
                {summary}
              </TableCell>
            );
          }

          const field = fields.find(f => f.name === fieldName);
          const value = get(entry.data, fieldName);
          const FieldPreviewComponent = getFieldPreview(templateName, fieldName);

          return (
            <TableCell key={fieldName} to={path}>
              {field && FieldPreviewComponent ? (
                <FieldPreviewComponent
                  collection={collection}
                  field={field}
                  value={value}
                  theme={theme}
                />
              ) : (
                String(value)
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }

  if (PreviewCardComponent) {
    return (
      <Card>
        <CardActionArea to={path}>
          <PreviewCardComponent
            collection={collection}
            fields={fields}
            entry={entry}
            widgetFor={widgetFor}
            widgetsFor={widgetsFor}
            theme={theme}
          />
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card>
      <CardActionArea to={path}>
        {image && imageField ? <CardMedia height="140" image={imageUrl} /> : null}
        <CardContent>{summary}</CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EntryCard;
