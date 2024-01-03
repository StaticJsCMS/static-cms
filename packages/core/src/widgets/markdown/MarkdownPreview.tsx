import { MDXProvider } from '@mdx-js/react';
import React, { useEffect, useMemo, useState } from 'react';
import { VFileMessage } from 'vfile-message';

import { withMdxImage } from '@staticcms/core/components/common/image/Image';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { getShortcodes } from '../../lib/registry';
import withShortcodeMdxComponent from './mdx/withShortcodeMdxComponent';
import useMdx from './plate/hooks/useMdx';
import { processShortcodeConfigToMdx } from './plate/serialization/slate/processShortcodeConfig';

import type { MarkdownField, WidgetPreviewProps } from '@staticcms/core';
import type { FC } from 'react';
import type { UseMdxState } from './plate/hooks/useMdx';

const classes = generateClassNames('WidgetUUIDPreview', ['root']);

interface MdxComponentProps {
  state: UseMdxState;
}

// Create a preview component that can handle errors with try-catch block; for catching invalid JS expressions errors that ErrorBoundary cannot catch.
const MdxComponent: FC<MdxComponentProps> = ({ state }) => {
  const Result = useMemo(() => state.file?.result as FC | undefined, [state]);

  if (!Result) {
    return null;
  }

  try {
    return <Result key="result" />;
  } catch (error) {
    const message = new VFileMessage(String(error));
    message.fatal = true;

    return (
      <pre key="error">
        <code>{String(message)}</code>
      </pre>
    );
  }
};

const MarkdownPreview: FC<WidgetPreviewProps<string, MarkdownField>> = previewProps => {
  const { value, collection, field } = previewProps;

  const id = useUUID();

  const components = useMemo(
    () => ({
      Shortcode: withShortcodeMdxComponent({ previewProps }),
      img: withMdxImage({ collection, field }),
    }),
    [collection, field, previewProps],
  );

  const [state, setValue] = useMdx(`editor-${id}.mdx`, value ?? '');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  useEffect(() => {
    if (prevValue !== value) {
      const parsedValue = processShortcodeConfigToMdx(getShortcodes(), value ?? '');
      setPrevValue(parsedValue);
      setValue(parsedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div key="markdown-preview" className={classes.root}>
      <MDXProvider components={components}>
        <MdxComponent state={state} />{' '}
      </MDXProvider>
    </div>
  );
};

export default MarkdownPreview;
