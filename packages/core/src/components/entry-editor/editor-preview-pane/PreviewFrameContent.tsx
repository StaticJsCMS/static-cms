import React, { useRef } from 'react';
import { FrameContextConsumer } from 'react-frame-component';
import { ScrollSyncPane } from 'react-scroll-sync';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import ThemeManager from '../../theme/ThemeManager';
import EditorPreviewContent from './EditorPreviewContent';

import type {
  ObjectValue,
  TemplatePreviewComponent,
  TemplatePreviewProps,
  UnknownField,
} from '@staticcms/core/interface';
import type { FC } from 'react';

import './PreviewFrameContent.css';

export const classes = generateClassNames('PreviewFrameContent', ['root', 'content']);

interface PreviewFrameContentProps {
  previewComponent: TemplatePreviewComponent<ObjectValue, UnknownField>;
  previewProps: Omit<TemplatePreviewProps<ObjectValue, UnknownField>, 'document' | 'window'>;
}

const PreviewFrameContent: FC<PreviewFrameContentProps> = ({ previewComponent, previewProps }) => {
  const ref = useRef<HTMLElement>();

  return (
    <FrameContextConsumer>
      {context => {
        if (!ref.current) {
          ref.current = context.document?.scrollingElement as HTMLElement;
        }

        return (
          <ThemeManager document={context.document}>
            <ScrollSyncPane key="preview-frame-scroll-sync" attachTo={ref}>
              <div className={classes.root}>
                <div className={classes.content}>
                  <EditorPreviewContent
                    key="preview-frame-content"
                    previewComponent={previewComponent}
                    previewProps={{
                      ...previewProps,
                      document: context.document,
                      window: context.window,
                    }}
                  />
                </div>
              </div>
            </ScrollSyncPane>
          </ThemeManager>
        );
      }}
    </FrameContextConsumer>
  );
};

export default PreviewFrameContent;
