import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import IconButton from '@mui/material/IconButton';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import React, { useCallback, useEffect, useMemo } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid/v4';

import { basename, transientOptions } from '../../lib/util';
import { borders, buttons, components, effects, lengths, shadows } from '../../ui';

import type { MouseEvent, MouseEventHandler } from 'react';
import type { CmsFieldFileOrImage, CmsWidgetControlProps, GetAssetFunction } from '../../interface';

const MAX_DISPLAY_LENGTH = 50;

interface ImageWrapperProps {
  $sortable?: boolean;
}

const ImageWrapper = styled(
  'div',
  transientOptions,
)<ImageWrapperProps>(
  ({ $sortable }) => `
    flex-basis: 155px;
    width: 155px;
    height: 100px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: ${borders.textField};
    border-radius: ${lengths.borderRadius};
    overflow: hidden;
    ${effects.checkerboard};
    ${shadows.inset};
    cursor: ${$sortable ? 'pointer' : 'auto'};
  `,
);

const SortableImageButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 10px;
  margin-right: 20px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface ImageProps {
  src: string;
}

const Image = ({ src }: ImageProps) => {
  return <StyledImage role="presentation" src={src} />;
};

interface SortableImageButtonsProps {
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImageButtons = ({ onRemove, onReplace }: SortableImageButtonsProps) => {
  return (
    <SortableImageButtonsWrapper>
      <IconButton onClick={onReplace}>
        <PhotoIcon />
      </IconButton>
      <IconButton onClick={onRemove}>
        <CloseIcon />
      </IconButton>
    </SortableImageButtonsWrapper>
  );
};

interface SortableImageProps {
  itemValue: string;
  getAsset: GetAssetFunction;
  field: CmsFieldFileOrImage;
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImage = SortableElement<SortableImageProps>(
  ({ itemValue, getAsset, field, onRemove, onReplace }: SortableImageProps) => {
    return (
      <div>
        <ImageWrapper $sortable>
          <Image src={getAsset(itemValue, field)?.toString() ?? ''} />
        </ImageWrapper>
        <SortableImageButtons onRemove={onRemove} onReplace={onReplace}></SortableImageButtons>
      </div>
    );
  },
);

const StyledSortableMultiImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface SortableMultiImageWrapperProps {
  items: string[];
  getAsset: GetAssetFunction;
  field: CmsFieldFileOrImage;
  onRemoveOne: (index: number) => MouseEventHandler;
  onReplaceOne: (index: number) => MouseEventHandler;
}

const SortableMultiImageWrapper = SortableContainer<SortableMultiImageWrapperProps>(
  ({ items, getAsset, field, onRemoveOne, onReplaceOne }: SortableMultiImageWrapperProps) => {
    return (
      <StyledSortableMultiImageWrapper>
        {items.map((itemValue, index) => (
          <SortableImage
            key={`item-${itemValue}`}
            index={index}
            itemValue={itemValue}
            getAsset={getAsset}
            field={field}
            onRemove={onRemoveOne(index)}
            onReplace={onReplaceOne(index)}
          />
        ))}
      </StyledSortableMultiImageWrapper>
    );
  },
);

const FileLink = styled.a`
  margin-bottom: 20px;
  font-weight: normal;
  color: inherit;

  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`;

const FileLinks = styled.div`
  margin-bottom: 12px;
`;

const FileLinkList = styled.ul`
  list-style-type: none;
`;

const FileWidgetButton = styled.button`
  ${buttons.button};
  ${components.badge};
  margin-bottom: 12px;
`;

const FileWidgetButtonRemove = styled.button`
  ${buttons.button};
  ${components.badgeDanger};
`;

function isMultiple(value: string | string[] | null | undefined): value is string[] {
  return Array.isArray(value);
}

export function getValidValue(value: string | string[] | null | undefined) {
  if (value) {
    return isMultiple(value) ? value.map(v => basename(v)) : basename(value);
  }

  return value;
}

function sizeOfValue(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) {
    return value.length;
  }

