import get from 'lodash/get';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { VIEW_STYLE_LIST } from '@staticcms/core/constants/views';
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

import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Collection, Entry, FileOrImageField, MediaField } from '@staticcms/core/interface';

export interface EntryCardProps {
  entry: Entry;
  imageFieldName?: string | null | undefined;
  collection: Collection;
  collectionLabel?: string;
  viewStyle: ViewStyle;
  summaryFields: string[];
}

const EntryCard = ({
  collection,
  entry,
  collectionLabel,
  viewStyle = VIEW_STYLE_LIST,
  imageFieldName,
  summaryFields,
}: EntryCardProps) => {
  const entryData = entry.data;

  const params = useParams();
  const filterTerm = params['*'];

  const path = useMemo(
    () =>
      `/collections/${collection.name}/entries/${entry.slug}${
        filterTerm ? `?path=${filterTerm}` : ''
      }`,
    [collection.name, entry.slug, filterTerm],
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

  const templateName = useMemo(
    () => selectTemplateName(collection, entry.slug),
    [collection, entry.slug],
  );

  const PreviewCardComponent = useMemo(() => getPreviewCard(templateName) ?? null, [templateName]);

  const theme = useAppSelector(selectTheme);

  if (viewStyle === VIEW_STYLE_LIST) {
    return (
      <TableRow
        className="
          hover:bg-gray-200
          dark:hover:bg-slate-700/70
        "
      >
        {collectionLabel ? (
          <TableCell key="collectionLabel" to={path}>
            {collectionLabel}
          </TableCell>
        ) : null}
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
