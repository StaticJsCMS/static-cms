import { findNodePath, setNodes } from '@udecode/plate';
import React, { useCallback } from 'react';

import { isNotNullish } from '@staticcms/core/lib/util/null.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import classNames from '@staticcms/core/lib/util/classNames.util';

import type { MdListItemElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { ChangeEvent, FC } from 'react';

import './ListItemElement.css';

const classes = generateClassNames('WidgetMarkdown_ListItem', ['root', 'checked', 'checkbox']);

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
    <li className={classNames(classes.root, checked && classes.checked)}>
      {isNotNullish(checked) ? (
        <input
          key={`checkbox-${checked}`}
          type="checkbox"
          checked={checked ?? false}
          onChange={handleChange}
          className={classes.checkbox}
        />
      ) : null}
      {children}
    </li>
  );
};

export default ListItemElement;
