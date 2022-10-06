import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';

import { Icon, colorsRaw, colors, components, buttons, zIndex } from '../../ui';
import { SettingsDropdown } from '../UI';

const styles = {
  noOverflow: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  buttonMargin: css`
    margin: 0 10px;
  `,
  toolbarSection: css`
    height: 100%;
    display: flex;
    align-items: center;
    border: 0 solid ${colors.textFieldBorder};
  `,
  publishedButton: css`
    background-color: ${colorsRaw.tealLight};
    color: ${colorsRaw.teal};
  `,
};

const TooltipText = styled.div`
  visibility: hidden;
  width: 321px;
  background-color: #555;
  color: #fff;
  text-align: unset;
  border-radius: 6px;
  padding: 5px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  top: 145%;
  left: 50%;
  margin-left: -320px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  &:hover + ${TooltipText} {
    visibility: visible;
    opacity: 0.9;
  }
`;

const TooltipContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled(StyledDropdownButton)`
  ${styles.noOverflow}
  @media (max-width: 1200px) {
    padding-left: 10px;
  }
`;

const ToolbarContainer = styled.div`
  box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.05), 0 1px 3px 0 rgba(68, 74, 87, 0.1),
    0 2px 54px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  z-index: ${zIndex.zIndex300};
  background-color: #fff;
  height: 66px;
  display: flex;
  justify-content: space-between;
`;

const ToolbarSectionMain = styled.div`
  ${styles.toolbarSection};
  flex: 10;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const ToolbarSubSectionFirst = styled.div`
  display: flex;
  align-items: center;
`;

const ToolbarSectionBackLink = styled(Link)`
  ${styles.toolbarSection};
  border-right-width: 1px;
  font-weight: normal;
  padding: 0 20px;

  &:hover,
  &:focus {
    background-color: #f1f2f4;
  }
`;

const ToolbarSectionMeta = styled.div`
  ${styles.toolbarSection};
  border-left-width: 1px;
  padding: 0 7px;
`;

const ToolbarDropdown = styled(Dropdown)`
  ${styles.buttonMargin};

  ${Icon} {
    color: ${colorsRaw.teal};
  }
`;

const BackArrow = styled.div`
  color: ${colors.textLead};
  font-size: 21px;
  font-weight: 600;
  margin-right: 16px;
`;

const BackCollection = styled.div`
  color: ${colors.textLead};
  font-size: 14px;
`;

const BackStatus = styled.div`
  margin-top: 6px;
`;

const BackStatusUnchanged = styled(BackStatus)`
  ${components.textBadgeSuccess};
`;

const BackStatusChanged = styled(BackStatus)`
  ${components.textBadgeDanger};
`;

const ToolbarButton = styled.button`
  ${buttons.button};
  ${buttons.default};
  ${styles.buttonMargin};
  ${styles.noOverflow};
  display: block;

  @media (max-width: 1200px) {
    padding: 0 10px;
  }
`;

const DeleteButton = styled(ToolbarButton)`
  ${buttons.lightRed};
`;

const PublishedToolbarButton = styled(DropdownButton)`
  ${styles.publishedButton}
`;

const PublishedButton = styled(ToolbarButton)`
  ${styles.publishedButton}
`;

const PublishButton = styled(DropdownButton)`
  background-color: ${colorsRaw.teal};
