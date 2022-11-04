import React from 'react';
import { styled } from '@mui/material/styles';

import type { ReactNode } from 'react';

const StyledWidgetPreviewContainer = styled('div')`
  margin: 15px 2px;
`;

interface WidgetPreviewContainerProps {
  children?: ReactNode;
}

const WidgetPreviewContainer = ({ children }: WidgetPreviewContainerProps) => {
  return <StyledWidgetPreviewContainer>{children}</StyledWidgetPreviewContainer>;
};

export default WidgetPreviewContainer;
