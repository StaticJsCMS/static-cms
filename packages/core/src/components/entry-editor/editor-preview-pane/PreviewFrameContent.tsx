import React, { useRef } from 'react';
import { FrameContextConsumer } from 'react-frame-component';
import { ScrollSyncPane } from 'react-scroll-sync';

import classNames from '@staticcms/core/lib/util/classNames.util';
import EditorPreviewContent from './EditorPreviewContent';

import type {
  ObjectValue,
  TemplatePreviewComponent,
  TemplatePreviewProps,
  UnknownField,
} from '@staticcms/core/interface';
import type { FC } from 'react';

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

        return (
          <ScrollSyncPane key="preview-frame-scroll-sync" attachTo={ref}>
            <div className={classNames(theme === 'dark' && 'dark')}>
              <div
                className="
                  text-gray-900
                  dark:text-gray-100
                "
              >
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
