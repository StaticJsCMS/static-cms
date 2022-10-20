import { useCallback } from 'react';

import type { EditorProps } from '@toast-ui/react-editor';
import type { PluginContext } from '@toast-ui/editor/types/editor';
import type { Field } from '../interface';

export interface ShortCodePluginProps {
  fields: Field;
}

const useShortCodePlugin = (_props: ShortCodePluginProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugin: Required<EditorProps>['plugins'][number] = useCallback((_context: PluginContext, _options?: any) => {
    return null;
  }, []);

  return plugin;
};

export default useShortCodePlugin;
