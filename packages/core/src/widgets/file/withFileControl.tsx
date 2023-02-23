import CameraIcon from '@heroicons/react/20/solid/CameraIcon';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Button from '@staticcms/core/components/common/button/Button';
import IconButton from '@staticcms/core/components/common/button/IconButton';
import Field from '@staticcms/core/components/common/field/Field';
import useMediaAsset from '@staticcms/core/lib/hooks/useMediaAsset';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { basename } from '@staticcms/core/lib/util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';

import type {
  Collection,
  Entry,
  FileOrImageField,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC, MouseEvent, MouseEventHandler } from 'react';

const MAX_DISPLAY_LENGTH = 50;
interface ImageProps {
  value: string;
  collection: Collection<FileOrImageField>;
  field: FileOrImageField;
  entry: Entry;
}

const Image: FC<ImageProps> = ({ value, collection, field, entry }) => {
  const assetSource = useMediaAsset(value, collection, field, entry);

  return <img key="image" role="presentation" src={assetSource} />;
};

interface SortableImageButtonsProps {
  onRemove: MouseEventHandler;
  onReplace: MouseEventHandler;
}

const SortableImageButtons: FC<SortableImageButtonsProps> = ({ onRemove, onReplace }) => {
  return (
    <div key="image-buttons-wrapper">
      <IconButton key="image-replace" onClick={onReplace}>
        <CameraIcon key="image-replace-icon" />
      </IconButton>
      <IconButton key="image-remove" onClick={onRemove}>
        <XMarkIcon key="image-remove-icon" />
      </IconButton>
    </div>
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
      <div key="image-wrapper">
        {/* TODO $sortable */}
        <Image key="image" value={itemValue} collection={collection} field={field} entry={entry} />
      </div>
      <SortableImageButtons
        key="image-buttons"
        onRemove={onRemove}
        onReplace={onReplace}
      ></SortableImageButtons>
    </div>
  );
};

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
      label,
      collection,
      field,
      entry,
      errors,
      forSingleList,
      onChange,
      openMediaLibrary,
      clearMediaControl,
      removeMediaControl,
      hasErrors,
      t,
    }) => {
      const controlID = useUUID();
      const [internalValue, setInternalValue] = useState(value ?? '');

      const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

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
        { collection, field, controlID, forImage },
        handleOnChange,
      );

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
            collection,
            field,
          });
        },
        [openMediaLibrary, controlID, internalValue, config, collection, field],
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
          <a key={`file-link-${text}`} href={link} rel="noopener noreferrer" target="_blank">
            {text}
          </a>
        );
      }, []);

      const renderedImagesLinks = useMemo(() => {
        if (forImage) {
          if (!internalValue) {
            return null;
          }

          if (isMultiple(internalValue)) {
            return (
              <div key="multi-image-wrapper">
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
              </div>
            );
          }

          return (
            <div key="single-image-wrapper">
              <Image
                key="single-image"
                value={internalValue}
                collection={collection}
                field={field}
                entry={entry}
              />
            </div>
          );
        }

        if (isMultiple(internalValue)) {
          return (
            <div key="mulitple-file-links">
              <ul key="file-links-list">
                {internalValue.map(val => (
                  <li key={val}>{renderFileLink(val)}</li>
                ))}
              </ul>
            </div>
          );
        }

        return <div key="single-file-links">{renderFileLink(internalValue)}</div>;
      }, [collection, entry, field, internalValue, onRemoveOne, onReplaceOne, renderFileLink]);

      const content: JSX.Element = useMemo(() => {
        const subject = forImage ? 'image' : 'file';

        if (Array.isArray(internalValue) ? internalValue.length === 0 : isEmpty(internalValue)) {
          return (
            <div key="selection" className="flex flex-col gap-2 px-3 pt-2 pb-4">
              <div key="controls" className="flex gap-2">
                <Button
                  buttonRef={uploadButtonRef}
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
              </div>
            </div>
          );
        }

        return (
          <div key="selection" className="flex flex-col gap-2 px-3 pt-2 pb-4">
            {renderedImagesLinks}
            <div key="controls" className="flex gap-2">
              <Button
                buttonRef={uploadButtonRef}
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
            </div>
          </div>
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
          <Field
            inputRef={uploadButtonRef}
            label={label}
            errors={errors}
            noPadding={!hasErrors}
            hint={field.hint}
            forSingleList={forSingleList}
            cursor="pointer"
          >
            {content}
          </Field>
        ),
        [content, errors, field.hint, forSingleList, hasErrors, label],
      );
    },
  );

  FileControl.displayName = 'FileControl';

  return FileControl;
};

export default withFileControl;
