import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Fab from '@mui/material/Fab';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import HeightIcon from '@mui/icons-material/Height';
import LanguageIcon from '@mui/icons-material/Language';

import { FILES } from '../../constants/collectionTypes';
import { transientOptions } from '../../lib';
import { getI18nInfo, getPreviewEntry, hasI18n } from '../../lib/i18n';
import { getFileFromSlug } from '../../lib/util/collection.util';
import { colors, colorsRaw, components, transitions, zIndex } from '../../ui';
import EditorControlPane from './EditorControlPane/EditorControlPane';
import EditorPreviewPane from './EditorPreviewPane/EditorPreviewPane';
import EditorToolbar from './EditorToolbar';

import type {
  CmsField,
  Collection,
  EditorPersistOptions,
  Entry,
  EntryMeta,
  FieldError,
  FieldsErrors,
  I18nSettings,
  TranslatedProps,
  User,
  ValueOrNestedValue,
} from '../../interface';

const PREVIEW_VISIBLE = 'cms.preview-visible';
const I18N_VISIBLE = 'cms.i18n-visible';

const styles = {
  splitPane: css`
    ${components.card};
    border-radius: 0;
    height: 100%;
  `,
  pane: css`
    height: 100%;
  `,
};

function ReactSplitPaneGlobalStyles() {
  return (
    <Global
      styles={css`
        .Resizer.vertical {
          width: 21px;
          cursor: col-resize;
          position: relative;
          transition: background-color ${transitions.main};

          &:before {
            content: '';
            width: 2px;
            height: 100%;
            position: relative;
            left: 10px;
            background-color: ${colors.textFieldBorder};
            display: block;
          }

          &:hover,
          &:active {
            background-color: ${colorsRaw.grayLight};
          }
        }
      `}
    />
  );
}

const StyledSplitPane = styled.div`
  display: grid;
  grid-template-columns: min(864px, 50%) auto;
  height: 100%;

  > div:nth-of-type(2)::before {
    content: '';
    width: 2px;
    height: 100%;
    position: relative;
    background-color: rgb(223, 223, 227);
    display: block;
  }
`;

const NoPreviewContainer = styled.div`
  ${styles.splitPane};
`;

const EditorContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  padding-top: 66px;
`;

const Editor = styled.div`
  height: 100%;
  margin: 0 auto;
  position: relative;
  background-color: ${colorsRaw.white};
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
  padding: 0 16px;
  position: relative;
  overflow-x: hidden;
`;

const StyledViewControls = styled.div`
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
  editorWithEditor: JSX.Element;
  editorWithPreview: JSX.Element;
}

const EditorContent = ({
  i18nVisible,
  previewVisible,
  editor,
  editorWithEditor,
  editorWithPreview,
}: EditorContentProps) => {
  if (i18nVisible) {
    return editorWithEditor;
  } else if (previewVisible) {
    return editorWithPreview;
  } else {
    return <NoPreviewContainer>{editor}</NoPreviewContainer>;
  }
};

function isPreviewEnabled(collection: Collection, entry: Entry) {
  if (collection.type === FILES) {
    const file = getFileFromSlug(collection, entry.slug);
    const previewEnabled = file?.editor?.preview ?? false;
    if (previewEnabled) {
      return previewEnabled;
    }
  }
  return collection.editor?.preview ?? true;
}

interface EditorInterfaceProps {
  draftKey: string;
  entry: Entry;
  collection: Collection;
  fields: CmsField[] | undefined;
  fieldsMetaData: Record<string, EntryMeta>;
  fieldsErrors: FieldsErrors;
  onChange: (
    field: CmsField,
    value: ValueOrNestedValue,
    metadata: EntryMeta | undefined,
    i18n: I18nSettings | undefined,
  ) => void;
  onValidate: (uniqueFieldId: string, errors: FieldError[]) => void;
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
}

const EditorInterface = ({
  collection,
  entry,
  fields = [],
  fieldsMetaData,
  fieldsErrors,
  onChange,
  showDelete,
  onDelete,
  onDuplicate,
  onValidate,
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

  // const validate = useCallback(async () => {
  //   fields.forEach(field => {
  //     if (field.widget === 'hidden') {
  //       return;
  //     }
  // TODO Store validations
  //this.componentValidate[field.get('name')]();
  //   });
  // }, [fields]);

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

  const previewEnabled = isPreviewEnabled(collection, entry);

  const collectionI18nEnabled = hasI18n(collection);

  const editor = (
    <ControlPaneContainer id="control-pane" $overFlow>
      <EditorControlPane
        collection={collection}
        entry={entry}
        fields={fields}
        fieldsMetaData={fieldsMetaData}
        fieldsErrors={fieldsErrors}
        onChange={onChange}
        onValidate={onValidate}
        locale={selectedLocale}
        onLocaleChange={handleLocaleChange}
        // TODO ref={c => (this.controlPaneRef = c)}
        t={t}
      />
    </ControlPaneContainer>
  );

  const editor2 = (
    <ControlPaneContainer $overFlow={!scrollSyncEnabled}>
      <EditorControlPane
        collection={collection}
        entry={entry}
        fields={fields}
        fieldsMetaData={fieldsMetaData}
        fieldsErrors={fieldsErrors}
        onChange={onChange}
        onValidate={onValidate}
        locale={locales?.[1]}
        onLocaleChange={handleLocaleChange}
        t={t}
      />
    </ControlPaneContainer>
  );

  const previewEntry = collectionI18nEnabled
    ? getPreviewEntry(entry, selectedLocale, defaultLocale)
    : entry;

  const editorWithPreview = (
    <>
      <ReactSplitPaneGlobalStyles />
      <StyledSplitPane>
        <ScrollSyncPane>{editor}</ScrollSyncPane>
        <PreviewPaneContainer>
          <EditorPreviewPane
            collection={collection}
            entry={previewEntry}
            fields={fields}
            fieldsMetaData={fieldsMetaData}
          />
        </PreviewPaneContainer>
      </StyledSplitPane>
    </>
  );

  const editorWithEditor = (
    <ScrollSync enabled={scrollSyncEnabled}>
      <div>
        <StyledSplitPane>
          <ScrollSyncPane>{editor}</ScrollSyncPane>
          <ScrollSyncPane>{editor2}</ScrollSyncPane>
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
          editorWithEditor={editorWithEditor}
          editorWithPreview={editorWithPreview}
        />
      </Editor>
    </EditorContainer>
  );
};

export default EditorInterface;
