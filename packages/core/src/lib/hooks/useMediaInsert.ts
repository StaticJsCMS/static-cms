import { useCallback, useEffect, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { openMediaLibrary, removeInsertedMedia } from '@staticcms/core/actions/mediaLibrary';
import { selectMediaPath } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';

import type { Collection, MediaField } from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

export default function useMediaInsert<T extends string | string[], F extends MediaField>(
  value: T,
  options: { collection: Collection<F>; field: F; controlID?: string; forImage?: boolean },
  callback: (newValue: T) => void,
): (e?: MouseEvent) => void {
  const dispatch = useAppDispatch();

  const { controlID, collection, field, forImage = false } = options;

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

  console.log('media library config', config);

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
          collection,
          field,
        }),
      );
    },
    [dispatch, finalControlID, forImage, value, config, collection, field],
  );

  return handleOpenMediaLibrary;
}
