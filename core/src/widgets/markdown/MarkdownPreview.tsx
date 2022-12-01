import { MDXProvider } from '@mdx-js/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { VFileMessage } from 'vfile-message';

import WidgetPreviewContainer from '@staticcms/core/components/UI/WidgetPreviewContainer';
import useMdx from './plate/hooks/useMdx';

import type { FC } from 'react';
import type { MarkdownField, WidgetPreviewProps } from '@staticcms/core/interface';

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

const MarkdownPreview: FC<WidgetPreviewProps<string, MarkdownField>> = ({ value }) => {
  useEffect(() => {
    // viewer.current?.getInstance().setMarkdown(value ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const [state, setValue] = useMdx(value ?? '');
  const [prevValue, setPrevValue] = useState(value);
  useEffect(() => {
    if (prevValue !== value) {
      setPrevValue(value ?? '');
      setValue(value ?? '');
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

  const components = useMemo(() => ({}), []);

  return useMemo(() => {
    if (!value) {
      return null;
    }

    return (
      <WidgetPreviewContainer>
        {state.file && state.file.result ? (
          <MDXProvider components={components}>
            <MdxComponent />
          </MDXProvider>
        ) : null}
      </WidgetPreviewContainer>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MdxComponent]);
};

export default MarkdownPreview;
