import { DragHandle as DragHandleIcon } from '@styled-icons/material/DragHandle';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ScrollSyncPane } from 'react-scroll-sync';

import { EDITOR_SIZE_COMPACT } from '@staticcms/core/constants/views';
import { summaryFormatter } from '@staticcms/core/lib/formatters';
import useBreadcrumbs from '@staticcms/core/lib/hooks/useBreadcrumbs';
import { useIsSmallScreen } from '@staticcms/core/lib/hooks/useMediaQuery';
import { getI18nInfo, getPreviewEntry, hasI18n } from '@staticcms/core/lib/i18n';
import classNames from '@staticcms/core/lib/util/classNames.util';
import {
  getFileFromSlug,
  selectEntryCollectionTitle,
} from '@staticcms/core/lib/util/collection.util';
import { customPathFromSlug } from '@staticcms/core/lib/util/nested.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { selectConfig, selectUseWorkflow } from '@staticcms/core/reducers/selectors/config';
import { selectIsFetching } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import MainView from '../MainView';
import EditorToolbar from './EditorToolbar';
import EditorWorkflowToolbarButtons from './EditorWorkflowToolbarButtons';
import EditorControlPane from './editor-control-pane/EditorControlPane';
import EditorPreviewPane from './editor-preview-pane/EditorPreviewPane';

import type { WorkflowStatus } from '@staticcms/core/constants/publishModes';
import type {
  Collection,
  EditorPersistOptions,
  Entry,
  Field,
  FieldsErrors,
} from '@staticcms/core/interface';
import type { FC } from 'react';

import './EditorInterface.css';

export const classes = generateClassNames('Editor', [
  'root',
  'default',
  'i18n',
  'i18n-panel',
  'i18n-active',
  'split-view',
  'wrapper-preview',
  'wrapper-i18n-side-by-side',
  'compact',
  'toolbar',
  'content',
  'content-wrapper',
  'resize-handle',
  'resize-handle-icon',
  'mobile-root',
  'workflow',
  'mobile-preview',
  'mobile-preview-active',
  'mobile-workflow-controls',
]);

const COMPACT_EDITOR_DEFAULT_WIDTH = 450;
const MIN_PREVIEW_SIZE = 300;

const PREVIEW_VISIBLE = 'cms.preview-visible';
const I18N_VISIBLE = 'cms.i18n-visible';

interface EditorContentProps {
  i18nActive: boolean;
  previewActive: boolean;
  editor: JSX.Element;
  editorSideBySideLocale: JSX.Element;
  editorWithPreview: JSX.Element;
}

const EditorContent: FC<EditorContentProps> = ({
  i18nActive,
  previewActive,
  editor,
  editorSideBySideLocale,
  editorWithPreview,
}) => {
  if (i18nActive) {
    return editorSideBySideLocale;
  } else if (previewActive) {
    return editorWithPreview;
  } else {
    return (
      <div className={classes['content-wrapper']}>
        <div className={classes.content}>{editor}</div>
      </div>
    );
  }
};

interface EditorInterfaceProps {
  draftKey: string;
  entry: Entry;
  collection: Collection;
  fields: Field[] | undefined;
  fieldsErrors: FieldsErrors;
  onPersist: (opts?: EditorPersistOptions) => void;
  onDelete: () => Promise<void>;
  onDuplicate: () => void;
  hasChanged: boolean;
  isNewEntry: boolean;
  isModification: boolean;
  toggleScroll: () => Promise<void>;
  scrollSyncActive: boolean;
  loadScroll: () => void;
  submitted: boolean;
  slug: string | undefined;
  onDiscardDraft: () => void;
  currentStatus: WorkflowStatus | undefined;
  isUpdatingStatus: boolean;
  onChangeStatus: (status: WorkflowStatus) => void;
  hasUnpublishedChanges: boolean;
  isPublishing: boolean;
  onPublish: (opts?: EditorPersistOptions) => Promise<void>;
  onUnPublish: () => Promise<void>;
  onDeleteUnpublishedChanges: () => Promise<void>;
}

