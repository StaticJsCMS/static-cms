import isFunction from 'lodash/isFunction';

import { isEditorComponentWidgetOptions } from '../interface';

import type { EditorComponentOptions } from '../interface';

const catchesNothing = /.^/;

function bind(fn: unknown) {
  return isFunction(fn) && fn.bind(null);
}

export default function createEditorComponent(options: EditorComponentOptions): EditorComponentOptions {
  if (isEditorComponentWidgetOptions(options)) {
    const {
      id = null,
      label = 'unnamed component',
      type = 'shortcode',
      widget = 'object',
      ...remainingConfig
    } = options;

    return {
      id: id || label.replace(/[^A-Z0-9]+/gi, '_'),
      label,
      type,
      widget,
      ...remainingConfig,
    };
  }

  const {
    id = null,
    label = 'unnamed component',
    pattern = catchesNothing,
    fields = [],
    fromBlock,
    toBlock,
    toPreview,
    ...remainingConfig
  } = options;

  return {
    id: id || label.replace(/[^A-Z0-9]+/gi, '_'),
    label,
    pattern,
    fromBlock: bind(fromBlock) || (() => ({})),
    toBlock: bind(toBlock) || (() => 'Plugin'),
    toPreview: bind(toPreview) || bind(toBlock) || (() => 'Plugin'),
    fields,
    ...remainingConfig,
  };
}
