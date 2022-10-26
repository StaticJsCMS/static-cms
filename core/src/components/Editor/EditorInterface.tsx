import HeightIcon from '@mui/icons-material/Height';
import LanguageIcon from '@mui/icons-material/Language';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import { colorsRaw, components, zIndex } from '../../components/UI/styles';
import { FILES } from '../../constants/collectionTypes';
import { transientOptions } from '../../lib';
import { getI18nInfo, getPreviewEntry, hasI18n } from '../../lib/i18n';
import { getFileFromSlug } from '../../lib/util/collection.util';
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
  User,
} from '../../interface';

const PREVIEW_VISIBLE = 'cms.preview-visible';
const I18N_VISIBLE = 'cms.i18n-visible';

const StyledSplitPane = styled('div')`
  display: grid;
  grid-template-columns: min(864px, 50%) auto;
  height: calc(100vh - 64px);

  > div:nth-of-type(2)::before {
    content: '';
    width: 2px;
    height: calc(100vh - 64px);
    position: relative;
    background-color: rgb(223, 223, 227);
    display: block;
  }
`;

const NoPreviewContainer = styled('div')`
  ${components.card};
  border-radius: 0;
  height: 100%;
`;

const EditorContainer = styled('div')`
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  overflow: hidden;
`;

const Editor = styled('div')`
  height: calc(100vh - 64px);
  position: relative;
  background-color: ${colorsRaw.white};
  overflow-y: auto;
`;

interface PreviewPaneContainerProps {
  $blockEntry?: boolean;
  $overFlow?: boolean;
}

const PreviewPaneContainer = styled(
  'div',
  transientOptions,
)<PreviewPaneContainerProps>(
  ({ $blockEntry, $overFlow }) => `
    height: 100%;
    pointer-events: ${$blockEntry ? 'none' : 'auto'};
    overflow-y: ${$overFlow ? 'auto' : 'hidden'};
  `,
);

const ControlPaneContainer = styled(PreviewPaneContainer)`
  padding: 24px 16px 16px;
  position: relative;
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const StyledViewControls = styled('div')`
  position: fixed;
  bottom: 4px;
  right: 8px;
  z-index: ${zIndex.zIndex299};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface EditorContentProps {
  i18nVisible: boolean;
  previewVisible: boolean;
  editor: JSX.Element;
  editorSideBySideLocale: JSX.Element;
  editorWithPreview: JSX.Element;
}

const EditorContent = ({
  i18nVisible,
  previewVisible,
  editor,
  editorSideBySideLocale,
  editorWithPreview,
}: EditorContentProps) => {
  if (i18nVisible) {
    return editorSideBySideLocale;
  } else if (previewVisible) {
    return editorWithPreview;
  } else {
    return <NoPreviewContainer>{editor}</NoPreviewContainer>;
  }
};

