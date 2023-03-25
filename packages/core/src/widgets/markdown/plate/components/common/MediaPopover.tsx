import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useIsMediaAsset from '@staticcms/core/lib/hooks/useIsMediaAsset';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import Button from '@staticcms/core/components/common/button/Button';

import type {
  Collection,
  Entry,
  FileOrImageField,
  MarkdownField,
  MediaPath,
} from '@staticcms/core/interface';
import type { ChangeEvent, KeyboardEvent } from 'react';

export interface MediaPopoverProps<T extends FileOrImageField | MarkdownField> {
  containerRef: HTMLElement | null;
  anchorEl: HTMLElement | null;
  url: string;
  text?: string;
  textLabel?: string;
  inserting?: boolean;
  forImage?: boolean;
  collection: Collection<T>;
  field: T;
  entry: Entry;
  onUrlChange: (newValue: string) => void;
  onTextChange?: (newValue: string) => void;
  onClose: (shouldFocus: boolean) => void;
  onMediaToggle?: (open: boolean) => void;
  onMediaChange: (newValue: string) => void;
  onRemove?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const MediaPopover = <T extends FileOrImageField | MarkdownField>({
  containerRef,
  anchorEl,
  url,
  text,
  textLabel = 'Text',
  inserting = false,
  forImage = false,
  collection,
  field,
  entry,
  onUrlChange,
  onTextChange,
  onClose,
  onMediaToggle,
  onMediaChange,
  onRemove,
  onFocus,
  onBlur,
}: MediaPopoverProps<T>) => {
  useWindowEvent('mediaLibraryClose', () => {
    onMediaToggle?.(false);
  });

  const mediaLibraryFieldOptions = useMemo(() => {
    return field.media_library ?? {};
  }, [field.media_library]);

  const chooseUrl = useMemo(
    () => 'choose_url' in mediaLibraryFieldOptions && (mediaLibraryFieldOptions.choose_url ?? true),
    [mediaLibraryFieldOptions],
  );

  const handleFocus = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

  const handleMediaChange = useCallback(
    (newValue: MediaPath<string>) => {
      onMediaChange(newValue.path);
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
        mt-1
        max-h-60
        overflow-auto
        rounded-md
        bg-white
        py-1
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
      <div key="edit-content" contentEditable={false}>
        <Button onClick={handleOpenMediaLibrary}>{forImage ? 'Edit Image' : 'Edit Link'}</Button>
        <div />
        {!forImage ? (
          <Button href={url}>
            <OpenInNewIcon />
          </Button>
        ) : null}
        <Button onClick={onRemove}>
          <DeleteForeverIcon />
        </Button>
      </div>
    </PopperUnstyled>
  );
};

export default MediaPopover;
