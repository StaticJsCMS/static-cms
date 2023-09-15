import { Info as InfoIcon } from '@styled-icons/material-outlined/Info';
import React, { useEffect, useMemo, useState } from 'react';

import { getPreviewCard } from '@staticcms/core/lib/registry';
import { getEntryBackupKey } from '@staticcms/core/lib/util/backup.util';
import {
  selectEntryCollectionTitle,
  selectFields,
  selectTemplateName,
} from '@staticcms/core/lib/util/collection.util';
import localForage from '@staticcms/core/lib/util/localForage';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import Card from '../../common/card/Card';
import CardActionArea from '../../common/card/CardActionArea';
import CardContent from '../../common/card/CardContent';
import CardMedia from '../../common/card/CardMedia';
import useWidgetsFor from '../../common/widget/useWidgetsFor';

import type {
  BackupEntry,
  Collection,
  Entry,
  FileOrImageField,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';

import './EntryCard.css';

export const classes = generateClassNames('EntryCard', [
  'root',
  'content-wrapper',
  'content',
  'card',
  'card-content',
  'card-summary',
  'local-backup-icon',
]);

export interface EntryCardProps {
  entry: Entry;
  imageFieldName?: string | null | undefined;
  collection: Collection;
}

const EntryCard: FC<TranslatedProps<EntryCardProps>> = ({
  collection,
  entry,
  imageFieldName,
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

  const config = useAppSelector(selectConfig);

  const { widgetFor, widgetsFor } = useWidgetsFor(config, collection, fields, entry);

  const templateName = useMemo(
    () => selectTemplateName(collection, entry.slug),
    [collection, entry.slug],
  );

  const PreviewCardComponent = useMemo(
    () => getPreviewCard(templateName)?.component ?? null,
    [templateName],
  );

  const [hasLocalBackup, setHasLocalBackup] = useState(false);
  useEffect(() => {
    if (config?.disable_local_backup) {
      return;
    }

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
  }, [collection.name, config?.disable_local_backup, entry.slug]);

  if (PreviewCardComponent) {
    return (
      <div className={classes.root}>
        <div className={classes['content-wrapper']}>
          <div className={classes.content}>
            <Card>
              <CardActionArea to={path}>
                <PreviewCardComponent
                  collection={collection}
                  fields={fields}
                  entry={entry}
                  widgetFor={widgetFor}
                  widgetsFor={widgetsFor}
                  hasLocalBackup={hasLocalBackup}
                />
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes['content-wrapper']}>
        <div className={classes.content}>
          <Card className={classes.card} title={summary}>
            <CardActionArea to={path}>
              {image && imageField ? (
                <CardMedia
                  height="140"
                  image={image}
                  collection={collection}
                  field={imageField}
                  entry={entry}
                />
              ) : null}
              <CardContent>
                <div className={classes['card-content']}>
                  <div className={classes['card-summary']}>{summary}</div>
                  {hasLocalBackup ? (
                    <InfoIcon
                      className={classes['local-backup-icon']}
                      title={t('ui.localBackup.hasLocalBackup')}
                    />
                  ) : null}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