interface EditorInterfaceProps {
  draftKey: string;
  entry: Entry;
  collection: Collection;
  fields: Field[] | undefined;
  fieldsErrors: FieldsErrors;
  onPersist: (opts?: EditorPersistOptions) => Promise<void>;
  onDelete: () => Promise<void>;
  onDuplicate: () => void;
  showDelete: boolean;
  user: User | undefined;
  hasChanged: boolean;
  displayUrl: string | undefined;
  isNewEntry: boolean;
  isModification: boolean;
  onLogoutClick: () => void;
  editorBackLink: string;
  toggleScroll: () => Promise<{ readonly type: 'TOGGLE_SCROLL' }>;
  scrollSyncEnabled: boolean;
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
  user,
  hasChanged,
  displayUrl,
  isNewEntry,
  isModification,
  onLogoutClick,
  draftKey,
  editorBackLink,
  scrollSyncEnabled,
  t,
  loadScroll,
  toggleScroll,
  submitted,
}: TranslatedProps<EditorInterfaceProps>) => {
  const [previewVisible, setPreviewVisible] = useState(
    localStorage.getItem(PREVIEW_VISIBLE) !== 'false',
  );
  const [i18nVisible, setI18nVisible] = useState(localStorage.getItem(I18N_VISIBLE) !== 'false');

  useEffect(() => {
    loadScroll();
  }, [loadScroll]);

  const { locales, defaultLocale } = useMemo(() => getI18nInfo(collection), [collection]) ?? {};
  const [selectedLocale, setSelectedLocale] = useState(locales?.[0]);
  const switchToDefaultLocale = useCallback(() => {
    if (hasI18n(collection)) {
      const { defaultLocale } = getI18nInfo(collection);
      setSelectedLocale(defaultLocale);
    }
  }, [collection]);

  const handleOnPersist = useCallback(
    async (opts: EditorPersistOptions = {}) => {
      const { createNew = false, duplicate = false } = opts;
      await switchToDefaultLocale();
      // TODO Trigger field validation on persist
      // this.controlPaneRef.validate();
      onPersist({ createNew, duplicate });
    },
    [onPersist, switchToDefaultLocale],
  );

  const handleTogglePreview = useCallback(() => {
    const newPreviewVisible = !previewVisible;
    setPreviewVisible(newPreviewVisible);
    localStorage.setItem(PREVIEW_VISIBLE, `${newPreviewVisible}`);
  }, [previewVisible]);

  const handleToggleScrollSync = useCallback(() => {
    toggleScroll();
  }, [toggleScroll]);

  const handleToggleI18n = useCallback(() => {
    const newI18nVisible = !i18nVisible;
    setI18nVisible(newI18nVisible);
    localStorage.setItem(I18N_VISIBLE, `${newI18nVisible}`);
  }, [i18nVisible]);

  const handleLocaleChange = useCallback((locale: string) => {
    setSelectedLocale(locale);
  }, []);

  const [previewEnabled, previewInFrame] = useMemo(() => {
    let preview = collection.editor?.preview ?? true;
    let frame = collection.editor?.frame ?? true;

    if (collection.type === FILES) {
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

  const collectionI18nEnabled = hasI18n(collection);

  const editor = (
    <ControlPaneContainer id="control-pane" $overFlow>
      <EditorControlPane
        collection={collection}
        entry={entry}
        fields={fields}
        fieldsErrors={fieldsErrors}
        locale={selectedLocale}
        onLocaleChange={handleLocaleChange}
        submitted={submitted}
        t={t}
      />
    </ControlPaneContainer>
  );

  const editorLocale = (
    <ControlPaneContainer $overFlow={!scrollSyncEnabled}>
      <EditorControlPane
        collection={collection}
        entry={entry}
        fields={fields}
        fieldsErrors={fieldsErrors}
        locale={locales?.[1]}
        onLocaleChange={handleLocaleChange}
        submitted={submitted}
        t={t}
      />
    </ControlPaneContainer>
  );

  const previewEntry = collectionI18nEnabled
    ? getPreviewEntry(entry, selectedLocale, defaultLocale)
    : entry;

  const editorWithPreview = (
    <>
      <StyledSplitPane>
        <ScrollSyncPane>{editor}</ScrollSyncPane>
        <PreviewPaneContainer>
          <EditorPreviewPane
            collection={collection}
            previewInFrame={previewInFrame}
            entry={previewEntry}
            fields={fields}
          />
        </PreviewPaneContainer>
      </StyledSplitPane>
    </>
  );

  const editorSideBySideLocale = (
    <ScrollSync enabled={scrollSyncEnabled}>
      <div>
        <StyledSplitPane>
          <ScrollSyncPane>{editor}</ScrollSyncPane>
          <ScrollSyncPane>{editorLocale}</ScrollSyncPane>
        </StyledSplitPane>
      </div>
    </ScrollSync>
  );

  const finalI18nVisible = collectionI18nEnabled && i18nVisible;
  const finalPreviewVisible = previewEnabled && previewVisible;
  const scrollSyncVisible = finalI18nVisible || finalPreviewVisible;

  return (
    <EditorContainer>
      <EditorToolbar
        isPersisting={entry.isPersisting}
        isDeleting={entry.isDeleting}
        onPersist={handleOnPersist}
        onPersistAndNew={() => handleOnPersist({ createNew: true })}
        onPersistAndDuplicate={() => handleOnPersist({ createNew: true, duplicate: true })}
        onDelete={onDelete}
        showDelete={showDelete}
        onDuplicate={onDuplicate}
        user={user}
        hasChanged={hasChanged}
        displayUrl={displayUrl}
        collection={collection}
        isNewEntry={isNewEntry}
        isModification={isModification}
        onLogoutClick={onLogoutClick}
        editorBackLink={editorBackLink}
      />
      <Editor key={draftKey}>
        <StyledViewControls>
          {collectionI18nEnabled && (
            <Fab
              size="small"
              color={finalI18nVisible ? 'primary' : 'default'}
              aria-label="add"
              onClick={handleToggleI18n}
              title={t('editor.editorInterface.toggleI18n')}
            >
              <LanguageIcon />
            </Fab>
          )}
          {previewEnabled && (
            <Fab
              size="small"
              color={finalPreviewVisible ? 'primary' : 'default'}
              aria-label="add"
              onClick={handleTogglePreview}
              title={t('editor.editorInterface.togglePreview')}
            >
              <VisibilityIcon />
            </Fab>
          )}
          {scrollSyncVisible && (
            <Fab
              size="small"
              color={scrollSyncEnabled ? 'primary' : 'default'}
              aria-label="add"
              onClick={handleToggleScrollSync}
              title={t('editor.editorInterface.toggleScrollSync')}
            >
              <HeightIcon />
            </Fab>
          )}
        </StyledViewControls>
        <EditorContent
          i18nVisible={finalI18nVisible}
          previewVisible={finalPreviewVisible}
          editor={editor}
          editorSideBySideLocale={editorSideBySideLocale}
          editorWithPreview={editorWithPreview}
        />
      </Editor>
    </EditorContainer>
  );
};

export default EditorInterface;
