import { evaluate } from '@mdx-js/mdx';
import * as provider from '@mdx-js/react';
import { useCallback, useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import { Compatible, VFile } from 'vfile';
import { VFileMessage } from 'vfile-message';

import useDebounce from '@staticcms/core/lib/hooks/useDebounce';
import useDebouncedCallback from '@staticcms/core/lib/hooks/useDebouncedCallback';
import remarkGfm from '../serialization/gfm';
import flattenListItemParagraphs from '../serialization/slate/flattenListItemParagraphs';

export interface UseMdxState {
  file: VFile | null;
}

export default function useMdx(
  name: string,
  input: string,
): [UseMdxState, (value: string) => void] {
  const [state, setState] = useState<UseMdxState>({ file: null });

  const setValueCallback = useCallback(
    async (value: string) => {
      const file = new VFile({ basename: name, value });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {
        ...provider,
        ...runtime,
        useDynamicImport: true,
        remarkPlugins: [remarkGfm, flattenListItemParagraphs],
      };

      try {
        file.result = (await evaluate(file as Readonly<Compatible>, options)).default;
      } catch (error) {
        const message = error instanceof VFileMessage ? error : new VFileMessage(String(error));

        if (!file.messages.includes(message)) {
          file.messages.push(message);
        }

        message.fatal = true;
      }

      setState({ file });
    },
    [name],
  );

  const setValue = useDebouncedCallback(setValueCallback, 100);
  const debouncedState = useDebounce(state, 150);

  useEffect(() => {
    setValue(input);
  }, [input, setValue]);

  return [debouncedState, setValue];
}
