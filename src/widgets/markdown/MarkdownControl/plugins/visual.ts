import isHotkey from 'is-hotkey';

import CommandsAndQueries from './CommandsAndQueries';
import ListPlugin from './List';
import LineBreak from './LineBreak';
import BreakToDefaultBlock from './BreakToDefaultBlock';
import CloseBlock from './CloseBlock';
import QuoteBlock from './QuoteBlock';
import SelectAll from './SelectAll';
import CopyPasteVisual from './CopyPasteVisual';
import Link from './Link';
import ForceInsert from './ForceInsert';
import Shortcode from './Shortcode';
import { SLATE_DEFAULT_BLOCK_TYPE as defaultType } from '../../types';
import Hotkey, { HOT_KEY_MAP } from './Hotkey';
import { resolveWidget } from '../../../../lib/registry';

import type { GetAssetFunction, TranslatedProps } from '../../../../interface';
import type { Pluggable } from 'unified';
import type { SlateEditor } from '../VisualEditor';
import type { KeyboardEvent } from 'react';

interface PluginsProps {
  getAsset: GetAssetFunction;
  remarkPlugins: Pluggable[];
}

function plugins({ getAsset, t, remarkPlugins }: TranslatedProps<PluginsProps>) {
  return [
    {
      onKeyDown(event: KeyboardEvent, editor: SlateEditor, next: () => void) {
        if (isHotkey('mod+j', event)) {
          console.info(JSON.stringify(editor.value.document.toJS(), null, 2));
        }
        next();
      },
    },
    Hotkey(HOT_KEY_MAP['bold'], (e: SlateEditor) => e.toggleMark('bold')),
    Hotkey(HOT_KEY_MAP['code'], (e: SlateEditor) => e.toggleMark('code')),
    Hotkey(HOT_KEY_MAP['italic'], (e: SlateEditor) => e.toggleMark('italic')),
    Hotkey(HOT_KEY_MAP['strikethrough'], (e: SlateEditor) => e.toggleMark('strikethrough')),
    Hotkey(HOT_KEY_MAP['heading-one'], (e: SlateEditor) => e.toggleBlock('heading-one')),
    Hotkey(HOT_KEY_MAP['heading-two'], (e: SlateEditor) => e.toggleBlock('heading-two')),
    Hotkey(HOT_KEY_MAP['heading-three'], (e: SlateEditor) => e.toggleBlock('heading-three')),
    Hotkey(HOT_KEY_MAP['heading-four'], (e: SlateEditor) => e.toggleBlock('heading-four')),
    Hotkey(HOT_KEY_MAP['heading-five'], (e: SlateEditor) => e.toggleBlock('heading-five')),
    Hotkey(HOT_KEY_MAP['heading-six'], (e: SlateEditor) => e.toggleBlock('heading-six')),
    Hotkey(HOT_KEY_MAP['link'], (e: SlateEditor) =>
      e.toggleLink(() => window.prompt(t('editor.editorWidgets.markdown.linkPrompt'))),
    ),
    CommandsAndQueries({ defaultType }),
    QuoteBlock({ type: 'quote' }),
    ListPlugin({
      defaultType,
      unorderedListType: 'bulleted-list',
      orderedListType: 'numbered-list',
    }),
    Link({ type: 'link' }),
    LineBreak(),
    BreakToDefaultBlock({ defaultType }),
    CloseBlock({ defaultType }),
    SelectAll(),
    ForceInsert({ defaultType }),
    CopyPasteVisual({ getAsset, resolveWidget, remarkPlugins }),
    Shortcode({ defaultType }),
  ];
}

export default plugins;
