import { Check as CheckIcon } from '@styled-icons/material/Check';
import React, { useCallback, useMemo } from 'react';

import { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import useTranslate from '@staticcms/core/lib/hooks/useTranslate';
import Button from '../common/button/Button';
import Menu from '../common/menu/Menu';
import MenuGroup from '../common/menu/MenuGroup';
import MenuItemButton from '../common/menu/MenuItemButton';

import type { FC } from 'react';

export interface EditorWorkflowToolbarButtonsProps {
  hasChanged: boolean;
  isPersisting: boolean;
  onPersist: () => void;
  currentStatus: WorkflowStatus | undefined;
  isUpdatingStatus: boolean;
  onChangeStatus: (status: WorkflowStatus) => void;
}

const EditorWorkflowToolbarButtons: FC<EditorWorkflowToolbarButtonsProps> = ({
  hasChanged,
  isPersisting,
  onPersist,
  currentStatus,
  isUpdatingStatus,
  onChangeStatus,
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

  const handleSave = useCallback(() => {
    if (!hasChanged) {
      return;
    }

    onPersist();
  }, [hasChanged, onPersist]);

  return (
    <>
      {currentStatus ? (
        <Menu
          label={
            isUpdatingStatus
              ? t('editor.editorToolbar.updating')
              : t('editor.editorToolbar.status', { status: statusToTranslation[currentStatus] })
          }
          color="secondary"
          disabled={isUpdatingStatus}
          aria-label="change status options dropdown"
        >
          <MenuGroup>
            <MenuItemButton
              onClick={() => onChangeStatus(WorkflowStatus.DRAFT)}
              startIcon={currentStatus === WorkflowStatus.DRAFT ? CheckIcon : undefined}
            >
              {statusToTranslation[WorkflowStatus.DRAFT]}
            </MenuItemButton>
            <MenuItemButton
              onClick={() => onChangeStatus(WorkflowStatus.PENDING_REVIEW)}
              startIcon={currentStatus === WorkflowStatus.PENDING_REVIEW ? CheckIcon : undefined}
            >
              {statusToTranslation[WorkflowStatus.PENDING_REVIEW]}
            </MenuItemButton>
            <MenuItemButton
              onClick={() => onChangeStatus(WorkflowStatus.PENDING_PUBLISH)}
              startIcon={currentStatus === WorkflowStatus.PENDING_PUBLISH ? CheckIcon : undefined}
            >
              {statusToTranslation[WorkflowStatus.PENDING_PUBLISH]}
            </MenuItemButton>
          </MenuGroup>
        </Menu>
      ) : null}
      <Button
        disabled={!hasChanged}
        onClick={handleSave}
        color={hasChanged ? 'primary' : 'secondary'}
        variant={hasChanged ? 'contained' : 'outlined'}
      >
        {isPersisting ? t('editor.editorToolbar.saving') : t('editor.editorToolbar.save')}
      </Button>
    </>
  );
};

export default EditorWorkflowToolbarButtons;
