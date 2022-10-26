import { useEffect, useMemo } from 'react';

import type { ToolbarItemOptions } from '@toast-ui/editor/types/ui';
export interface ImagePluginProps {
  openMediaLibrary: (forImages: boolean) => void;
}

const PREFIX = 'toastui-editor-';

const useImageToolbarButton = ({ openMediaLibrary }: ImagePluginProps): ToolbarItemOptions => {
  const toolbarButton = useMemo(() => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'image toastui-editor-toolbar-icons';
    btn.ariaLabel = 'Insert image';
    btn.setAttribute('style', 'margin: 0;');
    return btn;
  }, []);

  useEffect(() => {
    const handler = () => {
      openMediaLibrary(true);
    };

    toolbarButton.addEventListener('click', handler);

    return () => {
      toolbarButton.removeEventListener('click', handler);
    };
  }, [openMediaLibrary, toolbarButton]);

  const toolbarItem: ToolbarItemOptions = useMemo(
    () => ({
      name: 'cmsimage',
      className: `${PREFIX}toolbar-icons color`,
      el: toolbarButton,
    }),
    [toolbarButton],
  );

  return toolbarItem;
};

export default useImageToolbarButton;
