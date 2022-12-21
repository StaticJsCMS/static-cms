import { CursorOverlay } from '@udecode/plate';
import React from 'react';

import cursorStore from './cursorStore';

import type { CursorOverlayProps } from '@udecode/plate';
import type { FC } from 'react';

const CursorOverlayContainer: FC<CursorOverlayProps> = ({ cursors, ...props }) => {
  const dynamicCursors = cursorStore.use.cursors();

  const allCursors = { ...cursors, ...dynamicCursors };

  return <CursorOverlay {...props} cursors={allCursors} />;
};

export default CursorOverlayContainer;
