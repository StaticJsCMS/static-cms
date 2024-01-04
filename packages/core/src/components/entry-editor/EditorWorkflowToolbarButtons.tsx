import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useMemo } from 'react';

import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import Button from '../common/button/Button';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';
import Pill from '../common/pill/Pill';

import type { FC } from 'react';
import type { PillProps } from '../common/pill/Pill';

import './EditorWorkflowToolbarButtons.css';

const classes = generateClassNames('EditorWorkflowToolbarButtons', ['not-checked', 'status-label']);

export interface EditorWorkflowToolbarButtonsProps {
  hasChanged: boolean;
  isPersisting: boolean;
  onPersist: () => void;
  currentStatus: WorkflowStatus | undefined;
  isUpdatingStatus: boolean;
  onChangeStatus: (status: WorkflowStatus) => void;
  disabled: boolean;
  isLoading: boolean;
  mobile?: boolean;
  useOpenAuthoring: boolean;
}

const EditorWorkflowToolbarButtons: FC<EditorWorkflowToolbarButtonsProps> = ({
  hasChanged,
  isPersisting,
  onPersist,
  currentStatus,
  isUpdatingStatus,
  onChangeStatus,
  disabled,
  isLoading,
  mobile,
  useOpenAuthoring,
}) => {
  const t = useTranslate();

  const statusToTranslation = useMemo(
    () => ({
      [WorkflowStatus.DRAFT]: t('editor.editorToolbar.draft'),
      [WorkflowStatus.PENDING_REVIEW]: t('editor.editorToolbar.inReview'),
      [WorkflowStatus.PENDING_PUBLISH]: t('editor.editorToolbar.ready'),
    }),
    [t],
  );

  const statusToPillColor: Record<WorkflowStatus, PillProps['color']> = useMemo(
    () => ({
      [WorkflowStatus.DRAFT]: 'info',
      [WorkflowStatus.PENDING_REVIEW]: 'warning',
      [WorkflowStatus.PENDING_PUBLISH]: 'success',
    }),
    [],
  );

  const handleSave = useCallback(() => {
    if (!hasChanged) {
      return;
    }

    onPersist();
  }, [hasChanged, onPersist]);

  return (
    <>
      {currentStatus ? (
        useOpenAuthoring ? (
          <>
            <Pill className={classes['status-label']} color={statusToPillColor[currentStatus]}>
              {statusToTranslation[currentStatus]}
            </Pill>
            {currentStatus === WorkflowStatus.DRAFT ? (
              <Button
                variant="outlined"
                color="warning"
                onClick={() => onChangeStatus(WorkflowStatus.PENDING_REVIEW)}
              >
                {t('workflow.openAuthoring.markReadyForReview')}
              </Button>
            ) : null}
          </>
        ) : (
          <Menu
            label={
              isUpdatingStatus
                ? t('editor.editorToolbar.updating')
                : isLoading
                  ? t('app.app.loading')
                  : t('editor.editorToolbar.status', { status: statusToTranslation[currentStatus] })
            }
            color="secondary"
            disabled={disabled}
            aria-label="change status options dropdown"
          >
            <MenuGroup>
              <MenuItemButton
                onClick={() => onChangeStatus(WorkflowStatus.DRAFT)}
                startIcon={currentStatus === WorkflowStatus.DRAFT ? CheckIcon : undefined}
                contentClassName={
                  currentStatus !== WorkflowStatus.DRAFT ? classes['not-checked'] : ''
                }
              >
                {statusToTranslation[WorkflowStatus.DRAFT]}
              </MenuItemButton>
              <MenuItemButton
                onClick={() => onChangeStatus(WorkflowStatus.PENDING_REVIEW)}
                startIcon={currentStatus === WorkflowStatus.PENDING_REVIEW ? CheckIcon : undefined}
                contentClassName={
                  currentStatus !== WorkflowStatus.PENDING_REVIEW ? classes['not-checked'] : ''
                }
              >
                {statusToTranslation[WorkflowStatus.PENDING_REVIEW]}
              </MenuItemButton>
              <MenuItemButton
                onClick={() => onChangeStatus(WorkflowStatus.PENDING_PUBLISH)}
                startIcon={currentStatus === WorkflowStatus.PENDING_PUBLISH ? CheckIcon : undefined}
                contentClassName={
                  currentStatus !== WorkflowStatus.PENDING_PUBLISH ? classes['not-checked'] : ''
                }
              >
                {statusToTranslation[WorkflowStatus.PENDING_PUBLISH]}
              </MenuItemButton>
            </MenuGroup>
          </Menu>
        )
      ) : mobile ? (
        <div />
      ) : null}
      <Button
        disabled={!hasChanged || disabled}
        onClick={handleSave}
        color={hasChanged ? 'primary' : 'secondary'}
        variant={hasChanged ? 'contained' : 'outlined'}
        aria-label="save unpublished entry"
      >
        {isPersisting ? t('editor.editorToolbar.saving') : t('editor.editorToolbar.save')}
      </Button>
    </>
  );
};

export default EditorWorkflowToolbarButtons;