  return value ? 1 : 0;
}

interface WithImageOptions {
  forImage?: boolean;
}

export default function withFileControl({ forImage = false }: WithImageOptions = {}) {
  const FileControl = ({
    path,
    value,
    field,
    onChange,
    onOpenMediaLibrary,
    onClearMediaControl,
    onRemoveInsertedMedia,
    onRemoveMediaControl,
    getAsset,
    mediaPaths,
    t,
  }: CmsWidgetControlProps<string | string[], CmsFieldFileOrImage>) => {
    const controlID = useMemo(() => uuid(), []);

    useEffect(() => {
      const mediaPath = mediaPaths[controlID];
      if (mediaPath && mediaPath !== value) {
        onChange(path, field, mediaPath);
      } else if (mediaPath && mediaPath === value) {
        onRemoveInsertedMedia(controlID);
      }
    }, [controlID, field, mediaPaths, onChange, onRemoveInsertedMedia, path, value]);

    useEffect(() => {
      return () => {
        onRemoveMediaControl(controlID);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mediaLibraryFieldOptions = useMemo(() => {
      return field.media_library ?? {};
    }, [field.media_library]);

    const config = useMemo(
      () => ('config' in mediaLibraryFieldOptions ? mediaLibraryFieldOptions.config : undefined),
      [mediaLibraryFieldOptions],
    );

    const allowsMultiple = useMemo(() => {
      return config?.multiple ?? false;
    }, [config?.multiple]);

    const chooseUrl = useMemo(
      () =>
        'choose_url' in mediaLibraryFieldOptions && (mediaLibraryFieldOptions.choose_url ?? true),
      [mediaLibraryFieldOptions],
    );

    const handleChange = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        return onOpenMediaLibrary({
          controlID,
          forImage,
          privateUpload: field.private,
          value: value ?? '',
          allowMultiple:
            'allow_multiple' in mediaLibraryFieldOptions
              ? mediaLibraryFieldOptions.allow_multiple ?? true
              : true,
          config,
          field,
        });
      },
      [config, controlID, field, mediaLibraryFieldOptions, onOpenMediaLibrary, value],
    );

    const handleUrl = useCallback(
      (subject: 'image' | 'file') => (e: MouseEvent) => {
        e.preventDefault();

        const url = window.prompt(t(`editor.editorWidgets.${subject}.promptUrl`));

        return onChange(path, field, url);
      },
      [field, onChange, path, t],
    );

    const handleRemove = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        onClearMediaControl(controlID);
        return onChange(path, field, '');
      },
      [controlID, field, onChange, onClearMediaControl, path],
    );

    const onRemoveOne = useCallback(
      (index: number) => () => {
        if (Array.isArray(value)) {
          value.splice(index, 1);
          return onChange(path, field, sizeOfValue(value) > 0 ? [...value] : null);
        }
      },
      [field, onChange, path, value],
    );

    const onReplaceOne = useCallback(
      (index: number) => () => {
        return onOpenMediaLibrary({
          controlID,
          forImage,
          privateUpload: field.private,
          value: value ?? '',
          replaceIndex: index,
          allowMultiple: false,
          config,
          field,
        });
      },
      [config, controlID, field, onOpenMediaLibrary, value],
    );

    const onSortEnd = useCallback(
      ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        if (Array.isArray(value)) {
          const newValue = arrayMove(value, oldIndex, newIndex);
          return onChange(path, field, newValue);
        }
      },
      [field, onChange, path, value],
    );

    const renderFileLink = useCallback((value: string | undefined | null) => {
      const size = MAX_DISPLAY_LENGTH;
      if (!value || value.length <= size) {
        return value;
      }
      const text = `${value.slice(0, size / 2)}\u2026${value.slice(-(size / 2) + 1)}`;
      return (
        <FileLink href={value} rel="noopener" target="_blank">
          {text}
        </FileLink>
      );
    }, []);

    const renderFileLinks = useCallback(() => {
      if (isMultiple(value)) {
        return (
          <FileLinks>
            <FileLinkList>
              {value.map(val => (
                <li key={val}>{renderFileLink(val)}</li>
              ))}
            </FileLinkList>
          </FileLinks>
        );
      }

      return <FileLinks>{renderFileLink(value)}</FileLinks>;
    }, [renderFileLink, value]);

    const renderImages = useCallback(() => {
      if (!value) {
        return null;
      }

      if (isMultiple(value)) {
        return (
          <SortableMultiImageWrapper
            items={value}
            onSortEnd={onSortEnd}
            onRemoveOne={onRemoveOne}
            onReplaceOne={onReplaceOne}
            distance={4}
            getAsset={getAsset}
            field={field}
            axis="xy"
            lockToContainerEdges={true}
          ></SortableMultiImageWrapper>
        );
      }

      const src = getAsset(value, field)?.toString() ?? '';
      return (
        <ImageWrapper>
          <Image src={src || ''} />
        </ImageWrapper>
      );
    }, [field, getAsset, onRemoveOne, onReplaceOne, onSortEnd, value]);

    const renderSelection = useCallback(
      (subject: 'image' | 'file') => {
        return (
          <div>
            {forImage ? renderImages() : null}
            <div>
              {forImage ? null : renderFileLinks()}
              <FileWidgetButton onClick={handleChange}>
                {t(
                  `editor.editorWidgets.${subject}.${
                    allowsMultiple ? 'addMore' : 'chooseDifferent'
                  }`,
                )}
              </FileWidgetButton>
              {chooseUrl && !allowsMultiple ? (
                <FileWidgetButton onClick={handleUrl(subject)}>
                  {t(`editor.editorWidgets.${subject}.replaceUrl`)}
                </FileWidgetButton>
              ) : null}
              <FileWidgetButtonRemove onClick={handleRemove}>
                {t(`editor.editorWidgets.${subject}.remove${allowsMultiple ? 'All' : ''}`)}
              </FileWidgetButtonRemove>
            </div>
          </div>
        );
      },
      [
        allowsMultiple,
        chooseUrl,
        handleChange,
        handleRemove,
        handleUrl,
        renderFileLinks,
        renderImages,
        t,
      ],
    );

    const renderNoSelection = useCallback(
      (subject: 'image' | 'file') => {
        return (
          <>
            <FileWidgetButton onClick={handleChange}>
              {t(`editor.editorWidgets.${subject}.choose${allowsMultiple ? 'Multiple' : ''}`)}
            </FileWidgetButton>
            {chooseUrl ? (
              <FileWidgetButton onClick={handleUrl(subject)}>
                {t(`editor.editorWidgets.${subject}.chooseUrl`)}
              </FileWidgetButton>
            ) : null}
          </>
        );
      },
      [allowsMultiple, chooseUrl, handleChange, handleUrl, t],
    );

    const subject = forImage ? 'image' : 'file';

    return (
      <div>
        <span>{value ? renderSelection(subject) : renderNoSelection(subject)}</span>
      </div>
    );
  };

  FileControl.displayName = 'FileControl';

  return FileControl;
}
