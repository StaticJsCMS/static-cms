import { styled } from '@mui/material/styles';
import React, { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Frame from 'react-frame-component';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { ScrollSyncPane } from 'react-scroll-sync';

import { getAsset as getAssetAction } from '@staticcms/core/actions/media';
import { ErrorBoundary } from '@staticcms/core/components/UI';
import { lengths } from '@staticcms/core/components/UI/styles';
import { getPreviewStyles, getPreviewTemplate } from '@staticcms/core/lib/registry';
import { selectTemplateName } from '@staticcms/core/lib/util/collection.util';
import { selectIsLoadingAsset } from '@staticcms/core/reducers/selectors/medias';
import useWidgetsFor from '../../common/widget/useWidgetsFor';
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
import type { RootState } from '@staticcms/core/store';
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';

const PreviewPaneFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: ${lengths.borderRadius};
  overflow: auto;
`;

const FrameGlobalStyles = `
  body {
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  .frame-content {
    padding: 16px;
  }
`;

const PreviewPaneWrapper = styled('div')`
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: ${lengths.borderRadius};
  overflow: auto;
  padding: 16px;
`;

const StyledPreviewContent = styled('div')`
  width: calc(100% - min(864px, 50%));
  top: 64px;
  right: 0;
  position: absolute;
  height: calc(100vh - 64px);
  overflow: hidden;
`;

const PreviewPane = (props: TranslatedProps<EditorPreviewPaneProps>) => {
  const { entry, collection, config, fields, previewInFrame, getAsset, t } = props;

  const { widgetFor, widgetsFor } = useWidgetsFor(config.config, collection, fields, entry);

  const handleGetAsset = useCallback(
    (path: string, field?: Field) => {
      return getAsset(collection, entry, path, field);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection],
  );

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
        <body><div></div></body>
      </html>
    `,
    [],
  );

  const element = useMemo(() => document.getElementById('cms-root'), []);

  const previewProps = useMemo(
    () =>
      ({
        ...props,
        getAsset: handleGetAsset,
        widgetFor,
        widgetsFor,
      } as Omit<TemplatePreviewProps, 'document' | 'window'>),
    [handleGetAsset, props, widgetFor, widgetsFor],
  );

  return useMemo(() => {
    if (!element) {
      return null;
    }

    return createPortal(
      <StyledPreviewContent className="preview-content">
        {!entry || !entry.data ? null : (
          <ErrorBoundary config={config}>
            {previewInFrame ? (
              <PreviewPaneFrame
                key="preview-frame"
                id="preview-pane"
                head={previewStyles}
                initialContent={initialFrameContent}
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
              </PreviewPaneFrame>
            ) : (
              <ScrollSyncPane key="preview-wrapper-scroll-sync">
                <PreviewPaneWrapper key="preview-wrapper" id="preview-pane">
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
                </PreviewPaneWrapper>
              </ScrollSyncPane>
            )}
          </ErrorBoundary>
        )}
      </StyledPreviewContent>,
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

export interface EditorPreviewPaneOwnProps {
  collection: Collection;
  fields: Field[];
  entry: Entry;
  previewInFrame: boolean;
}

function mapStateToProps(state: RootState, ownProps: EditorPreviewPaneOwnProps) {
  const isLoadingAsset = selectIsLoadingAsset(state);
  return { ...ownProps, isLoadingAsset, config: state.config };
}

const mapDispatchToProps = {
  getAsset: getAssetAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EditorPreviewPaneProps = ConnectedProps<typeof connector>;

export default connector(translate()(PreviewPane) as ComponentType<EditorPreviewPaneProps>);
