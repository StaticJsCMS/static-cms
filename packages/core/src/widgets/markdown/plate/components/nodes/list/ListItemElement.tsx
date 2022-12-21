import { findNodePath, setNodes } from '@udecode/plate';
import React, { useCallback } from 'react';

import { isNotNullish } from '@staticcms/core/lib/util/null.util';

import type { MdListItemElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { ChangeEvent, FC } from 'react';

const ListItemElement: FC<PlateRenderElementProps<MdValue, MdListItemElement>> = ({
  children,
  editor,
  element,
}) => {
  const checked = element.checked;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      const path = findNodePath(editor, element);
      path && setNodes<MdListItemElement>(editor, { checked: value }, { at: path });
    },
    [editor, element],
  );

  return (
    <li>
      {isNotNullish(checked) ? (
        <input type="checkbox" checked={checked} onChange={handleChange} />
      ) : null}
      {children}
    </li>
  );
};

export default ListItemElement;
