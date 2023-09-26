import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useDefaultPath from '@staticcms/core/lib/hooks/useDefaultPath';
import Editor from './Editor';

import type { Collections } from '@staticcms/core/interface';
import type { FC } from 'react';

interface EditorRouteProps {
  newRecord?: boolean;
  collections: Collections;
}

const EditorRoute: FC<EditorRouteProps> = ({ newRecord = false, collections }) => {
  const { name, ...params } = useParams();
  const slug = params['*'];

  const shouldRedirect = useMemo(() => {
    if (!name) {
      return false;
    }
    return !collections[name];
  }, [collections, name]);

  const defaultPath = useDefaultPath(collections);

  if (shouldRedirect || !name || (!newRecord && !slug)) {
    return <Navigate to={defaultPath} />;
  }

  return <Editor name={name} slug={slug} newRecord={newRecord} />;
};

export default EditorRoute;
