import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { arrayMoveImmutable } from 'array-move';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import uuid from 'uuid/v4';

import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { borders, effects, lengths, shadows } from '../../components/UI/styles';
import { basename, transientOptions } from '../../lib/util';
import { isEmpty } from '../../lib/util/string.util';

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
    const [assetSource, setAssetSource] = useState('');
    useEffect(() => {
      const getImage = async() => {
        const asset = (await getAsset(itemValue, field))?.toString() ?? '';
        setAssetSource(asset);
      };
  
      getImage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemValue]);

    return (
      <div>
        <ImageWrapper key="image-wrapper" $sortable>
          <Image key="image" src={assetSource} />
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

interface WithImageOptions {
  forImage?: boolean;
}

export default function withFileControl({ forImage = false }: WithImageOptions = {}) {
  const FileControl = memo((props: WidgetControlProps<string | string[], FileOrImageField>) => {
    const {
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
    } = props;

    const controlID = useMemo(() => uuid(), []);
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

    const handleCollapseToggle = useCallback(() => {
      setCollapsed(!collapsed);
    }, [collapsed]);

    useEffect(() => {
      const mediaPath = mediaPaths[controlID];
      if (mediaPath && mediaPath !== internalValue) {
        handleOnChange(mediaPath);
      } else if (mediaPath && mediaPath === internalValue) {
        removeInsertedMedia(controlID);
      }
    }, [controlID, handleOnChange, internalValue, mediaPaths, removeInsertedMedia]);

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

    const handleChange = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        return openMediaLibrary({
          controlID,
          forImage,
          value: internalValue,
          allowMultiple:
            'allow_multiple' in mediaLibraryFieldOptions
              ? mediaLibraryFieldOptions.allow_multiple ?? true
              : true,
          config,
          field,
        });
      },
      [config, controlID, field, mediaLibraryFieldOptions, openMediaLibrary, internalValue],
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

    const onSortEnd = useCallback(
      ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        if (Array.isArray(internalValue)) {
          const newValue = arrayMoveImmutable(internalValue, oldIndex, newIndex);
          handleOnChange(newValue);
        }
      },
      [handleOnChange, internalValue],
    );

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

    const [assetSource, setAssetSource] = useState('');
    useEffect(() => {
      if (Array.isArray(internalValue)) {
        return;
      }

      const getImage = async() => {
        const newValue = (await getAsset(internalValue, field))?.toString() ?? '';
        if (newValue !== internalValue) {
          setAssetSource(newValue);
        }
      };
  
      getImage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [internalValue]);

    const renderedImagesLinks = useMemo(() => {
      if (forImage) {
        if (!internalValue) {
          return null;
        }

        if (isMultiple(internalValue)) {
          return (
            <SortableMultiImageWrapper
              key="mulitple-image-wrapper"
              items={internalValue}
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

        return (
          <ImageWrapper key="single-image-wrapper">
            <Image key="single-image" src={assetSource} />
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
    }, [
      assetSource,
      field,
      getAsset,
      internalValue,
      onRemoveOne,
      onReplaceOne,
      onSortEnd,
      renderFileLink,
    ]);

    const content = useMemo(() => {
      const subject = forImage ? 'image' : 'file';

      if (Array.isArray(internalValue) ? internalValue.length === 0 : isEmpty(internalValue)) {
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
          {renderedImagesLinks}
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
      internalValue,
      renderedImagesLinks,
      handleChange,
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
  });

  FileControl.displayName = 'FileControl';

  return FileControl;
}
