import React, { useMemo } from 'react';

import { getShortcode } from '../../../lib/registry';

import type { MarkdownField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface WithShortcodeMdxComponentProps {
  previewProps: WidgetPreviewProps<string, MarkdownField>;
}

interface ShortcodeMdxComponentProps {
  shortcode: string;
  args: string[];
}

const withShortcodeMdxComponent = ({ previewProps }: WithShortcodeMdxComponentProps) => {
  const ShortcodeMdxComponent: FC<ShortcodeMdxComponentProps> = ({ shortcode, args }) => {
    const config = useMemo(() => getShortcode(shortcode), [shortcode]);

    const [ShortcodePreview, props] = useMemo(() => {
      if (!config) {
        return [null, {}];
      }

      const props = config.toProps ? config.toProps(args) : {};
      return [config.preview, props];
    }, [config, args]);

    return ShortcodePreview ? <ShortcodePreview previewProps={previewProps} {...props} /> : null;
  };

  return ShortcodeMdxComponent;
};

export default withShortcodeMdxComponent;
