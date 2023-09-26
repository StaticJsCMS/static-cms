import { Dashboard as DashboardIcon } from '@styled-icons/material/Dashboard';
import React from 'react';

import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectUnpublishedEntriesByStatus } from '@staticcms/core/reducers/selectors/editorialWorkflow';
import { useAppSelector } from '@staticcms/core/store/hooks';
import MainView from '../MainView';
import WorkflowCard from './WorkflowCard';

import type { FC } from 'react';

import './Dashboard.css';

const classes = generateClassNames('Dashboard', [
  'root',
  'header-wrapper',
  'header',
  'header-icon-wrapper',
  'header-icon',
  'header-label',
  'header-description',
  'columns',
  'column-wrapper',
  'column',
  'column-header',
  'column-header-draft',
  'column-header-in-review',
  'column-header-ready',
  'divider',
]);

const Dashboard: FC = () => {
  const t = useTranslate();

  const draftEntries = useAppSelector(selectUnpublishedEntriesByStatus(WorkflowStatus.DRAFT));
  const reviewEntries = useAppSelector(
    selectUnpublishedEntriesByStatus(WorkflowStatus.PENDING_REVIEW),
  );
  const readyEntries = useAppSelector(
    selectUnpublishedEntriesByStatus(WorkflowStatus.PENDING_PUBLISH),
  );

  return (
    <MainView breadcrumbs={[{ name: 'Dashboard' }]} showQuickCreate showLeftNav>
      <div className={classes.root}>
        <div className={classes['header-wrapper']}>
          <h2 className={classes.header}>
            <div className={classes['header-icon-wrapper']}>
              <DashboardIcon className={classes['header-icon']} />
            </div>
            <div className={classes['header-label']}>{t('workflow.workflow.workflowHeading')}</div>
          </h2>
          <div className={classes['header-description']}>
            {t('workflow.workflow.description', {
              smart_count: reviewEntries.length,
              readyCount: readyEntries.length,
            })}
          </div>
        </div>
        <div className={classes.columns}>
          <div className={classes['column-wrapper']}>
            <div className={classNames(classes['column-header'], classes['column-header-draft'])}>
              {t('workflow.workflowList.draftHeader')}
            </div>
            <div className={classes.column}>
              {draftEntries.map(e => (
                <WorkflowCard key={`${e.collection}|${e.slug}`} entry={e} />
              ))}
            </div>
          </div>
          <div className={classes['column-wrapper']}>
            <div
              className={classNames(classes['column-header'], classes['column-header-in-review'])}
            >
              {t('workflow.workflowList.inReviewHeader')}
            </div>
            <div className={classes.column}>
              {reviewEntries.map(e => (
                <WorkflowCard key={`${e.collection}|${e.slug}`} entry={e} />
              ))}
            </div>
          </div>
          <div className={classes['column-wrapper']}>
            <div className={classNames(classes['column-header'], classes['column-header-ready'])}>
              {t('workflow.workflowList.readyHeader')}
            </div>
            <div className={classes.column}>
              {readyEntries.map(e => (
                <WorkflowCard key={`${e.collection}|${e.slug}`} entry={e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainView>
  );
};

export default Dashboard;