const EditorInterface: FC<EditorInterfaceProps> = ({
  collection,
  entry,
  fields = [],
  fieldsErrors,
  onDelete,
  onDuplicate,
  onPersist,
  hasChanged,
  isNewEntry,
  isModification,
  draftKey,
  scrollSyncActive,
  loadScroll,
  toggleScroll,
  submitted,
  slug,
  onDiscardDraft,
  currentStatus,
  isUpdatingStatus,
  onChangeStatus,
  hasUnpublishedChanges,
  isPublishing,
  onPublish,
  onUnPublish,
  onDeleteUnpublishedChanges,
}) => {
  const config = useAppSelector(selectConfig);
  const useWorkflow = useAppSelector(selectUseWorkflow);

  const isSmallScreen = useIsSmallScreen();

  const isLoading = useAppSelector(selectIsFetching);
  const disabled = useMemo(
    () =>
      Boolean(
        isLoading || entry.isPersisting || isPublishing || isUpdatingStatus || entry.isDeleting,
      ),
    [entry.isDeleting, entry.isPersisting, isLoading, isPublishing, isUpdatingStatus],
  );

  const { locales, default_locale } = useMemo(() => getI18nInfo(collection), [collection]) ?? {};
  const translatedLocales = useMemo(
    () => (isSmallScreen ? locales : locales?.filter(locale => locale !== default_locale)) ?? [],
    [isSmallScreen, locales, default_locale],
  );

  const [previewActive, setPreviewActive] = useState(
    localStorage.getItem(PREVIEW_VISIBLE) !== 'false',
  );

  const i18nEnabled = useMemo(() => locales && locales.length > 0, [locales]);

  const [i18nActive, setI18nActive] = useState(
    Boolean(localStorage.getItem(I18N_VISIBLE) !== 'false' && i18nEnabled),
  );

  const [selectedLocale, setSelectedLocale] = useState<string>(
    (i18nActive ? translatedLocales?.[0] : default_locale) ?? 'en',
  );

  useEffect(() => {
    setSelectedLocale((i18nActive ? translatedLocales?.[0] : default_locale) ?? 'en');
  }, [default_locale, i18nActive, translatedLocales]);

  useEffect(() => {
    loadScroll();
  }, [loadScroll]);

  const handleOnPersist = useCallback(
    async (opts: EditorPersistOptions = {}) => {
      const { createNew = false, duplicate = false } = opts;
      onPersist({ createNew, duplicate });
    },
    [onPersist],
  );

  const handleOnPublish = useCallback(
    async (opts: EditorPersistOptions = {}) => {
      const { createNew = false, duplicate = false } = opts;
      onPublish({ createNew, duplicate });
    },
    [onPublish],
  );

  const handleToggleScrollSync = useCallback(() => {
    toggleScroll();
  }, [toggleScroll]);

  const handleToggleI18n = useCallback(() => {
    const newI18nActive = !i18nActive;
    setI18nActive(newI18nActive);
    setSelectedLocale(selectedLocale =>
      newI18nActive && selectedLocale === default_locale ? translatedLocales?.[0] : selectedLocale,
    );
    localStorage.setItem(I18N_VISIBLE, `${newI18nActive}`);
  }, [i18nActive, setSelectedLocale, translatedLocales, default_locale]);

  const handleTogglePreview = useCallback(() => {
    let newPreviewActive = true;
    if (i18nActive) {
      handleToggleI18n();
    } else {
      newPreviewActive = !previewActive;
    }

    setPreviewActive(newPreviewActive);
    localStorage.setItem(PREVIEW_VISIBLE, `${newPreviewActive}`);
  }, [handleToggleI18n, i18nActive, previewActive]);

  const handleLocaleChange = useCallback((locale: string) => {
    setSelectedLocale(locale);
  }, []);

  const { livePreviewUrlTemplate, showPreviewToggle, previewInFrame, editorSize } = useMemo(() => {
    let livePreviewUrlTemplate =
      typeof collection.editor?.live_preview === 'string' ? collection.editor.live_preview : false;

    let preview = true;
    let frame = true;
    let size = collection.editor?.size ?? EDITOR_SIZE_COMPACT;

    if (collection.editor) {
      if ('preview' in collection.editor) {
        preview = collection.editor.preview ?? true;
      }

      if ('frame' in collection.editor) {
        frame = collection.editor.frame ?? true;
      }
    }

    if ('files' in collection) {
      const file = getFileFromSlug(collection, entry.slug);

      if (file?.editor) {
        if (typeof file.editor.live_preview === 'string') {
          livePreviewUrlTemplate = file.editor.live_preview;
        }

        if ('preview' in file.editor && file.editor.preview !== undefined) {
          preview = file.editor.preview;
        }

        if ('frame' in file.editor && file.editor.frame !== undefined) {
          frame = file.editor.frame;
        }

        if (file?.editor?.size !== undefined) {
          size = file.editor.size;
        }
      }
    }

    return {
      livePreviewUrlTemplate: livePreviewUrlTemplate
        ? summaryFormatter(livePreviewUrlTemplate, entry, collection, config?.slug)
        : undefined,
      showPreviewToggle: preview,
      previewInFrame: frame,
      editorSize: size,
    };
  }, [collection, config?.slug, entry]);

  const finalPreviewActive = useMemo(
    () => showPreviewToggle && previewActive,
    [previewActive, showPreviewToggle],
  );

  const collectHasI18n = hasI18n(collection);

  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const toggleMobilePreview = useCallback(() => {
    if (!previewActive) {
      handleTogglePreview();
    }

    setShowMobilePreview(old => !old);
  }, [handleTogglePreview, previewActive]);

  const editor = useMemo(
    () => (
      <div
        key={default_locale}
        id="control-pane"
        className={classNames(
          classes.default,
          (finalPreviewActive || i18nActive) && `${classes['split-view']} CMS_Scrollbar_root`,
        )}
      >
        <EditorControlPane
          collection={collection}
          entry={entry}
          fields={fields}
          fieldsErrors={fieldsErrors}
          locale={i18nActive ? default_locale : selectedLocale}
          submitted={submitted}
          hideBorder={!finalPreviewActive && !i18nActive}
          canChangeLocale={i18nEnabled && !i18nActive}
          onLocaleChange={handleLocaleChange}
          slug={slug}
          disabled={disabled}
        />
      </div>
    ),
    [
      default_locale,
      finalPreviewActive,
      i18nActive,
      collection,
      entry,
      fields,
      fieldsErrors,
      selectedLocale,
      submitted,
      i18nEnabled,
      handleLocaleChange,
      slug,
      disabled,
    ],
  );

  const editorLocale = useMemo(
    () =>
      locales
        ?.filter(l => l !== default_locale)
        .map(locale => (
          <div
            key={locale}
            className={classNames(
              classes.i18n,
              selectedLocale === locale && classes['i18n-active'],
            )}
          >
            <EditorControlPane
              collection={collection}
              entry={entry}
              fields={fields}
              fieldsErrors={fieldsErrors}
              locale={locale}
              onLocaleChange={handleLocaleChange}
              submitted={submitted}
              canChangeLocale
              context="i18nSplit"
              hideBorder
              disabled={disabled}
            />
          </div>
        )),
    [
      locales,
      default_locale,
      selectedLocale,
      collection,
      entry,
      fields,
      fieldsErrors,
      handleLocaleChange,
      submitted,
      disabled,
    ],
  );

  const previewEntry = useMemo(
    () =>
      collectHasI18n ? getPreviewEntry(collection, entry, selectedLocale, default_locale) : entry,
    [collectHasI18n, collection, default_locale, entry, selectedLocale],
  );

  const mobilePreview = (
    <div className={classes['mobile-preview']}>
      <EditorPreviewPane
        collection={collection}
        previewInFrame={previewInFrame}
        livePreviewUrlTemplate={livePreviewUrlTemplate}
        entry={previewEntry}
        fields={fields}
        editorSize={editorSize}
        showMobilePreview={showMobilePreview}
      />
    </div>
  );

  const mobileLocaleEditor = useMemo(
    () =>
      isSmallScreen ? (
        <div key={selectedLocale} className={classes.i18n}>
          <EditorControlPane
            collection={collection}
            entry={entry}
            fields={fields}
            fieldsErrors={fieldsErrors}
            locale={selectedLocale}
            onLocaleChange={handleLocaleChange}
            allowDefaultLocale
            submitted={submitted}
            canChangeLocale
            hideBorder
            disabled={disabled}
          />
        </div>
      ) : null,
    [
      collection,
      disabled,
      entry,
      fields,
      fieldsErrors,
      handleLocaleChange,
      isSmallScreen,
      selectedLocale,
      submitted,
    ],
  );

  const editorWithPreview = (
    <>
      {!isSmallScreen ? (
        <PanelGroup
          key="editor-with-preview"
          autoSaveId={`editor-with-preview-${collection.name}`}
          direction="horizontal"
          units="pixels"
          className={classNames(
            classes.root,
            editorSize === EDITOR_SIZE_COMPACT && classes.compact,
          )}
        >
          <Panel defaultSize={COMPACT_EDITOR_DEFAULT_WIDTH} minSize={COMPACT_EDITOR_DEFAULT_WIDTH}>
            <ScrollSyncPane>{editor}</ScrollSyncPane>
          </Panel>
          <PanelResizeHandle className={classes['resize-handle']}>
            <DragHandleIcon className={classes['resize-handle-icon']} />
          </PanelResizeHandle>
          <Panel minSize={MIN_PREVIEW_SIZE}>
            <EditorPreviewPane
              collection={collection}
              previewInFrame={previewInFrame}
              livePreviewUrlTemplate={livePreviewUrlTemplate}
              entry={previewEntry}
              fields={fields}
              editorSize={editorSize}
              showMobilePreview={showMobilePreview}
            />
          </Panel>
        </PanelGroup>
      ) : (
        <div
          className={classNames(
            classes['mobile-root'],
            showMobilePreview && classes['mobile-preview-active'],
            useWorkflow && classes.workflow,
          )}
        >
          {editor}
          {mobilePreview}
        </div>
      )}
    </>
  );

  const editorSideBySideLocale = (
    <>
      {!isSmallScreen ? (
        <PanelGroup
          key="editor-side-by-side-locale"
          autoSaveId={`editor-side-by-side-locale-${collection.name}`}
          direction="horizontal"
          className={classNames(classes.root, classes['wrapper-i18n-side-by-side'])}
        >
          <Panel defaultSize={50} minSize={30}>
            <ScrollSyncPane>{editor}</ScrollSyncPane>
          </Panel>
          <PanelResizeHandle className={classes['resize-handle']}>
            <DragHandleIcon className={classes['resize-handle-icon']} />
          </PanelResizeHandle>
          <Panel defaultSize={50} minSize={30} className={classes['i18n-panel']}>
            <ScrollSyncPane>
              <>{editorLocale}</>
            </ScrollSyncPane>
          </Panel>
        </PanelGroup>
      ) : (
        <div
          className={classNames(
            classes['mobile-root'],
            showMobilePreview && classes['mobile-preview-active'],
            useWorkflow && classes.workflow,
          )}
        >
          {mobileLocaleEditor}
          {mobilePreview}
        </div>
      )}
    </>
  );

  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);
  const nestedFieldPath = useMemo(
    () => customPathFromSlug(collection, entry.slug),
    [collection, entry.slug],
  );
  const breadcrumbs = useBreadcrumbs(collection, nestedFieldPath, { isNewEntry, summary });

  const isPersisting = useMemo(() => Boolean(entry.isPersisting), [entry.isPersisting]);

  return (
    <MainView
      breadcrumbs={breadcrumbs}
      noMargin
      noScroll={finalPreviewActive || i18nActive}
      navbarActions={
        <EditorToolbar
          isPersisting={isPersisting}
          isDeleting={entry.isDeleting}
          onPersist={handleOnPersist}
          onPersistAndNew={() => handleOnPersist({ createNew: true })}
          onPersistAndDuplicate={() => handleOnPersist({ createNew: true, duplicate: true })}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          hasChanged={hasChanged}
          collection={collection}
          isNewEntry={isNewEntry}
          isModification={isModification}
          showPreviewToggle={showPreviewToggle}
          previewActive={finalPreviewActive}
          scrollSyncActive={scrollSyncActive}
          showI18nToggle={collectHasI18n}
          i18nActive={i18nActive}
          togglePreview={handleTogglePreview}
          toggleScrollSync={handleToggleScrollSync}
          toggleI18n={handleToggleI18n}
          slug={slug}
          showMobilePreview={showMobilePreview}
          onMobilePreviewToggle={toggleMobilePreview}
          className={classes.toolbar}
          onDiscardDraft={onDiscardDraft}
          currentStatus={currentStatus}
          isUpdatingStatus={isUpdatingStatus}
          onChangeStatus={onChangeStatus}
          hasUnpublishedChanges={hasUnpublishedChanges}
          isPublishing={isPublishing}
          onDeleteUnpublishedChanges={onDeleteUnpublishedChanges}
          onPublish={onPublish}
          onUnPublish={onUnPublish}
          onPublishAndNew={() => handleOnPublish({ createNew: true })}
          onPublishAndDuplicate={() => handleOnPublish({ createNew: true, duplicate: true })}
          disabled={disabled}
        />
      }
    >
      {useWorkflow ? (
        <div className={classes['mobile-workflow-controls']}>
          <EditorWorkflowToolbarButtons
            hasChanged={hasChanged}
            isPersisting={isPersisting}
            onPersist={onPersist}
            currentStatus={currentStatus}
            isUpdatingStatus={isUpdatingStatus}
            disabled={disabled}
            onChangeStatus={onChangeStatus}
            isLoading={isLoading}
            mobile
          />
        </div>
      ) : null}
      <EditorContent
        key={draftKey}
        i18nActive={i18nActive}
        previewActive={finalPreviewActive && !i18nActive}
        editor={editor}
        editorSideBySideLocale={editorSideBySideLocale}
        editorWithPreview={editorWithPreview}
      />
    </MainView>
  );
};

export default EditorInterface;
