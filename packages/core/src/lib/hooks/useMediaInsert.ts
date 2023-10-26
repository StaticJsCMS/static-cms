import { useCallback, useEffect, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { openMediaLibrary, removeInsertedMedia } from '@staticcms/core/actions/mediaLibrary';
import { selectMediaPath } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';

import type {
  CollectionWithDefaults,
  MediaField,
  MediaLibrarInsertOptions,
  MediaPath,
} from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

export interface OpenMediaLibraryProps {
  forImage?: boolean;
  forFolder?: boolean;
  replaceIndex?: number;
}

export default function useMediaInsert<T extends string | string[], F extends MediaField>(
  value: MediaPath<T> | undefined,
  options: {
    collection: CollectionWithDefaults<F>;
    field: F;
    controlID?: string;
    forImage?: boolean;
    forFolder?: boolean;
    insertOptions?: MediaLibrarInsertOptions;
  },
  callback: (newValue: MediaPath<T>) => void | Promise<void>,
): (e?: MouseEvent, options?: OpenMediaLibraryProps) => void {
  const dispatch = useAppDispatch();

  const {
    controlID,
    collection,
    field,
    forImage = false,
    forFolder = false,
    insertOptions,
  } = options;

  const finalControlID = useMemo(() => controlID ?? uuid(), [controlID]);
  const mediaPathSelector = useMemo(() => selectMediaPath(finalControlID), [finalControlID]);
  const mediaPath = useAppSelector(mediaPathSelector);

  useEffect(() => {
    if (mediaPath && (!value || mediaPath.path !== value.path || mediaPath.alt !== value.alt)) {
      setTimeout(() => {
        callback(mediaPath as MediaPath<T>);
        dispatch(removeInsertedMedia(finalControlID));
      });
    }
  }, [callback, finalControlID, dispatch, mediaPath, value]);

  const handleOpenMediaLibrary = useCallback(
    (
      e?: MouseEvent,
      {
        replaceIndex,
        forImage: forImageOverride,
        forFolder: forFolderOverride,
      }: OpenMediaLibraryProps = {},
    ) => {
      e?.preventDefault();
      dispatch(
        openMediaLibrary({
          controlID: finalControlID,
          forImage: forImageOverride ?? forImage,
          forFolder: forFolderOverride ?? forFolder,
          value: field.multiple
            ? value
              ? [...(Array.isArray(value.path) ? value.path : [value.path])]
              : []
            : value?.path,
          alt: value?.alt,
          replaceIndex,
          config: field.media_library,
          collection,
          field,
          insertOptions,
        }),
      );
    },
    [dispatch, finalControlID, forImage, forFolder, value, collection, field, insertOptions],
  );

  return handleOpenMediaLibrary;
}
