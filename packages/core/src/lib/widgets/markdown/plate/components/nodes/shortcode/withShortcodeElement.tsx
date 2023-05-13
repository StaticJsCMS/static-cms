import { findNodePath, setNodes } from '@udecode/plate';
import React, { useCallback, useMemo } from 'react';

import { getShortcode } from '@staticcms/core/lib/registry';
import { selectTheme } from '@staticcms/core/reducers/selectors/globalUI';
import { useAppSelector } from '@staticcms/core/store/hooks';

import type { MarkdownField, WidgetControlProps } from '@staticcms/core/interface';
import type { MdShortcodeElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps } from '@udecode/plate';
import type { FC } from 'react';

export interface WithShortcodeElementProps {
  controlProps: WidgetControlProps<string, MarkdownField>;
}

const withShortcodeElement = ({ controlProps }: WithShortcodeElementProps) => {
  const ShortcodeElement: FC<PlateRenderElementProps<MdValue, MdShortcodeElement>> = ({
    element,
    editor,
    children,
  }) => {
    const config = useMemo(() => getShortcode(element.shortcode), [element.shortcode]);

    const [ShortcodeControl, props] = useMemo(() => {
      if (!config) {
        return [null, {}];
      }

      const props = config.toProps ? config.toProps(element.args) : {};
      return [config.control, props];
    }, [config, element.args]);

    const handleOnChange = useCallback(
      (props: {}) => {
        if (!config || !config.toArgs) {
          return;
        }

        const path = findNodePath(editor, element);
        path && setNodes(editor, { args: config.toArgs(props) }, { at: path });
      },
      [config, editor, element],
    );

    const theme = useAppSelector(selectTheme);

    return (
      <span contentEditable={false}>
        {ShortcodeControl ? (
          <ShortcodeControl
            controlProps={controlProps}
            onChange={handleOnChange}
            theme={theme}
            {...props}
          />
        ) : null}
        {children}
      </span>
    );
  };

  return ShortcodeElement;
};

export default withShortcodeElement;
