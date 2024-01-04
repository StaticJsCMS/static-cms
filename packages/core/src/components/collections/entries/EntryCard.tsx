import { Info as InfoIcon } from '@styled-icons/material-outlined/Info';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import React, { useEffect, useMemo, useState } from 'react';

import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { getPreviewCard } from '@staticcms/core/lib/registry';
import { getEntryBackupKey } from '@staticcms/core/lib/util/backup.util';
import classNames from '@staticcms/core/lib/util/classNames.util';
import {
  getFields,
  selectEntryCollectionTitle,
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
import WorkflowStatusPill from '../../workflow/WorkflowStatusPill';

import type {
  BackupEntry,
  CollectionWithDefaults,
  DateTimeFormats,
  Entry,
  FileOrImageField,
} from '@staticcms/core';
import type { FC, ReactNode } from 'react';

import './EntryCard.css';

export const classes = generateClassNames('EntryCard', [
  'root',
  'no-margin',
  'content-wrapper',
  'content',
  'card',
  'card-content',
  'summary-wrapper',
  'summary',
  'description',
  'date',
  'local-backup-icon',
  'workflow-status',
]);

export interface EntryCardProps {
  entry: Entry;
  imageFieldName: string | null | undefined;
  descriptionFieldName: string | null | undefined;
  dateFieldName: string | null | undefined;
  dateFormats: DateTimeFormats | undefined;
  collection: CollectionWithDefaults;
  noMargin?: boolean;
  backTo?: string;
  children?: ReactNode;
  useWorkflow: boolean;
}

const EntryCard: FC<EntryCardProps> = ({
  collection,
  entry,
  imageFieldName,
  descriptionFieldName,
  dateFieldName,
  dateFormats,
  noMargin = false,
  backTo,
  children,
  useWorkflow,
}) => {
  const t = useTranslate();

  const entryData = entry.data;

  const path = useMemo(
    () =>
      `/collections/${collection.name}/entries/${entry.slug}${backTo ? `?backTo=${backTo}` : ''}`,
    [backTo, collection.name, entry.slug],
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
      i = i.trim();
    }

    return i;
  }, [entryData, imageFieldName]);

  const description = useMemo(() => {
    let d = descriptionFieldName
      ? (entryData?.[descriptionFieldName] as string | undefined)
      : undefined;

    if (d) {
      d = d.trim();
    }

    return d;
  }, [entryData, descriptionFieldName]);

  const date = useMemo(() => {
    let d = dateFieldName ? (entryData?.[dateFieldName] as string | undefined) : undefined;

    if (d && dateFormats) {
      const date = parse(d, dateFormats.storageFormat, new Date());
      if (!isNaN(date.getTime())) {
        d = format(date, dateFormats.displayFormat);
      }
    }

    return d;
  }, [dateFieldName, entryData, dateFormats]);

  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);

  const fields = useMemo(() => getFields(collection, entry.slug), [collection, entry.slug]);

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
      <div className={classNames(classes.root, noMargin && classes['no-margin'])}>
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
              {children}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(classes.root, noMargin && classes['no-margin'])}>
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
                  <div className={classes['summary-wrapper']}>
                    <div className={classes['summary']}>{summary}</div>
                    {hasLocalBackup ? (
                      <InfoIcon
                        className={classes['local-backup-icon']}
                        title={t('ui.localBackup.hasLocalBackup')}
                      />
                    ) : null}
                    {useWorkflow ? (
                      <WorkflowStatusPill
                        status={entry.status}
                        className={classes['workflow-status']}
                      />
                    ) : null}
                  </div>
                  {description ? <div className={classes.description}>{description}</div> : null}
                  {date ? <div className={classes.date}>{String(date)}</div> : null}
                </div>
              </CardContent>
            </CardActionArea>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
