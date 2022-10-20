import { useMemo } from 'react';

import type { EditorProps } from '@toast-ui/react-editor';
import type { Field } from '../interface';

export interface ShortCodePluginProps {
  fields: Field;
}

const useShortCodePlugin = ({ fields }: ShortCodePluginProps) => {
  const plugin: Required<EditorProps>['plugins'][number] = useMemo((context, options) => {
    return null;
  }, []);

  return plugin;
};

export default useShortCodePlugin;
