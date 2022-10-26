import { useMemo } from 'react';

import { getMarkdownEditorOptions } from '../../../lib/registry';

const useEditorOptions = () => {
  return useMemo(() => {
    const {
      initialEditType = 'wysiwyg',
      height = '600px',
      plugins = [],
      ...markdownEditorOptions
    } = getMarkdownEditorOptions();

    return {
      initialEditType,
      height,
      plugins,
      ...markdownEditorOptions,
    };
  }, []);
};

export default useEditorOptions;
