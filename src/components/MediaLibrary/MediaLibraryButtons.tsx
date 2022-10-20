import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import copyToClipboard from 'copy-text-to-clipboard';
import Button from '@mui/material/Button';

import { buttons, shadows, zIndex } from '../../components/UI/styles';
import { isAbsolutePath } from '../../lib/util';
import { FileUploadButton } from '../UI';

import type { TranslatedProps } from '../../interface';

const styles = {
  button: css`
    ${buttons.button};
    ${buttons.default};
    display: inline-block;
    margin-left: 15px;
    margin-right: 2px;

    &[disabled] {
      ${buttons.disabled};
      cursor: default;
    }
  `,
};

export const UploadButton = styled(FileUploadButton)`
  ${styles.button};
  ${buttons.gray};
  ${shadows.dropMain};
  margin-bottom: 0;

  span {
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 0.1px;
    width: 0.1px;
    margin: 0;
    padding: 0;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: ${zIndex.zIndex0};
    outline: none;
  }
`;

export const DeleteButton = styled('button')`
  ${styles.button};
  ${buttons.lightRed};
`;

export const InsertButton = styled('button')`
  ${styles.button};
  ${buttons.green};
`;

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
