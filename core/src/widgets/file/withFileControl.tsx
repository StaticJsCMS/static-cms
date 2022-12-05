import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import ObjectWidgetTopBar from '@staticcms/core/components/UI/ObjectWidgetTopBar';
import Outline from '@staticcms/core/components/UI/Outline';
import { borders, effects, lengths, shadows } from '@staticcms/core/components/UI/styles';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { basename, transientOptions } from '@staticcms/core/lib/util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';

import type {
  Collection,
  Entry,
  FileOrImageField,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC, MouseEvent, MouseEventHandler } from 'react';

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
          display: none;
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
  value: string;
  collection: Collection<FileOrImageField>;
  field: FileOrImageField;
  entry: Entry;
}

const Image: FC<ImageProps> = ({ value, collection, field, entry }) => {
  const assetSource = useMediaAsset(value, collection, field, entry);

  return <StyledImage key="image" role="presentation" src={assetSource} />;
};

interface SortableImageButtonsProps {
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImageButtons: FC<SortableImageButtonsProps> = ({ onRemove, onReplace }) => {
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
  collection: Collection<FileOrImageField>;
  field: FileOrImageField;
  entry: Entry;
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImage: FC<SortableImageProps> = ({
  itemValue,
  collection,
  field,
  entry,
  onRemove,
  onReplace,
}: SortableImageProps) => {
  return (
    <div>
      <ImageWrapper key="image-wrapper" $sortable>
        <Image key="image" value={itemValue} collection={collection} field={field} entry={entry} />
      </ImageWrapper>
      <SortableImageButtons
        key="image-buttons"
        onRemove={onRemove}
        onReplace={onReplace}
      ></SortableImageButtons>
    </div>
  );
};

const StyledMultiImageWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

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

export function getValidFileValue(value: string | string[] | null | undefined) {
  if (value) {
    return isMultiple(value) ? value.map(v => basename(v)) : basename(value);
  }

  return value;
}

export interface WithFileControlProps {
  forImage?: boolean;
}

const withFileControl = ({ forImage = false }: WithFileControlProps = {}) => {
  const FileControl: FC<WidgetControlProps<string | string[], FileOrImageField>> = memo(
    ({
      value,
      collection,
      field,
      entry,
      onChange,
      openMediaLibrary,
      clearMediaControl,
      removeMediaControl,
      hasErrors,
      t,
    }) => {
      const controlID = useUUID();
      const [collapsed, setCollapsed] = useState(false);
      const [internalValue, setInternalValue] = useState(value ?? '');

      const handleOnChange = useCallback(
        (newValue: string | string[]) => {
          if (newValue !== internalValue) {
            setInternalValue(newValue);
            setTimeout(() => {
              onChange(newValue);
            });
          }
        },
        [internalValue, onChange],
      );

      const handleOpenMediaLibrary = useMediaInsert(
        internalValue,
        { field, controlID },
        handleOnChange,
      );

      const handleCollapseToggle = useCallback(() => {
        setCollapsed(!collapsed);
      }, [collapsed]);

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

      const handleUrl = useCallback(
        (subject: 'image' | 'file') => (e: MouseEvent) => {
          e.preventDefault();

          const url = window.prompt(t(`editor.editorWidgets.${subject}.promptUrl`));

          handleOnChange(url ?? '');
        },
        [handleOnChange, t],
      );

      const handleRemove = useCallback(
        (e: MouseEvent) => {
          e.preventDefault();
          clearMediaControl(controlID);
          handleOnChange('');
        },
        [clearMediaControl, controlID, handleOnChange],
      );

      const onRemoveOne = useCallback(
        (index: number) => () => {
          if (Array.isArray(internalValue)) {
            const newValue = [...internalValue];
            newValue.splice(index, 1);
            handleOnChange(newValue);
          }
        },
        [handleOnChange, internalValue],
      );

      const onReplaceOne = useCallback(
        (index: number) => () => {
          return openMediaLibrary({
            controlID,
            forImage,
            value: internalValue,
            replaceIndex: index,
            allowMultiple: false,
            config,
            field,
          });
        },
        [config, controlID, field, openMediaLibrary, internalValue],
      );

      // TODO Readd when multiple uploads is supported
      // const onSortEnd = useCallback(
      //   ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      //     if (Array.isArray(internalValue)) {
      //       const newValue = arrayMoveImmutable(internalValue, oldIndex, newIndex);
      //       handleOnChange(newValue);
      //     }
      //   },
      //   [handleOnChange, internalValue],
      // );

      const renderFileLink = useCallback((link: string | undefined | null) => {
        const size = MAX_DISPLAY_LENGTH;
        if (!link || link.length <= size) {
          return link;
        }
        const text = `${link.slice(0, size / 2)}\u2026${link.slice(-(size / 2) + 1)}`;
        return (
          <FileLink key={`file-link-${text}`} href={link} rel="noopener" target="_blank">
            {text}
          </FileLink>
        );
      }, []);

      const renderedImagesLinks = useMemo(() => {
        if (forImage) {
          if (!internalValue) {
            return null;
          }

          if (isMultiple(internalValue)) {
            return (
              <StyledMultiImageWrapper key="multi-image-wrapper">
                {internalValue.map((itemValue, index) => (
                  <SortableImage
                    key={`item-${itemValue}`}
                    itemValue={itemValue}
                    collection={collection}
                    field={field}
                    entry={entry}
                    onRemove={onRemoveOne(index)}
                    onReplace={onReplaceOne(index)}
                  />
                ))}
              </StyledMultiImageWrapper>
            );
          }

          return (
            <ImageWrapper key="single-image-wrapper">
              <Image
                key="single-image"
                value={internalValue}
                collection={collection}
                field={field}
                entry={entry}
              />
            </ImageWrapper>
          );
        }

        if (isMultiple(internalValue)) {
          return (
            <FileLinks key="mulitple-file-links">
              <FileLinkList key="file-links-list">
                {internalValue.map(val => (
                  <li key={val}>{renderFileLink(val)}</li>
                ))}
              </FileLinkList>
            </FileLinks>
          );
        }

        return <FileLinks key="single-file-links">{renderFileLink(internalValue)}</FileLinks>;
      }, [collection, entry, field, internalValue, onRemoveOne, onReplaceOne, renderFileLink]);

      const content = useMemo(() => {
        const subject = forImage ? 'image' : 'file';

        if (Array.isArray(internalValue) ? internalValue.length === 0 : isEmpty(internalValue)) {
          return (
            <StyledButtonWrapper>
              <Button
                color="primary"
                variant="outlined"
                key="upload"
                onClick={handleOpenMediaLibrary}
              >
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
            {renderedImagesLinks}
            <StyledButtonWrapper key="controls">
              <Button
                color="primary"
                variant="outlined"
                key="add-replace"
                onClick={handleOpenMediaLibrary}
              >
                {t(
                  `editor.editorWidgets.${subject}.${
                    allowsMultiple ? 'addMore' : 'chooseDifferent'
                  }`,
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
        internalValue,
        renderedImagesLinks,
        handleOpenMediaLibrary,
        t,
        allowsMultiple,
        chooseUrl,
        handleUrl,
        handleRemove,
      ]);

      return useMemo(
        () => (
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
        ),
        [collapsed, content, field.label, field.name, handleCollapseToggle, hasErrors, t],
      );
    },
  );

  FileControl.displayName = 'FileControl';

  return FileControl;
};

export default withFileControl;
