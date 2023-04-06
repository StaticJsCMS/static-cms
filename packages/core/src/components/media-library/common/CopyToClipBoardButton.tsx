import { ContentCopy as ContentCopyIcon } from '@styled-icons/material/ContentCopy';
import copyToClipboard from 'copy-text-to-clipboard';
import React, { useCallback, useEffect, useState } from 'react';
import { translate } from 'react-polyglot';
import Button from '../../common/button/Button';
import { isAbsolute } from 'path';
import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface CopyToClipBoardButtonProps {
  draft?: boolean;
  path?: string;
  name?: string;
}

const CopyToClipBoardButton: FC<TranslatedProps<CopyToClipBoardButtonProps>> = ({
  draft,
  path,
  name,
  t,
}) => {
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

    copyToClipboard(isAbsolute(path) || !draft ? path : name);
    setCopied(true);
  }, [draft, name, path]);

  const getTitle = useCallback(() => {
    if (copied) {
      return t('mediaLibrary.mediaLibraryCard.copied');
    }

    if (!path) {
      return t('mediaLibrary.mediaLibraryCard.copy');
    }

    if (isAbsolute(path)) {
      return t('mediaLibrary.mediaLibraryCard.copyUrl');
    }

    if (draft) {
      return t('mediaLibrary.mediaLibraryCard.copyName');
    }

    return t('mediaLibrary.mediaLibraryCard.copyPath');
  }, [copied, draft, path, t]);

  return (
    <Button
      variant="text"
      title={getTitle()}
      onClick={handleCopy}
      className="
        text-white
        dark:text-white
        bg-gray-900/25
        dark:hover:text-white
        dark:hover:bg-blue-800/80
      "
    >
      <ContentCopyIcon className="w-5 h-5" />
    </Button>
  );
};

export default translate()(CopyToClipBoardButton) as FC<CopyToClipBoardButtonProps>;