`;

class EditorToolbar extends React.Component {
  static propTypes = {
    isPersisting: PropTypes.bool,
    isPublishing: PropTypes.bool,
    isUpdatingStatus: PropTypes.bool,
    isDeleting: PropTypes.bool,
    onPersist: PropTypes.func.isRequired,
    onPersistAndNew: PropTypes.func.isRequired,
    onPersistAndDuplicate: PropTypes.func.isRequired,
    showDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onPublishAndNew: PropTypes.func.isRequired,
    onPublishAndDuplicate: PropTypes.func.isRequired,
    user: PropTypes.object,
    hasChanged: PropTypes.bool,
    displayUrl: PropTypes.string,
    collection: ImmutablePropTypes.map.isRequired,
    isNewEntry: PropTypes.bool,
    isModification: PropTypes.bool,
    currentStatus: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    editorBackLink: PropTypes.string.isRequired,
  };

  renderSimpleControls = () => {
    const { collection, hasChanged, isNewEntry, showDelete, onDelete, t } = this.props;
    const canCreate = collection.create;

    return (
      <>
        {!isNewEntry && !hasChanged
          ? this.renderExistingEntrySimplePublishControls({ canCreate })
          : this.renderNewEntrySimplePublishControls({ canCreate })}
        <div>
          {showDelete ? (
            <DeleteButton key="delete-button" onClick={onDelete}>
              {t('editor.editorToolbar.deleteEntry')}
            </DeleteButton>
          ) : null}
        </div>
      </>
    );
  };

  renderStatusInfoTooltip = () => {
    const { t, currentStatus } = this.props;

    const statusToLocaleKey = {
      [status.DRAFT]: 'statusInfoTooltipDraft',
      [status.PENDING_REVIEW]: 'statusInfoTooltipInReview',
    };

    const statusKey = Object.keys(statusToLocaleKey).find(key => key === currentStatus);
    return (
      <TooltipContainer>
        <Tooltip>
          <Icon type="info-circle" size="small" className="tooltip" />
        </Tooltip>
        {statusKey && (
          <TooltipText key="status-tooltip">
            {t(`editor.editorToolbar.${statusToLocaleKey[statusKey]}`)}
          </TooltipText>
        )}
      </TooltipContainer>
    );
  };

  renderExistingEntrySimplePublishControls = ({ canCreate }) => {
    const { onDuplicate, t } = this.props;
    return canCreate ? (
      <ToolbarDropdown
        key="simple-existing-publish-controls"
        dropdownTopOverlap="40px"
        dropdownWidth="150px"
        renderButton={() => (
          <PublishedToolbarButton>{t('editor.editorToolbar.published')}</PublishedToolbarButton>
        )}
      >
        {
          <DropdownItem
            label={t('editor.editorToolbar.duplicate')}
            icon="add"
            onClick={onDuplicate}
          />
        }
      </ToolbarDropdown>
    ) : (
      <PublishedButton>{t('editor.editorToolbar.published')}</PublishedButton>
    );
  };

  renderNewEntrySimplePublishControls = ({ canCreate }) => {
    const { onPersist, onPersistAndNew, onPersistAndDuplicate, isPersisting, t } = this.props;

    return (
      <div key="simple-new-publish-controls">
        <ToolbarDropdown
          dropdownTopOverlap="40px"
          dropdownWidth="150px"
          renderButton={() => (
            <PublishButton>
              {isPersisting
                ? t('editor.editorToolbar.publishing')
                : t('editor.editorToolbar.publish')}
            </PublishButton>
          )}
        >
          <DropdownItem
            label={t('editor.editorToolbar.publishNow')}
            icon="arrow"
            iconDirection="right"
            onClick={onPersist}
          />
          {canCreate ? (
            <>
              <DropdownItem
                label={t('editor.editorToolbar.publishAndCreateNew')}
                icon="add"
                onClick={onPersistAndNew}
              />
              <DropdownItem
                label={t('editor.editorToolbar.publishAndDuplicate')}
                icon="add"
                onClick={onPersistAndDuplicate}
              />
            </>
          ) : null}
        </ToolbarDropdown>
      </div>
    );
  };

  render() {
    const { user, hasChanged, displayUrl, collection, onLogoutClick, t, editorBackLink } =
      this.props;

    return (
      <ToolbarContainer>
        <ToolbarSectionBackLink to={editorBackLink}>
          <BackArrow>←</BackArrow>
          <div>
            <BackCollection>
              {t('editor.editorToolbar.backCollection', {
                collectionLabel: collection.label,
              })}
            </BackCollection>
            {hasChanged ? (
              <BackStatusChanged key="back-changed">
                {t('editor.editorToolbar.unsavedChanges')}
              </BackStatusChanged>
            ) : (
              <BackStatusUnchanged key="back-unchanged">
                {t('editor.editorToolbar.changesSaved')}
              </BackStatusUnchanged>
            )}
          </div>
        </ToolbarSectionBackLink>
        <ToolbarSectionMain>
          <ToolbarSubSectionFirst>{this.renderSimpleControls()}</ToolbarSubSectionFirst>
        </ToolbarSectionMain>
        <ToolbarSectionMeta>
          <SettingsDropdown
            displayUrl={displayUrl}
            imageUrl={user?.avatar_url}
            onLogoutClick={onLogoutClick}
          />
        </ToolbarSectionMeta>
      </ToolbarContainer>
    );
  }
}

export default translate()(EditorToolbar);
