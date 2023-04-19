import { Info as InfoIcon } from '@styled-icons/material-outlined/Info';
import get from 'lodash/get';
import React, { useEffect, useMemo, useState } from 'react';

import { VIEW_STYLE_LIST } from '@staticcms/core/constants/views';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import { getFieldPreview, getPreviewCard } from '@staticcms/core/lib/registry';
import { getEntryBackupKey } from '@staticcms/core/lib/util/backup.util';
import {
  selectEntryCollectionTitle,
  selectFields,
  selectTemplateName,
} from '@staticcms/core/lib/util/collection.util';
import localForage from '@staticcms/core/lib/util/localForage';
import { isNullish } from '@staticcms/core/lib/util/null.util';
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
import type {
  BackupEntry,
  Collection,
  Entry,
  FileOrImageField,
  MediaField,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';

export interface EntryCardProps {
  entry: Entry;
  imageFieldName?: string | null | undefined;
  collection: Collection;
  collectionLabel?: string;
  viewStyle: ViewStyle;
  summaryFields: string[];
}

const EntryCard: FC<TranslatedProps<EntryCardProps>> = ({
  collection,
  entry,
  collectionLabel,
  viewStyle = VIEW_STYLE_LIST,
  imageFieldName,
  summaryFields,
  t,
}) => {
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

  const templateName = useMemo(
    () => selectTemplateName(collection, entry.slug),
    [collection, entry.slug],
  );

  const PreviewCardComponent = useMemo(() => getPreviewCard(templateName) ?? null, [templateName]);

  const theme = useAppSelector(selectTheme);

  const [hasLocalBackup, setHasLocalBackup] = useState(false);
  useEffect(() => {
    let alive = true;

    const checkLocalBackup = async () => {
      const key = getEntryBackupKey(collection.name, entry.slug);
      const backup = await localForage.getItem<BackupEntry>(key);

      if (alive) {
        setHasLocalBackup(Boolean(backup));
      }
    };

    checkLocalBackup();

    // Check again after small delay to ensure we capture the draft just made from the editor
    setTimeout(() => {
      checkLocalBackup();
    }, 250);

    return () => {
      alive = false;
    };
  }, [collection.name, entry.slug]);

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
              ) : isNullish(value) ? (
                ''
              ) : (
                String(value)
              )}
            </TableCell>
          );
        })}
        <TableCell key="unsavedChanges" to={path} shrink>
          {hasLocalBackup ? (
            <InfoIcon
              className="
                w-5
                h-5
                text-blue-600
                dark:text-blue-300
              "
              title={t('ui.localBackup.hasLocalBackup')}
            />
          ) : null}
        </TableCell>
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
            hasLocalBackup={hasLocalBackup}
          />
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card>
      <CardActionArea to={path}>
        {image && imageField ? <CardMedia height="140" image={imageUrl} /> : null}
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <div>{summary}</div>
            {hasLocalBackup ? (
              <InfoIcon
                className="
                  w-5
                  h-5
                  text-blue-600
                  dark:text-blue-300
                "
                title={t('ui.localBackup.hasLocalBackup')}
              />
            ) : null}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EntryCard;
