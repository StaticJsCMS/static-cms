import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';

import { getI18nInfo, getPreviewEntry, hasI18n } from '@staticcms/core/lib/i18n';
import {
  getFileFromSlug,
  selectEntryCollectionTitle,
} from '@staticcms/core/lib/util/collection.util';
import MainView from '../MainView';
import EditorControlPane from './EditorControlPane/EditorControlPane';
import EditorPreviewPane from './EditorPreviewPane/EditorPreviewPane';
import EditorToolbar from './EditorToolbar';

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
  showDelete: boolean;
  hasChanged: boolean;
  displayUrl: string | undefined;
  isNewEntry: boolean;
  isModification: boolean;
  toggleScroll: () => Promise<{ readonly type: 'TOGGLE_SCROLL' }>;
  scrollSyncActive: boolean;
  loadScroll: () => void;
  submitted: boolean;
}

const EditorInterface = ({
  collection,
  entry,
  fields = [],
  fieldsErrors,
  showDelete,
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
}: TranslatedProps<EditorInterfaceProps>) => {
  const [previewActive, setPreviewActive] = useState(
    localStorage.getItem(PREVIEW_VISIBLE) !== 'false',
  );
  const [i18nActive, setI18nActive] = useState(localStorage.getItem(I18N_VISIBLE) !== 'false');

  useEffect(() => {
    loadScroll();
  }, [loadScroll]);

  const { locales, defaultLocale } = useMemo(() => getI18nInfo(collection), [collection]) ?? {};
  const [selectedLocale, setSelectedLocale] = useState<string>(locales?.[1] ?? 'en');

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
    localStorage.setItem(I18N_VISIBLE, `${newI18nActive}`);
  }, [i18nActive]);

  const handleLocaleChange = useCallback((locale: string) => {
    setSelectedLocale(locale);
  }, []);

  const [showPreviewToggle, previewInFrame] = useMemo(() => {
    let preview = collection.editor?.preview ?? true;
    let frame = collection.editor?.frame ?? true;

    if ('files' in collection) {
      const file = getFileFromSlug(collection, entry.slug);
      if (file?.editor?.preview !== undefined) {
        preview = file.editor.preview;
      }

      if (file?.editor?.frame !== undefined) {
        frame = file.editor.frame;
      }
    }

    return [preview, frame];
  }, [collection, entry.slug]);

  const collectHasI18n = hasI18n(collection);

  const editor = (
    <div key={defaultLocale} id="control-pane" className="w-full">
      <EditorControlPane
        collection={collection}
        entry={entry}
        fields={fields}
        fieldsErrors={fieldsErrors}
        locale={defaultLocale}
        submitted={submitted}
        hideBorder={!previewActive && !i18nActive}
        t={t}
      />
    </div>
  );

  const editorLocale = useMemo(
    () =>
      (locales ?? [])
        .filter(locale => locale !== defaultLocale)
        .map(locale => (
          <div key={locale}>
            {/* TODO Fix $hidden={locale !== selectedLocale}> */}
            <EditorControlPane
              collection={collection}
              entry={entry}
              fields={fields}
              fieldsErrors={fieldsErrors}
              locale={locale}
              onLocaleChange={handleLocaleChange}
              submitted={submitted}
              canChangeLocale
              hideBorder
              t={t}
            />
          </div>
        )),
    [
      collection,
      defaultLocale,
      entry,
      fields,
      fieldsErrors,
      handleLocaleChange,
      locales,
      submitted,
      t,
    ],
  );

  const previewEntry = collectHasI18n
    ? getPreviewEntry(entry, selectedLocale[0], defaultLocale)
    : entry;

  const editorWithPreview = (
    <div className="grid grid-cols-editor h-full">
      <ScrollSyncPane>{editor}</ScrollSyncPane>
      <EditorPreviewPane
        collection={collection}
        previewInFrame={previewInFrame}
        entry={previewEntry}
        fields={fields}
      />
    </div>
  );

  const editorSideBySideLocale = (
    <div className="grid grid-cols-editor h-full">
      <ScrollSyncPane>{editor}</ScrollSyncPane>
      <ScrollSyncPane>
        <>{editorLocale}</>
      </ScrollSyncPane>
    </div>
  );

  const summary = useMemo(() => selectEntryCollectionTitle(collection, entry), [collection, entry]);

  return (
    <MainView
      breadcrumbs={[
        {
          name: collection.label,
          to: `/collections/${collection.name}`,
        },
        {
          name: isNewEntry
            ? t('collection.collectionTop.newButton', {
                collectionLabel: collection.label_singular || collection.label,
              })
            : summary,
        },
      ]}
      noMargin
      navbarActions={
        <EditorToolbar
          isPersisting={entry.isPersisting}
          isDeleting={entry.isDeleting}
          onPersist={handleOnPersist}
          onPersistAndNew={() => handleOnPersist({ createNew: true })}
          onPersistAndDuplicate={() => handleOnPersist({ createNew: true, duplicate: true })}
          onDelete={onDelete}
          showDelete={showDelete}
          onDuplicate={onDuplicate}
          hasChanged={hasChanged}
          displayUrl={displayUrl}
          collection={collection}
          isNewEntry={isNewEntry}
          isModification={isModification}
          showPreviewToggle={showPreviewToggle}
          previewActive={previewActive}
          scrollSyncActive={scrollSyncActive}
          showI18nToggle={collectHasI18n}
          i18nActive={i18nActive}
          togglePreview={handleTogglePreview}
          toggleScrollSync={handleToggleScrollSync}
          toggleI18n={handleToggleI18n}
        />
      }
    >
      <EditorContent
        i18nActive={i18nActive}
        previewActive={previewActive && !i18nActive}
        editor={editor}
        editorSideBySideLocale={editorSideBySideLocale}
        editorWithPreview={editorWithPreview}
      />
    </MainView>
  );
};

export default EditorInterface;
