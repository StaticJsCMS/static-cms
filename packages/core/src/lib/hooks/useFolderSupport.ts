import { useMemo } from 'react';

import type {
  CollectionFileWithDefaults,
  CollectionWithDefaults,
  ConfigWithDefaults,
  MediaField,
} from '@staticcms/core';

interface UseFolderSupportProps {
  config?: ConfigWithDefaults;
  collection?: CollectionWithDefaults;
  collectionFile?: CollectionFileWithDefaults;
  field?: MediaField;
}

export function getFolderSupport({
  config,
  collection,
  collectionFile,
  field,
}: UseFolderSupportProps) {
  return (field ?? collectionFile ?? collection ?? config)?.media_library?.folder_support ?? false;
}

export default function useFolderSupport(props: UseFolderSupportProps) {
  return useMemo(() => getFolderSupport(props), [props]);
}
