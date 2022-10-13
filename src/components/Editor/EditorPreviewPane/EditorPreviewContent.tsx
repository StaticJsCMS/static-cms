import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { ScrollSyncPane } from 'react-scroll-sync';

import type { CmsTemplatePreviewComponent, CmsTemplatePreviewProps } from '../../../interface';
import type { ReactNode } from 'react';

interface PreviewContentProps {
  previewComponent?: CmsTemplatePreviewComponent;
  previewProps: CmsTemplatePreviewProps;
}

const StyledPreviewContent = styled.div`
  width: calc(100% - min(864px, 50%));
  top: 64px;
  right: 0;
  position: absolute;
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 16px;
  box-sizing: border-box;
`;

const PreviewContent = ({ previewComponent, previewProps }: PreviewContentProps) => {
  const element = useMemo(() => document.getElementById('cms-root'), []);

  return useMemo(() => {
    if (!element) {
      return null;
    }

    let children: ReactNode;
    if (!previewComponent) {
      children = null;
    } else if (React.isValidElement(previewComponent)) {
      children = React.cloneElement(previewComponent, previewProps);
    } else {
      children = React.createElement(previewComponent, previewProps);
    }

    return ReactDOM.createPortal(
      <ScrollSyncPane>
        <StyledPreviewContent className="preview-content">{children}</StyledPreviewContent>
      </ScrollSyncPane>,
      element,
      'preview-content',
    );
  }, [previewComponent, previewProps, element]);
};

export default PreviewContent;
