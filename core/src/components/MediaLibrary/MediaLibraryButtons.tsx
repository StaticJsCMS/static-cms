import Button from '@mui/material/Button';
import copyToClipboard from 'copy-text-to-clipboard';
import React, { useCallback, useEffect, useState } from 'react';

import { isAbsolutePath } from '../../lib/util';

import type { TranslatedProps } from '../../interface';

export interface CopyToClipBoardButtonProps {
  disabled: boolean;
  draft?: boolean;
  path?: string;
  name?: string;
}

export const CopyToClipBoardButton = ({
  disabled,
  draft,
  path,
  name,
  t,
}: TranslatedProps<CopyToClipBoardButtonProps>) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;

    const timer = setTimeout(() => {
      if (alive) {
        setCopied(false);
      }
    }, 1500);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  const handleCopy = useCallback(() => {
    if (!path || !name) {
      return;
    }

    copyToClipboard(isAbsolutePath(path) || !draft ? path : name);
    setCopied(true);
  }, [draft, name, path]);

  const getTitle = useCallback(() => {
    if (copied) {
      return t('mediaLibrary.mediaLibraryCard.copied');
    }

    if (!path) {
      return t('mediaLibrary.mediaLibraryCard.copy');
    }

    if (isAbsolutePath(path)) {
      return t('mediaLibrary.mediaLibraryCard.copyUrl');
    }

    if (draft) {
      return t('mediaLibrary.mediaLibraryCard.copyName');
    }

    return t('mediaLibrary.mediaLibraryCard.copyPath');
  }, [copied, draft, path, t]);

  return (
    <Button color="inherit" variant="contained" onClick={handleCopy} disabled={disabled}>
      {getTitle()}
    </Button>
  );
};
