import { Popper } from '@mui/base/Popper';
import { DeleteForever as DeleteForeverIcon } from '@styled-icons/material/DeleteForever';
import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useCallback, useMemo } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';

import type {
  Collection,
  FileOrImageField,
  MarkdownField,
  MediaPath,
} from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

import './MediaPopover.css';

const classes = generateClassNames('WidgetMarkdown_MediaPopover', [
  'root',
  'content',
  'icon',
  'divider',
]);

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

  const chooseUrl = useMemo(() => field.choose_url ?? true, [field.choose_url]);

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

  const noop = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'edit-popover' : undefined;

  return (
    <Popper
      id={id}
      open={open}
      placement="top"
      anchorEl={anchorEl}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disablePortal
      tabIndex={0}
      slots={{ root: 'div' }}
      className={classes.root}
    >
      <div key="edit-content" contentEditable={false} className={classes.content}>
        <Button onClick={handleOpenMediaLibrary} color="secondary" variant="text" size="small">
          {forImage ? 'Edit Image' : 'Edit Link'}
        </Button>
        <div className={classes.divider} />
        {!forImage ? (
          <Button href={url} color="secondary" variant="text" size="small" onClick={noop}>
            <OpenInNewIcon className={classes.icon} title="Open In New Tab" />
          </Button>
        ) : null}
        <Button onClick={onRemove} color="secondary" variant="text" size="small">
          <DeleteForeverIcon className={classes.icon} title="Delete" />
        </Button>
      </div>
    </Popper>
  );
};

export default MediaPopover;
