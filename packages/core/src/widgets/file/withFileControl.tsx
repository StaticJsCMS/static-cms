import { DndContext, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Button from '@staticcms/core/components/common/button/Button';
import Field from '@staticcms/core/components/common/field/Field';
import Image from '@staticcms/core/components/common/image/Image';
import Link from '@staticcms/core/components/common/link/Link';
import useDragHandlers from '@staticcms/core/lib/hooks/useDragHandlers';
import useMediaInsert from '@staticcms/core/lib/hooks/useMediaInsert';
import useMediaPersist from '@staticcms/core/lib/hooks/useMediaPersist';
import useUUID from '@staticcms/core/lib/hooks/useUUID';
import { basename } from '@staticcms/core/lib/util';
import classNames from '@staticcms/core/lib/util/classNames.util';
import { KeyboardSensor, PointerSensor } from '@staticcms/core/lib/util/dnd.util';
import { isEmpty } from '@staticcms/core/lib/util/string.util';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { useAppSelector } from '@staticcms/core/store/hooks';
import widgetFileImageClasses from './FileImageControl.classes';
import SortableImage from './components/SortableImage';
import SortableLink from './components/SortableLink';

import type { DragEndEvent } from '@dnd-kit/core';
import type { FileOrImageField, MediaPath, WidgetControlProps } from '@staticcms/core/interface';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
import type { FC, MouseEvent } from 'react';

import './FileImageControl.css';

const MAX_DISPLAY_LENGTH = 50;

function isMultiple(value: string | string[] | null | undefined): value is string[] {
  return Array.isArray(value);
}

export function getValidFileValue(value: string | string[] | null | undefined) {
  if (value) {
    return isMultiple(value) ? value.map(v => basename(v)) : basename(value);
  }

  return value;
}

export interface FileControlState {
  keys: string[];
  internalRawValue: string | string[];
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
      errors,
      forSingleList,
      duplicate,
      onChange,
      hasErrors,
      disabled,
      t,
    }) => {
      const controlID = useUUID();

      const allowsMultiple = useMemo(() => {
        return field.multiple ?? false;
      }, [field.multiple]);

      const emptyValue = useMemo(() => (allowsMultiple ? [] : ''), [allowsMultiple]);

      const [{ keys, internalRawValue }, setState] = useState<FileControlState>(() => {
        const incomingValue = value ?? emptyValue;
        return {
          keys: Array.from(
            { length: Array.isArray(incomingValue) ? incomingValue.length : 1 },
            () => uuid(),
          ),
          internalRawValue: incomingValue,
        };
      });
      const internalValue = useMemo(
        () => (duplicate ? value ?? emptyValue : internalRawValue),
        [duplicate, value, emptyValue, internalRawValue],
      );

      const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

      const forFolder = useMemo(() => field.select_folder ?? false, [field.select_folder]);

      const handleOnChange = useCallback(
        ({ path: newValue }: MediaPath, providedNewKeys?: string[]) => {
          if (newValue !== internalValue) {
            const newKeys = [...(providedNewKeys ?? keys)];
            if (Array.isArray(newValue)) {
              while (newKeys.length < newValue.length) {
                newKeys.push(uuid());
              }
            }
            setState({
              keys: newKeys,
              internalRawValue: newValue,
            });

            setTimeout(() => {
              onChange(newValue);
            });
          }
        },
        [internalValue, keys, onChange],
      );

      const handleOpenMediaLibrary = useMediaInsert(
        { path: internalValue },
        {
          collection,
          field,
          controlID,
          forImage,
          forFolder,
          insertOptions: {
            chooseUrl: field.choose_url,
          },
        },
        handleOnChange,
      );

      const config = useAppSelector(selectConfig);

      const handlePersistCallback = useCallback(
        (_files: File[], assetProxies: (AssetProxy | null)[]) => {
          const newPath = allowsMultiple
            ? [
                ...(Array.isArray(internalValue) ? internalValue : [internalValue]),
                ...assetProxies.filter(f => f).map(f => f!.path),
              ]
            : assetProxies[0]?.path;

          if ((Array.isArray(newPath) && newPath.length === 0) || !newPath) {
            return;
          }

          handleOnChange({
            path: newPath,
          });
        },
        [allowsMultiple, handleOnChange, internalValue],
      );

      /**
       * Upload a file.
       */
      const handlePersist = useMediaPersist({
        mediaConfig: field.media_library ?? config?.media_library,
        field,
        callback: handlePersistCallback,
      });

      const { dragOverActive, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } =
        useDragHandlers(handlePersist);

      const chooseUrl = useMemo(() => field.choose_url ?? false, [field.choose_url]);

      const handleUrl = useCallback(
        (subject: 'image' | 'folder' | 'file') => (e: MouseEvent) => {
          e.preventDefault();

          const url = window.prompt(t(`editor.editorWidgets.${subject}.promptUrl`)) ?? '';
          if (url === '') {
            return;
          }

          handleOnChange({
            path: allowsMultiple
              ? [...(Array.isArray(internalValue) ? internalValue : [internalValue]), url]
              : url,
          });
        },
        [allowsMultiple, handleOnChange, internalValue, t],
      );

      const handleRemove = useCallback(
        (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          handleOnChange({ path: '' });
        },
        [handleOnChange],
      );

      const onRemoveOne = useCallback(
        (index: number) => () => {
          if (Array.isArray(internalValue)) {
            const newValue = [...internalValue];
            const newKeys = [...keys];
            newValue.splice(index, 1);
            newKeys.splice(index, 1);
            handleOnChange({ path: newValue }, newKeys);
          }
        },
        [handleOnChange, internalValue, keys],
      );

      const onReplaceOne = useCallback(
        (replaceIndex: number) => (e: MouseEvent) => {
          handleOpenMediaLibrary(e, { replaceIndex });
        },
        [handleOpenMediaLibrary],
      );

      const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      );

      const onSortEnd = useCallback(
        ({ active, over }: DragEndEvent) => {
          if (Array.isArray(internalValue) && over && active.id !== over.id) {
            const oldIndex = keys.indexOf(`${active.id}`);
            const newIndex = keys.indexOf(`${over.id}`);

            const newKeys = arrayMove(keys, oldIndex, newIndex);
            const newValue = arrayMove(internalValue, oldIndex, newIndex);
            handleOnChange({ path: newValue }, newKeys);
          }
        },
        [handleOnChange, internalValue, keys],
      );

      const renderFileLink = useCallback(
        (link: string | undefined | null) => {
          if (!link) {
            return null;
          }

          const text =
            link.length <= MAX_DISPLAY_LENGTH
              ? link
              : `${link.slice(0, MAX_DISPLAY_LENGTH / 2)}\u2026${link.slice(
                  -(MAX_DISPLAY_LENGTH / 2) + 1,
                )}`;

          return (
            <Link href={link} collection={collection} field={field}>
              {text}
            </Link>
          );
        },
        [collection, field],
      );

      const renderedImagesLinks = useMemo(() => {
        if (forImage) {
          if (!internalValue) {
            return null;
          }

          if (isMultiple(internalValue)) {
            return (
              <DndContext
                key="multi-image-wrapper"
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onSortEnd}
              >
                <SortableContext items={keys} strategy={rectSortingStrategy}>
                  <div className={widgetFileImageClasses['image-grid']}>
                    {internalValue.map((itemValue, index) => {
                      const key = keys[index];
                      return (
                        <SortableImage
                          id={key}
                          key={`image-${key}`}
                          itemValue={itemValue}
                          collection={collection}
                          field={field}
                          onRemove={onRemoveOne(index)}
                          onReplace={onReplaceOne(index)}
                        />
                      );
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            );
          }

          return (
            <div key="single-image-wrapper">
              <Image key="single-image" src={internalValue} collection={collection} field={field} />
            </div>
          );
        }

        if (isMultiple(internalValue)) {
          return (
            <DndContext
              key="multi-image-wrapper"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onSortEnd}
            >
              <SortableContext items={keys} strategy={verticalListSortingStrategy}>
                <div key="mulitple-file-links">
                  {internalValue.map((itemValue, index) => {
                    const key = keys[index];
                    return (
                      <SortableLink
                        id={key}
                        key={`link-${key}`}
                        itemValue={itemValue}
                        onRemove={onRemoveOne(index)}
                        onReplace={onReplaceOne(index)}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          );
        }

        return <div key="single-file-links">{renderFileLink(internalValue)}</div>;
      }, [
        collection,
        field,
        internalValue,
        keys,
        onRemoveOne,
        onReplaceOne,
        onSortEnd,
        renderFileLink,
        sensors,
      ]);

      const content: JSX.Element = useMemo(() => {
        const subject = forImage ? 'image' : forFolder ? 'folder' : 'file';

        if (Array.isArray(internalValue) ? internalValue.length === 0 : isEmpty(internalValue)) {
          return (
            <div key="selection" className={widgetFileImageClasses['empty-content']}>
              <div key="controls" className={widgetFileImageClasses.actions}>
                <Button
                  buttonRef={uploadButtonRef}
                  color="secondary"
                  variant="outlined"
                  key="upload"
                  onClick={handleOpenMediaLibrary}
                  data-testid="choose-upload"
                  disabled={disabled}
                >
                  {t(`editor.editorWidgets.${subject}.choose${allowsMultiple ? 'Multiple' : ''}`)}
                </Button>
                {chooseUrl ? (
                  <Button
                    color="secondary"
                    variant="outlined"
                    key="choose-url"
                    onClick={handleUrl(subject)}
                    data-testid="choose-url"
                    disabled={disabled}
                  >
                    {t(`editor.editorWidgets.${subject}.chooseUrl`)}
                  </Button>
                ) : null}
              </div>
            </div>
          );
        }

        return (
          <div key="selection" className={widgetFileImageClasses.content}>
            {renderedImagesLinks}
            <div key="controls" className={widgetFileImageClasses.actions}>
              <Button
                buttonRef={uploadButtonRef}
                color="secondary"
                variant="outlined"
                key="add-replace"
                onClick={handleOpenMediaLibrary}
                data-testid="add-replace-upload"
                disabled={disabled}
              >
                {t(
                  `editor.editorWidgets.${subject}.${
                    allowsMultiple ? 'addMore' : 'chooseDifferent'
                  }`,
                )}
              </Button>
              {chooseUrl ? (
                allowsMultiple ? (
                  <Button
                    color="secondary"
                    variant="outlined"
                    key="choose-url"
                    onClick={handleUrl(subject)}
                    data-testid="choose-url"
                    disabled={disabled}
                  >
                    {t(`editor.editorWidgets.${subject}.chooseUrl`)}
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    variant="outlined"
                    key="replace-url"
                    onClick={handleUrl(subject)}
                    data-testid="replace-url"
                    disabled={disabled}
                  >
                    {t(`editor.editorWidgets.${subject}.replaceUrl`)}
                  </Button>
                )
              ) : null}
              <Button
                color="error"
                variant="outlined"
                key="remove"
                onClick={handleRemove}
                data-testid="remove-upload"
                disabled={disabled}
              >
                {t(`editor.editorWidgets.${subject}.remove${allowsMultiple ? 'All' : ''}`)}
              </Button>
            </div>
          </div>
        );
      }, [
        forFolder,
        internalValue,
        allowsMultiple,
        renderedImagesLinks,
        handleOpenMediaLibrary,
        disabled,
        t,
        chooseUrl,
        handleUrl,
        handleRemove,
      ]);

      return useMemo(
        () => (
          <div
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            className={classNames(
              widgetFileImageClasses.root,
              disabled && widgetFileImageClasses.disabled,
              field.required !== false && widgetFileImageClasses.required,
              hasErrors && widgetFileImageClasses.error,
              forSingleList && widgetFileImageClasses['for-single-list'],
              dragOverActive && widgetFileImageClasses['drag-over-active'],
              forImage && widgetFileImageClasses['for-image'],
              isMultiple(value) && widgetFileImageClasses.multiple,
            )}
          >
            <div className={widgetFileImageClasses.wrapper}>
              <Field
                inputRef={allowsMultiple ? undefined : uploadButtonRef}
                label={label}
                errors={errors}
                noPadding={!hasErrors}
                hint={field.hint}
                forSingleList={forSingleList}
                cursor={allowsMultiple ? 'default' : 'pointer'}
                disabled={disabled}
              >
                {content}
              </Field>
              <div className={widgetFileImageClasses['drop-area']}>
                {t(`mediaLibrary.mediaLibraryModal.${forImage ? 'dropImages' : 'dropFiles'}`)}
              </div>
            </div>
          </div>
        ),
        [
          handleDrop,
          handleDragEnter,
          handleDragLeave,
          handleDragOver,
          disabled,
          field.required,
          field.hint,
          hasErrors,
          forSingleList,
          dragOverActive,
          value,
          allowsMultiple,
          label,
          errors,
          content,
          t,
        ],
      );
    },
  );

  FileControl.displayName = 'FileControl';

  return FileControl;
};

export default withFileControl;
