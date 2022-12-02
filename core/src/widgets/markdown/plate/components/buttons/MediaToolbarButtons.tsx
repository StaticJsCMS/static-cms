import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import React, { useEffect, useState } from 'react';

import ImageToolbarButton from './common/ImageToolbarButton';
import LinkToolbarButton from './common/LinkToolbarButton';

import type { Collection, Entry, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';

export interface MediaToolbarButtonsProps {
  containerRef: HTMLElement | null;
  hideUploads?: boolean;
  collection: Collection<MarkdownField>;
  field: MarkdownField;
  entry: Entry;
  inserting?: boolean;
  onMediaToggle?: (open: boolean) => void;
}

const MediaToolbarButtons: FC<MediaToolbarButtonsProps> = ({
  containerRef,
  collection,
  field,
  entry,
  hideUploads = false,
  onMediaToggle,
}) => {
  const [open, setOpen] = useState(false);
  const [linkMediaOpen, setLinkMediaOpen] = useState(false);
  const [imageMediaOpen, setImageMediaOpen] = useState(false);

  useEffect(() => {
    if (open && !linkMediaOpen && !imageMediaOpen) {
      setOpen(false);
      onMediaToggle?.(false);
      return;
    }

    if (!open && (linkMediaOpen || imageMediaOpen)) {
      setOpen(true);
      onMediaToggle?.(true);
      return;
    }
  }, [imageMediaOpen, linkMediaOpen, onMediaToggle, open]);

  return (
    <>
      <LinkToolbarButton
        containerRef={containerRef}
        tooltip="Insert Link"
        key="link-button"
        icon={<LinkIcon />}
        collection={collection}
        field={field}
        entry={entry}
        mediaOpen={linkMediaOpen}
        onMediaToggle={setLinkMediaOpen}
      />
      {!hideUploads ? (
        <ImageToolbarButton
          containerRef={containerRef}
          tooltip="Insert Image"
          key="image-button"
          icon={<ImageIcon />}
          collection={collection}
          field={field}
          entry={entry}
          mediaOpen={imageMediaOpen}
          onMediaToggle={setImageMediaOpen}
        />
      ) : null}
    </>
  );
};

export default MediaToolbarButtons;
