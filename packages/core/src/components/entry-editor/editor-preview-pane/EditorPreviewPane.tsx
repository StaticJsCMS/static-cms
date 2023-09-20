import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import Frame from 'react-frame-component';
import { translate } from 'react-polyglot';
import { ScrollSyncPane } from 'react-scroll-sync';

import { EDITOR_SIZE_COMPACT } from '@staticcms/core/constants/views';
import { getPreviewStyles, getPreviewTemplate } from '@staticcms/core/lib/registry';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectTemplateName } from '@staticcms/core/lib/util/collection.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import ErrorBoundary from '../../ErrorBoundary';
import useWidgetsFor from '../../common/widget/useWidgetsFor';
import EditorPreview from './EditorPreview';
import EditorPreviewContent from './EditorPreviewContent';
import PreviewFrameContent from './PreviewFrameContent';

import type { EditorSize } from '@staticcms/core/constants/views';
import type {
  Collection,
  Entry,
  Field,
  TemplatePreviewProps,
  TranslatedProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';

const FrameGlobalStyles = `
  body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  img {
    max-width: 100%;
  }

  a {
    color: rgb(59 130 246);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .frame-content {
    padding: 16px;
  }

  .text-blue-500 {
    color: rgb(59 130 246);
  }

  .text-gray-800 {
    color: rgb(17 24 39);
  }

  .dark .dark\\:text-gray-100 {
    color: rgb(243 244 246);
  }

  .text-slate-500 {
    color: rgb(100 116 139);
  }

  .dark .dark\\:text-slate-400 {
    color: rgb(148 163 184);
  }

  .styled-scrollbars {
    --scrollbar-foreground: rgba(100, 116, 139, 0.25);
    --scrollbar-background: rgb(248 250 252);
  }

  .dark.styled-scrollbars {
    --scrollbar-foreground: rgba(30, 41, 59, 0.8);
    --scrollbar-background: rgb(15 23 42);
  }

  .styled-scrollbars {
    /* Foreground, Background */
    scrollbar-color: var(--scrollbar-foreground) var(--scrollbar-background);
  }

  .styled-scrollbars::-webkit-scrollbar {
    width: 10px; /* Mostly for vertical scrollbars */
    height: 10px; /* Mostly for horizontal scrollbars */
  }

  .styled-scrollbars::-webkit-scrollbar-thumb {
    /* Foreground */
    background: var(--scrollbar-foreground);
  }

  .styled-scrollbars::-webkit-scrollbar-track {
    /* Background */
    background: var(--scrollbar-background);
  }
`;

export interface EditorPreviewPaneProps {
  collection: Collection;
  fields: Field[];
  entry: Entry;
  previewInFrame: boolean;
  editorSize: EditorSize;
  showLeftNav?: boolean;
}

const PreviewPane = (props: TranslatedProps<EditorPreviewPaneProps>) => {
  const { editorSize, entry, collection, fields, previewInFrame, showLeftNav, t } = props;

  const config = useAppSelector(selectConfig);

  const { widgetFor, widgetsFor } = useWidgetsFor(config, collection, fields, entry);

  const previewStyles = useMemo(() => {
    const styles = getPreviewStyles().map((style, i) => {
      if (style.raw) {
        return <style key={i}>{style.value}</style>;
      }
      return <link key={i} href={style.value} type="text/css" rel="stylesheet" />;
    });

    if (styles.length === 0) {
      return <style key="global">{FrameGlobalStyles}</style>;
    }

    return styles;
  }, []);

  const previewComponent = useMemo(
    () => getPreviewTemplate(selectTemplateName(collection, entry.slug)) ?? EditorPreview,
    [collection, entry.slug],
  );

  const initialFrameContent = useMemo(
    () => `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank"/>
        </head>
        <body class="styled-scrollbars">
          <div></div>
        </body>
      </html>
    `,
    [],
  );

  const element = useMemo(() => document.getElementById('cms-root'), []);

  const theme = useAppSelector(selectTheme);

  const previewProps = useMemo(
    () =>
      ({
        ...props,
        theme,
        widgetFor,
        widgetsFor,
      } as Omit<TemplatePreviewProps, 'document' | 'window'>),
    [props, theme, widgetFor, widgetsFor],
  );

  return useMemo(() => {
    if (!element) {
      return null;
    }

    const editorCompact = editorSize === EDITOR_SIZE_COMPACT;
    return createPortal(
      <div
        className={classNames(
          `
            h-main
            absolute
            top-16
            right-0
          `,
          showLeftNav ? (editorCompact ? 'w-preview-compact-sidebar' : 'w-preview-half-sidebar') : (editorCompact ? 'w-preview' : 'w-6/12'),
        )}
      >
        {!entry || !entry.data ? null : (
          <ErrorBoundary config={config}>
            {previewInFrame ? (
              <Frame
                key="preview-frame"
                id="preview-pane"
                head={previewStyles}
                initialContent={initialFrameContent}
                className="w-full h-full"
              >
                {!collection ? (
                  t('collection.notFound')
                ) : (
                  <PreviewFrameContent
                    key="preview-frame-content"
                    previewComponent={previewComponent}
                    previewProps={{ ...previewProps }}
                  />
                )}
              </Frame>
            ) : (
              <ScrollSyncPane key="preview-wrapper-scroll-sync">
                <div
                  key="preview-wrapper"
                  id="preview-pane"
                  className="
                    overflow-y-auto
                    styled-scrollbars
                    h-full
                  "
                >
                  {!collection ? (
                    t('collection.notFound')
                  ) : (
                    <>
                      {previewStyles}
                      <EditorPreviewContent
                        key="preview-wrapper-content"
                        previewComponent={previewComponent}
                        previewProps={{ ...previewProps, document, window }}
                      />
                    </>
                  )}
                </div>
              </ScrollSyncPane>
            )}
          </ErrorBoundary>
        )}
      </div>,
      element,
      'preview-content',
    );
  }, [
    collection,
    config,
    editorSize,
    element,
    entry,
    initialFrameContent,
    previewComponent,
    previewInFrame,
    previewProps,
    previewStyles,
    t,
  ]);
};

export default translate()(PreviewPane) as FC<EditorPreviewPaneProps>;
