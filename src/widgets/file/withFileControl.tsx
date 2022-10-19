import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid/v4';

import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { borders, effects, lengths, shadows } from '../../components/UI/styles';
import { basename, transientOptions } from '../../lib/util';

import type { MouseEvent, MouseEventHandler } from 'react';
import type { FileOrImageField, GetAssetFunction, WidgetControlProps } from '../../interface';

const MAX_DISPLAY_LENGTH = 50;

const StyledFileControlWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

interface StyledFileControlContentProps {
  $collapsed: boolean;
}

const StyledFileControlContent = styled(
  'div',
  transientOptions,
)<StyledFileControlContentProps>(
  ({ $collapsed }) => `
    display: flex;
    flex-direction: column;
    gap: 16px;
    ${
      $collapsed
        ? `
          visibility: hidden;
          height: 0;
          width: 0;
        `
        : `
          padding: 16px;
        `
    }
  `,
);

const StyledSelection = styled('div')`
  display: flex;
  flex-direction: column;
`;

const StyledButtonWrapper = styled('div')`
  display: flex;
  gap: 16px;
`;

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

const SortableImageButtonsWrapper = styled('div')`
  display: flex;
  justify-content: center;
  column-gap: 10px;
  margin-right: 20px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const StyledImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface ImageProps {
  src: string;
}

const Image = ({ src }: ImageProps) => {
  return <StyledImage key="image" role="presentation" src={src} />;
};

interface SortableImageButtonsProps {
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImageButtons = ({ onRemove, onReplace }: SortableImageButtonsProps) => {
  return (
    <SortableImageButtonsWrapper key="image-buttons-wrapper">
      <IconButton key="image-replace" onClick={onReplace}>
        <PhotoIcon key="image-replace-icon" />
      </IconButton>
      <IconButton key="image-remove" onClick={onRemove}>
        <CloseIcon key="image-remove-icon" />
      </IconButton>
    </SortableImageButtonsWrapper>
  );
};

interface SortableImageProps {
  itemValue: string;
  getAsset: GetAssetFunction;
  field: FileOrImageField;
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImage = SortableElement<SortableImageProps>(
  ({ itemValue, getAsset, field, onRemove, onReplace }: SortableImageProps) => {
    return (
      <div>
        <ImageWrapper key="image-wrapper" $sortable>
          <Image key="image" src={getAsset(itemValue, field)?.toString() ?? ''} />
        </ImageWrapper>
        <SortableImageButtons
          key="image-buttons"
          onRemove={onRemove}
          onReplace={onReplace}
        ></SortableImageButtons>
      </div>
    );
  },
);

const StyledSortableMultiImageWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

interface SortableMultiImageWrapperProps {
  items: string[];
  getAsset: GetAssetFunction;
  field: FileOrImageField;
  onRemoveOne: (index: number) => MouseEventHandler;
  onReplaceOne: (index: number) => MouseEventHandler;
}

const SortableMultiImageWrapper = SortableContainer<SortableMultiImageWrapperProps>(
  ({ items, getAsset, field, onRemoveOne, onReplaceOne }: SortableMultiImageWrapperProps) => {
    return (
      <StyledSortableMultiImageWrapper key="multi-image-wrapper">
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

const FileLink = styled('a')`
  margin-bottom: 20px;
  font-weight: normal;
  color: inherit;

  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`;

const FileLinks = styled('div')`
  margin-bottom: 12px;
