import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL, getNode, setNodes } from '@udecode/plate';

import { formatList, preFormat } from './autoformatUtils';

import type { MdAutoformatRule } from '@staticcms/markdown';

const autoformatLists: MdAutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['* ', '- '],
    preFormat,
    format: editor => formatList(editor, ELEMENT_UL),
  },
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['1. ', '1) '],
    preFormat,
    format: editor => formatList(editor, ELEMENT_OL),
  },
  {
    mode: 'block',
    match: ['[ ] '],
    format: editor => {
      const at = [...(editor.selection?.anchor.path ?? [])].slice(0, -2);
      setNodes(
        editor,
        { type: ELEMENT_LI, checked: false },
        {
          at,
        },
      );
    },
    query: editor => {
      const node = getNode(editor, editor.selection?.anchor.path ?? []);
      if (!node || !('text' in node) || !(node.text as string).startsWith('[ ]')) {
        return false;
      }

      const at = [...(editor.selection?.anchor.path ?? [])].slice(0, -2);
      const parentNode = getNode(editor, at);
      return Boolean(parentNode && 'type' in parentNode && parentNode.type === ELEMENT_LI);
    },
  },
  {
    mode: 'block',
    match: ['[x] '],
    format: editor => {
      const at = [...(editor.selection?.anchor.path ?? [])].slice(0, -2);
      setNodes(
        editor,
        { type: ELEMENT_LI, checked: true },
        {
          at,
        },
      );
    },
    query: editor => {
      const node = getNode(editor, editor.selection?.anchor.path ?? []);
      if (!node || !('text' in node) || !(node.text as string).startsWith('[x]')) {
        return false;
      }

      const at = [...(editor.selection?.anchor.path ?? [])].slice(0, -2);
      const parentNode = getNode(editor, at);
      return Boolean(parentNode && 'type' in parentNode && parentNode.type === ELEMENT_LI);
    },
  },
];

export default autoformatLists;
