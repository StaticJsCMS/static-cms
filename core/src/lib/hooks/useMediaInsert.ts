import { useCallback, useEffect, useMemo } from 'react';
import uuid from 'uuid';

import { selectMediaPath } from '@staticcms/core/reducers/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';
import { openMediaLibrary, removeInsertedMedia } from '@staticcms/core/actions/mediaLibrary';

import type { MouseEvent } from 'react';
import type { FileOrImageField, MarkdownField } from '@staticcms/core/interface';

export default function useMediaInsert<T extends string | string[]>(
  value: T,
  options: { field?: FileOrImageField | MarkdownField; controlID?: string; forImage?: boolean },
  callback: (newValue: T) => void,
): (e?: MouseEvent) => void {
  const dispatch = useAppDispatch();

  const { controlID, field, forImage = false } = options;

  const finalControlID = useMemo(() => controlID ?? uuid(), [controlID]);
  const mediaPathSelector = useMemo(() => selectMediaPath(finalControlID), [finalControlID]);
  const mediaPath = useAppSelector(mediaPathSelector);

  const mediaLibraryFieldOptions = useMemo(() => {
    return field?.media_library ?? {};
  }, [field?.media_library]);

  const config = useMemo(
    () => ('config' in mediaLibraryFieldOptions ? mediaLibraryFieldOptions.config : undefined),
    [mediaLibraryFieldOptions],
  );

  useEffect(() => {
    if (mediaPath && mediaPath !== value) {
      callback(mediaPath as T);
      setTimeout(() => {
        dispatch(removeInsertedMedia(finalControlID));
      });
    }
  }, [callback, finalControlID, dispatch, mediaPath, value]);

  const handleOpenMediaLibrary = useCallback(
    (e?: MouseEvent, { replaceIndex }: { replaceIndex?: number } = {}) => {
      e?.preventDefault();
      dispatch(
        openMediaLibrary({
          controlID: finalControlID,
          forImage,
          value,
          replaceIndex,
          allowMultiple: false,
          config,
          field,
        }),
      );
    },
    [dispatch, finalControlID, forImage, value, config, field],
  );

  return handleOpenMediaLibrary;
}