`;

const FileLinkList = styled('ul')`
  list-style-type: none;
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
    openMediaLibrary,
    clearMediaControl,
    removeInsertedMedia,
    removeMediaControl,
    getAsset,
    mediaPaths,
    hasErrors,
    t,
  }: WidgetControlProps<string | string[], FileOrImageField>) => {
    const controlID = useMemo(() => uuid(), []);
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapseToggle = useCallback(() => {
      setCollapsed(!collapsed);
    }, [collapsed]);

    useEffect(() => {
      const mediaPath = mediaPaths[controlID];
      if (mediaPath && mediaPath !== value) {
        onChange(mediaPath);
      } else if (mediaPath && mediaPath === value) {
        removeInsertedMedia(controlID);
      }
    }, [controlID, field, mediaPaths, onChange, removeInsertedMedia, path, value]);

    useEffect(() => {
      return () => {
        removeMediaControl(controlID);
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

    console.log('mediaLibraryFieldOptions', mediaLibraryFieldOptions);

    const handleChange = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        return openMediaLibrary({
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
      [config, controlID, field, mediaLibraryFieldOptions, openMediaLibrary, value],
    );

    const handleUrl = useCallback(
      (subject: 'image' | 'file') => (e: MouseEvent) => {
        e.preventDefault();

        const url = window.prompt(t(`editor.editorWidgets.${subject}.promptUrl`));

        return onChange(url);
      },
      [onChange, t],
    );

    const handleRemove = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        clearMediaControl(controlID);
        return onChange('');
      },
      [controlID, onChange, clearMediaControl],
    );

    const onRemoveOne = useCallback(
      (index: number) => () => {
        if (Array.isArray(value)) {
          value.splice(index, 1);
          return onChange(sizeOfValue(value) > 0 ? [...value] : null);
        }
      },
      [onChange, value],
    );

    const onReplaceOne = useCallback(
      (index: number) => () => {
        return openMediaLibrary({
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
      [config, controlID, field, openMediaLibrary, value],
    );

    const onSortEnd = useCallback(
      ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        if (Array.isArray(value)) {
          const newValue = arrayMove(value, oldIndex, newIndex);
          return onChange(newValue);
        }
      },
      [onChange, value],
    );

    const renderFileLink = useCallback((value: string | undefined | null) => {
      const size = MAX_DISPLAY_LENGTH;
      if (!value || value.length <= size) {
        return value;
      }
      const text = `${value.slice(0, size / 2)}\u2026${value.slice(-(size / 2) + 1)}`;
      return (
        <FileLink key={`file-link-${text}`} href={value} rel="noopener" target="_blank">
          {text}
        </FileLink>
      );
    }, []);

    const renderFileLinks = useCallback(() => {
      if (isMultiple(value)) {
        return (
          <FileLinks key="mulitple-file-links">
            <FileLinkList key="file-links-list">
              {value.map(val => (
                <li key={val}>{renderFileLink(val)}</li>
              ))}
            </FileLinkList>
          </FileLinks>
        );
      }

      return <FileLinks key="single-file-links">{renderFileLink(value)}</FileLinks>;
    }, [renderFileLink, value]);

    const renderImages = useCallback(() => {
      if (!value) {
        return null;
      }

      if (isMultiple(value)) {
        return (
          <SortableMultiImageWrapper
            key="mulitple-image-wrapper"
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
        <ImageWrapper key="single-image-wrapper">
          <Image key="single-image" src={src || ''} />
        </ImageWrapper>
      );
    }, [field, getAsset, onRemoveOne, onReplaceOne, onSortEnd, value]);

    const content = useMemo(() => {
      const subject = forImage ? 'image' : 'file';

      if (!value) {
        return (
          <StyledButtonWrapper>
            <Button color="primary" variant="outlined" key="upload" onClick={handleChange}>
              {t(`editor.editorWidgets.${subject}.choose${allowsMultiple ? 'Multiple' : ''}`)}
            </Button>
            {chooseUrl ? (
              <Button
                color="primary"
                variant="outlined"
                key="choose-url"
                onClick={handleUrl(subject)}
              >
                {t(`editor.editorWidgets.${subject}.chooseUrl`)}
              </Button>
            ) : null}
          </StyledButtonWrapper>
        );
      }

      return (
        <StyledSelection key="selection">
          {forImage ? renderImages() : renderFileLinks()}
          <StyledButtonWrapper key="controls">
            <Button color="primary" variant="outlined" key="add-replace" onClick={handleChange}>
              {t(
                `editor.editorWidgets.${subject}.${allowsMultiple ? 'addMore' : 'chooseDifferent'}`,
              )}
            </Button>
            {chooseUrl && !allowsMultiple ? (
              <Button
                color="primary"
                variant="outlined"
                key="replace-url"
                onClick={handleUrl(subject)}
              >
                {t(`editor.editorWidgets.${subject}.replaceUrl`)}
              </Button>
            ) : null}
            <Button color="error" variant="outlined" key="remove" onClick={handleRemove}>
              {t(`editor.editorWidgets.${subject}.remove${allowsMultiple ? 'All' : ''}`)}
            </Button>
          </StyledButtonWrapper>
        </StyledSelection>
      );
    }, [
      allowsMultiple,
      chooseUrl,
      handleChange,
      handleRemove,
      handleUrl,
      renderFileLinks,
      renderImages,
      t,
      value,
    ]);

    return (
      <StyledFileControlWrapper key="file-control-wrapper">
        <ObjectWidgetTopBar
          key="file-control-top-bar"
          collapsed={collapsed}
          onCollapseToggle={handleCollapseToggle}
          heading={field.label ?? field.name}
          hasError={hasErrors}
          t={t}
        />
        <StyledFileControlContent $collapsed={collapsed}>{content}</StyledFileControlContent>
        <Outline hasError={hasErrors} />
      </StyledFileControlWrapper>
    );
  };

  FileControl.displayName = 'FileControl';

  return FileControl;
}
