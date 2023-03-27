import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import Frame from 'react-frame-component';
import { translate } from 'react-polyglot';
import { ScrollSyncPane } from 'react-scroll-sync';

import { getPreviewStyles, getPreviewTemplate } from '@staticcms/core/lib/registry';
import { selectTemplateName } from '@staticcms/core/lib/util/collection.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';
import useWidgetsFor from '../../common/widget/useWidgetsFor';
import ErrorBoundary from '../../ErrorBoundary';
import EditorPreview from './EditorPreview';
import EditorPreviewContent from './EditorPreviewContent';
import PreviewFrameContent from './PreviewFrameContent';

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

  .frame-content {
    padding: 16px;
  }

  .text-gray-900 {
    --tw-text-opacity: 1;
    color: rgb(17 24 39 / var(--tw-text-opacity));
  }

  .dark .dark\\:text-gray-100 {
    --tw-text-opacity: 1;
    color: rgb(243 244 246 / var(--tw-text-opacity));
  }

  .text-slate-500 {
    --tw-text-opacity: 1;
    color: rgb(100 116 139 / var(--tw-text-opacity));
  }

  .dark .dark\\:text-slate-400 {
    --tw-text-opacity: 1;
    color: rgb(148 163 184 / var(--tw-text-opacity));
  }
`;

export interface EditorPreviewPaneProps {
  collection: Collection;
  fields: Field[];
  entry: Entry;
  previewInFrame: boolean;
}

const PreviewPane = (props: TranslatedProps<EditorPreviewPaneProps>) => {
  const { entry, collection, fields, previewInFrame, t } = props;

  const config = useAppSelector(selectConfig);

  const { widgetFor, widgetsFor } = useWidgetsFor(config, collection, fields, entry);

  const previewStyles = useMemo(
    () => [
      ...getPreviewStyles().map((style, i) => {
        if (style.raw) {
          return <style key={i}>{style.value}</style>;
        }
        return <link key={i} href={style.value} type="text/css" rel="stylesheet" />;
      }),
      <style key="global">{FrameGlobalStyles}</style>,
    ],
    [],
  );

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
        <body>
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

    return createPortal(
      <div className="w-preview h-main absolute top-16 right-0">
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
                <div key="preview-wrapper" id="preview-pane">
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
