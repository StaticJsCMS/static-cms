import { MDXProvider } from '@mdx-js/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { VFileMessage } from 'vfile-message';

import { withMdxImage } from '@staticcms/core/components/common/image/Image';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { getShortcodes } from '../../lib/registry';
import withShortcodeMdxComponent from './mdx/withShortcodeMdxComponent';
import useMdx from './plate/hooks/useMdx';
import { processShortcodeConfigToMdx } from './plate/serialization/slate/processShortcodeConfig';

import type { MarkdownField, WidgetPreviewProps } from '@staticcms/core/interface';
import type { FC } from 'react';

interface FallbackComponentProps {
  error: string;
}

function FallbackComponent({ error }: FallbackComponentProps) {
  const message = new VFileMessage(error);
  message.fatal = true;
  return (
    <pre>
      <code>{String(message)}</code>
    </pre>
  );
}

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
  const [prevValue, setPrevValue] = useState('');
  useEffect(() => {
    if (prevValue !== value) {
      const parsedValue = processShortcodeConfigToMdx(getShortcodes(), value ?? '');
      setPrevValue(parsedValue);
      setValue(parsedValue);
    }
  }, [prevValue, setValue, value]);

  // Create a preview component that can handle errors with try-catch block; for catching invalid JS expressions errors that ErrorBoundary cannot catch.
  const MdxComponent = useCallback(() => {
    if (!state.file) {
      return null;
    }

    try {
      return (state.file.result as FC)({});
    } catch (error) {
      return <FallbackComponent error={String(error)} />;
    }
  }, [state.file]);

  return useMemo(() => {
    if (!value) {
      return null;
    }

    return (
      <div>
        {state.file && state.file.result ? (
          <MDXProvider components={components}>
            <MdxComponent />
          </MDXProvider>
        ) : null}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MdxComponent]);
};

export default MarkdownPreview;
