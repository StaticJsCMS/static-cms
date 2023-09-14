import React, { useRef } from 'react';
import { FrameContextConsumer } from 'react-frame-component';
import { ScrollSyncPane } from 'react-scroll-sync';

import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
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

  const { theme } = previewProps;

  return (
    <FrameContextConsumer>
      {context => {
        if (!ref.current) {
          ref.current = context.document?.scrollingElement as HTMLElement;
        }

        if (theme === 'dark') {
          context.document?.body.classList.add('dark');
        } else {
          context.document?.body.classList.remove('dark');
        }

        return (
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
        );
      }}
    </FrameContextConsumer>
  );
};

export default PreviewFrameContent;
