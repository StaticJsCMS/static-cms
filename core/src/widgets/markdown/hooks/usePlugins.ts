import { useMemo } from 'react';

import imagePlugin from '../plugins/imagePlugin';

import type { MarkdownEditorOptions, MarkdownPluginFactoryProps } from '../../../interface';

const usePlugins = (
  editorPlugins: MarkdownEditorOptions['plugins'] = [],
  { getAsset, field, mode }: MarkdownPluginFactoryProps,
) => {
  return useMemo(() => {
    const plugins = [imagePlugin({ getAsset, field, mode })];

    if (plugins) {
      plugins.push(...editorPlugins.map(editorPlugin => editorPlugin({ getAsset, field, mode })));
    }

    return plugins;
  }, [editorPlugins, field, getAsset, mode]);
};

export default usePlugins;
