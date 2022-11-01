import { useMemo } from 'react';

import imagePlugin from '../plugins/imagePlugin';

import type { MarkdownEditorOptions, MarkdownPluginFactoryProps } from '../../../interface';

const usePlugins = (
  editorPlugins: MarkdownEditorOptions['plugins'] = [],
  { config, media, field, mode }: MarkdownPluginFactoryProps,
) => {
  return useMemo(() => {
    const plugins = [imagePlugin({ config, media, field, mode })];

    if (plugins) {
      plugins.push(
        ...editorPlugins.map(editorPlugin => editorPlugin({ config, media, field, mode })),
      );
    }

    return plugins;
  }, [config, editorPlugins, field, media, mode]);
};

export default usePlugins;
