import { useMemo } from 'react';

import useImageToolbarButton from '../toolbar/useImageToolbarButton';

import type { MarkdownEditorOptions } from '../../../interface';

const useToolbarItems = (
  toolbarItems: MarkdownEditorOptions['toolbarItems'],
  openMediaLibrary: (forImage: boolean) => void,
) => {
  const imageToolbarButton = useImageToolbarButton({
    openMediaLibrary,
  });

  return useMemo(() => {
    let items = [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', imageToolbarButton, 'link'],
      ['code', 'codeblock'],
    ];

    if (toolbarItems) {
      items = toolbarItems({ imageToolbarButton });
    }

    return items;
  }, [imageToolbarButton, toolbarItems]);
};

export default useToolbarItems;
