import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';

import { EDITOR_SIZE_COMPACT } from '@staticcms/core/constants/views';
import { summaryFormatter } from '@staticcms/core/lib/formatters';
import useBreadcrumbs from '@staticcms/core/lib/hooks/useBreadcrumbs';
import { getI18nInfo, getPreviewEntry, hasI18n } from '@staticcms/core/lib/i18n';
import classNames from '@staticcms/core/lib/util/classNames.util';
import {
  getFileFromSlug,
  selectEntryCollectionTitle,
} from '@staticcms/core/lib/util/collection.util';
import { customPathFromSlug } from '@staticcms/core/lib/util/nested.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import MainView from '../MainView';
import EditorToolbar from './EditorToolbar';
import EditorControlPane from './editor-control-pane/EditorControlPane';
import EditorPreviewPane from './editor-preview-pane/EditorPreviewPane';

import type {
  Collection,
  EditorPersistOptions,
  Entry,
  Field,
  FieldsErrors,
  TranslatedProps,
} from '@staticcms/core/interface';

const PREVIEW_VISIBLE = 'cms.preview-visible';
const I18N_VISIBLE = 'cms.i18n-visible';

interface EditorContentProps {
  i18nActive: boolean;
  previewActive: boolean;
  editor: JSX.Element;
  editorSideBySideLocale: JSX.Element;
  editorWithPreview: JSX.Element;
}

