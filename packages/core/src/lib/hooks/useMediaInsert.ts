import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { openMediaLibrary, removeInsertedMedia } from '@staticcms/core/actions/mediaLibrary';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectMediaPath } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppDispatch, useAppSelector } from '@staticcms/core/store/hooks';

import type {
  Collection,
  MediaField,
  MediaLibrarInsertOptions,
  MediaPath,
} from '@staticcms/core/interface';
import type { MouseEvent } from 'react';

export default function useMediaInsert<T extends string | string[], F extends MediaField>(
  value: MediaPath<T>,
  options: {
    collection: Collection<F>;
    field: F;
    controlID?: string;
    forImage?: boolean;
    insertOptions?: MediaLibrarInsertOptions;
  },
  callback: (newValue: MediaPath<T>) => void,
): (e?: MouseEvent) => void {
  const dispatch = useAppDispatch();

  const { controlID, collection, field, forImage = false, insertOptions } = options;

  const config = useAppSelector(selectConfig);

  const finalControlID = useMemo(() => controlID ?? uuid(), [controlID]);
  const mediaPathSelector = useMemo(() => selectMediaPath(finalControlID), [finalControlID]);
  const mediaPath = useAppSelector(mediaPathSelector);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!selected && mediaPath && (mediaPath.path !== value.path || mediaPath.alt !== value.alt)) {
      setSelected(true);
      setTimeout(() => {
        callback(mediaPath as MediaPath<T>);
        dispatch(removeInsertedMedia(finalControlID));
      });
    }
  }, [callback, finalControlID, dispatch, mediaPath, value, selected]);

  const handleOpenMediaLibrary = useCallback(
    (e?: MouseEvent, { replaceIndex }: { replaceIndex?: number } = {}) => {
      e?.preventDefault();
      dispatch(
        openMediaLibrary({
          controlID: finalControlID,
          forImage,
          value: value.path,
          alt: value.alt,
          replaceIndex,
          allowMultiple: false,
          config: config?.media_library,
          collection,
          field,
          insertOptions,
        }),
      );
      setSelected(false);
    },
    [
      dispatch,
      finalControlID,
      forImage,
      value.path,
      value.alt,
      config?.media_library,
      collection,
      field,
      insertOptions,
    ],
  );

  return handleOpenMediaLibrary;
}
