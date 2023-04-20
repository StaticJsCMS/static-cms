import PopperUnstyled from '@mui/base/PopperUnstyled';
import { DeleteForever as DeleteForeverIcon } from '@styled-icons/material/DeleteForever';
import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useCallback, useMemo } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';

import type {
  Collection,
  FileOrImageField,
  MarkdownField,
  MediaPath,
} from '@staticcms/core/interface';

export interface MediaPopoverProps<T extends FileOrImageField | MarkdownField> {
  anchorEl: HTMLElement | null;
  url: string;
  text?: string;
  forImage?: boolean;
  collection: Collection<T>;
  field: T;
  onMediaToggle?: (open: boolean) => void;
  onMediaChange: (newValue: MediaPath<string>) => void;
  onRemove?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const MediaPopover = <T extends FileOrImageField | MarkdownField>({
  anchorEl,
  url,
  text,
  forImage = false,
  collection,
  field,
  onMediaToggle,
  onMediaChange,
  onRemove,
  onFocus,
  onBlur,
}: MediaPopoverProps<T>) => {
  useWindowEvent('mediaLibraryClose', () => {
    onMediaToggle?.(false);
  });

  const chooseUrl = useMemo(() => field.choose_url ?? false, [field.choose_url]);

  const handleFocus = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

  const handleMediaChange = useCallback(
    (newValue: MediaPath<string>) => {
      onMediaChange(newValue);
      onMediaToggle?.(false);
    },
    [onMediaChange, onMediaToggle],
  );

  const handleOpenMediaLibrary = useMediaInsert(
    { path: url, alt: text },
    { collection, field, forImage, insertOptions: { chooseUrl, showAlt: true } },
    handleMediaChange,
  );

  const open = Boolean(anchorEl);
  const id = open ? 'edit-popover' : undefined;

  return (
    <PopperUnstyled
      id={id}
      open={open}
      component="div"
      placement="top"
      anchorEl={anchorEl}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disablePortal
      tabIndex={0}
      className="
        absolute
        max-h-60
        overflow-auto
        rounded-md
        bg-white
        p-1
        text-base
        shadow-lg
        ring-1
        ring-black
        ring-opacity-5
        focus:outline-none
        sm:text-sm
        z-40
        dark:bg-slate-700
      "
    >
      <div
        key="edit-content"
        contentEditable={false}
        className="
          flex
          gap-0.5
        "
      >
        <Button onClick={handleOpenMediaLibrary} variant="text" size="small">
          {forImage ? 'Edit Image' : 'Edit Link'}
        </Button>
        <div
          className="
            w-[1px]
            border
            border-gray-100
            dark:border-slate-600
          "
        />
        {!forImage ? (
          <Button href={url} variant="text" size="small">
            <OpenInNewIcon className="w-4 h-4" title="Open In New Tab" />
          </Button>
        ) : null}
        <Button onClick={onRemove} variant="text" size="small">
          <DeleteForeverIcon className="w-4 h-4" title="Delete" />
        </Button>
      </div>
    </PopperUnstyled>
  );
};

export default MediaPopover;
