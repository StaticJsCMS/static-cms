import React, { useCallback, useMemo, useRef } from 'react';
import Frame from 'react-frame-component';
import { translate } from 'react-polyglot';
import { ScrollSyncPane } from 'react-scroll-sync';

import { EDITOR_SIZE_COMPACT } from '@staticcms/core/constants/views';
import { getPreviewStyles, getPreviewTemplate } from '@staticcms/core/lib/registry';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { selectTemplateName } from '@staticcms/core/lib/util/collection.util';
import LivePreviewLoadedEvent from '@staticcms/core/lib/util/events/LivePreviewLoadedEvent';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
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
import type DataUpdateEvent from '@staticcms/core/lib/util/events/DataEvent';
import type { FC } from 'react';

import './EditorPreviewPane.css';

export const classes = generateClassNames('Preview', [
  'root',
  'compact',
  'show-mobile-preview',
  'live-preview',
  'frame',
  'inline',
]);

const FrameGlobalStyles = `
  body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  img {
    max-width: 100%;
  }

  a {
    color: var(--primary-main);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .frame-content {
    padding: 8px 12px 8px 0;
  }

  @media (max-width: 1024px) {
    .frame-content {
      padding: 8px 12px;
    }
  }

  .CMS_PreviewFrameContent_content {
    color: var(--text-primary);
  }

  .CMS_Scrollbar_root {
    --scrollbar-foreground: var(--background-main);
    --scrollbar-background: var(--background-dark);
  }

  .CMS_Scrollbar_root.CMS_Scrollbar_secondary {
    --scrollbar-foreground: var(--background-light);
    --scrollbar-background: var(--background-main);
  }

  .CMS_Scrollbar_root {
    /* Foreground, Background */
    scrollbar-color: var(--scrollbar-foreground) var(--scrollbar-background);
  }

  .CMS_Scrollbar_root::-webkit-scrollbar {
    width: 10px; /* Mostly for vertical scrollbars */
    height: 10px; /* Mostly for horizontal scrollbars */
  }

  .CMS_Scrollbar_root::-webkit-scrollbar-corner {
    background: rgba(0,0,0,0);
  }

  .CMS_Scrollbar_root::-webkit-scrollbar-thumb {
    /* Foreground */
    background: var(--scrollbar-foreground);
  }

  .CMS_Scrollbar_root::-webkit-scrollbar-track {
    /* Background */
    background: var(--scrollbar-background);
  }
`;

export interface EditorPreviewPaneProps {
  collection: Collection;
  fields: Field[];
  entry: Entry;
  previewInFrame: boolean;
  livePreviewUrlTemplate: string | undefined;
  editorSize: EditorSize;
  showMobilePreview: boolean;
}

const EditorPreviewPane = (props: TranslatedProps<EditorPreviewPaneProps>) => {
  const {
    editorSize,
    entry,
    collection,
    fields,
    previewInFrame,
    livePreviewUrlTemplate,
    showMobilePreview,
    t,
  } = props;

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
        <body class="CMS_Scrollbar_root">
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

  const livePreviewIframe = useRef<HTMLIFrameElement>(null);
  const passEventToIframe = useCallback((event: DataUpdateEvent) => {
    if (livePreviewIframe.current) {
      livePreviewIframe.current.contentWindow?.postMessage({
        message: 'data:update',
        value: { fieldPath: event.detail.fieldPath, value: event.detail.value },
      });
    }
  }, []);

  useWindowEvent('data:update', passEventToIframe);

  const handleLivePreviewIframeLoaded = useCallback(() => {
    window.dispatchEvent(new LivePreviewLoadedEvent());
  }, []);

  return useMemo(() => {
    if (!element) {
      return null;
    }

    return (
      <div
        className={classNames(
          classes.root,
          editorSize === EDITOR_SIZE_COMPACT && classes.compact,
          !showMobilePreview && classes['show-mobile-preview'],
        )}
      >
        <ErrorBoundary config={config}>
          {livePreviewUrlTemplate ? (
            <iframe
              key="live-preview-frame"
              ref={livePreviewIframe}
              src={`${livePreviewUrlTemplate}?useCmsData=true`}
              className={classes['live-preview']}
              onLoad={handleLivePreviewIframeLoaded}
            />
          ) : previewInFrame ? (
            <Frame
              key="preview-frame"
              id="preview-pane"
              head={previewStyles}
              initialContent={initialFrameContent}
              className={classes.frame}
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
                className={classNames(classes.inline, 'CMS_Scrollbar_root')}
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
      </div>
    );
  }, [
    collection,
    config,
    editorSize,
    element,
    handleLivePreviewIframeLoaded,
    initialFrameContent,
    livePreviewUrlTemplate,
    previewComponent,
    previewInFrame,
    previewProps,
    previewStyles,
    showMobilePreview,
    t,
  ]);
};

export default translate()(EditorPreviewPane) as FC<EditorPreviewPaneProps>;