const EditorContent = ({
  i18nActive,
  previewActive,
  editor,
  editorSideBySideLocale,
  editorWithPreview,
}: EditorContentProps) => {
  if (i18nActive) {
    return editorSideBySideLocale;
  } else if (previewActive) {
    return editorWithPreview;
  } else {
    return (
      <div className="flex justify-center">
        <div className="w-editor-only max-w-full">{editor}</div>
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
  displayUrl: string | undefined;
  isNewEntry: boolean;
  isModification: boolean;
  toggleScroll: () => Promise<void>;
  scrollSyncActive: boolean;
  loadScroll: () => void;
  submitted: boolean;
  slug: string | undefined;
  onDiscardDraft: () => void;
}

const EditorInterface = ({
  collection,
  entry,
  fields = [],
  fieldsErrors,
  onDelete,
  onDuplicate,
  onPersist,
  hasChanged,
  displayUrl,
  isNewEntry,
  isModification,
  draftKey,
  scrollSyncActive,
  t,
  loadScroll,
  toggleScroll,
  submitted,
  slug,
  onDiscardDraft,
}: TranslatedProps<EditorInterfaceProps>) => {
  const config = useAppSelector(selectConfig);

  const { locales, defaultLocale } = useMemo(() => getI18nInfo(collection), [collection]) ?? {};
  const translatedLocales = useMemo(
    () => locales?.filter(locale => locale !== defaultLocale) ?? [],
    [locales, defaultLocale],
  );

  const [previewActive, setPreviewActive] = useState(
    localStorage.getItem(PREVIEW_VISIBLE) !== 'false',
  );

  const i18nEnabled = useMemo(() => locales && locales.length > 0, [locales]);

  const [i18nActive, setI18nActive] = useState(
    Boolean(localStorage.getItem(I18N_VISIBLE) !== 'false' && i18nEnabled),
  );

  const [selectedLocale, setSelectedLocale] = useState<string>(
    (i18nActive ? translatedLocales?.[0] : defaultLocale) ?? 'en',
  );

  useEffect(() => {
    loadScroll();
  }, [loadScroll]);

  const handleOnPersist = useCallback(
    async (opts: EditorPersistOptions = {}) => {
      const { createNew = false, duplicate = false } = opts;
      // await switchToDefaultLocale();
      onPersist({ createNew, duplicate });
    },
    [onPersist],
  );

  const handleTogglePreview = useCallback(() => {
    const newPreviewActive = !previewActive;
    setPreviewActive(newPreviewActive);
    localStorage.setItem(PREVIEW_VISIBLE, `${newPreviewActive}`);
  }, [previewActive]);

  const handleToggleScrollSync = useCallback(() => {
    toggleScroll();
  }, [toggleScroll]);

  const handleToggleI18n = useCallback(() => {
    const newI18nActive = !i18nActive;
    setI18nActive(newI18nActive);
    setSelectedLocale(selectedLocale =>
      newI18nActive && selectedLocale === defaultLocale ? translatedLocales?.[0] : selectedLocale,
    );
    localStorage.setItem(I18N_VISIBLE, `${newI18nActive}`);
  }, [i18nActive, setSelectedLocale, translatedLocales, defaultLocale]);

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
    setShowMobilePreview(old => !old);
  }, []);

  const editor = useMemo(
    () => (
      <div
        key={defaultLocale}
        id="control-pane"
        className={classNames(
          `
            w-full
          `,
          (finalPreviewActive || i18nActive) &&
            `
              overflow-y-auto
              styled-scrollbars
              h-main-mobile
              md:h-main
            `,
          showMobilePreview &&
            `
              hidden
              lg:block
            `,
        )}
      >
        <EditorControlPane
          collection={collection}
          entry={entry}
          fields={fields}
          fieldsErrors={fieldsErrors}
          locale={i18nActive ? defaultLocale : selectedLocale}
          submitted={submitted}
          hideBorder={!finalPreviewActive && !i18nActive}
          canChangeLocale={i18nEnabled && !i18nActive}
          onLocaleChange={handleLocaleChange}
          slug={slug}
          t={t}
        />
      </div>
    ),
    [
      defaultLocale,
      finalPreviewActive,
      i18nActive,
      showMobilePreview,
      collection,
      entry,
      fields,
      fieldsErrors,
      selectedLocale,
      submitted,
      i18nEnabled,
      handleLocaleChange,
      slug,
      t,
    ],
  );

  const editorLocale = useMemo(
    () => (
      <div
        key={selectedLocale}
        className="
          flex
          w-full
          overflow-y-auto
          styled-scrollbars
          h-main-mobile
          md:h-main
        "
      >
        <EditorControlPane
          collection={collection}
          entry={entry}
          fields={fields}
          fieldsErrors={fieldsErrors}
          locale={selectedLocale}
          onLocaleChange={handleLocaleChange}
          submitted={submitted}
          canChangeLocale
          context="i18nSplit"
          hideBorder
          t={t}
        />
      </div>
    ),
    [collection, entry, fields, fieldsErrors, handleLocaleChange, selectedLocale, submitted, t],
  );

  const previewEntry = collectHasI18n
    ? getPreviewEntry(entry, selectedLocale, defaultLocale)
    : entry;

  const mobileLocaleEditor = useMemo(
    () => (
      <div
        key={selectedLocale}
        className="
          w-full
          overflow-y-auto
          styled-scrollbars
          h-main-mobile
          flex
          md:hidden
        "
      >
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
          t={t}
        />
      </div>
    ),
    [collection, entry, fields, fieldsErrors, handleLocaleChange, selectedLocale, submitted, t],
  );

  const editorWithPreview = (
    <div
      className={classNames(
        `
          grid
          h-full
        `,
        editorSize === EDITOR_SIZE_COMPACT ? 'lg:grid-cols-editor' : 'lg:grid-cols-2',
      )}
    >
      <ScrollSyncPane>{editor}</ScrollSyncPane>
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

  const editorSideBySideLocale = (
    <>
      <div className="grid-cols-2 h-full hidden lg:grid">
        <ScrollSyncPane>{editor}</ScrollSyncPane>
        <ScrollSyncPane>
          <>{editorLocale}</>
        </ScrollSyncPane>
      </div>
      {mobileLocaleEditor}
    </>
  );

  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);
  const nestedFieldPath = useMemo(
    () => customPathFromSlug(collection, entry.slug),
    [collection, entry.slug],
  );
  const breadcrumbs = useBreadcrumbs(collection, nestedFieldPath, { isNewEntry, summary, t });

  return (
    <MainView
      breadcrumbs={breadcrumbs}
      noMargin
      noScroll={finalPreviewActive || i18nActive}
      navbarActions={
        <EditorToolbar
          isPersisting={entry.isPersisting}
          isDeleting={entry.isDeleting}
          onPersist={handleOnPersist}
          onPersistAndNew={() => handleOnPersist({ createNew: true })}
          onPersistAndDuplicate={() => handleOnPersist({ createNew: true, duplicate: true })}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          hasChanged={hasChanged}
          displayUrl={displayUrl}
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
          className="flex"
          onDiscardDraft={onDiscardDraft}
        />
      }
    >
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
