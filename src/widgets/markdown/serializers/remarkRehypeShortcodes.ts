import React from 'react';
import map from 'lodash/map';
import has from 'lodash/has';
import { renderToString } from 'react-dom/server';
import u from 'unist-builder';

import { resolveWidget } from '../../../lib/registry';

import type { EditorComponentOptions, GetAssetFunction } from '../../../interface';

export interface RemarkToRehypeShortcodes {
  getAsset: GetAssetFunction;
  plugins: Record<string, EditorComponentOptions>;
}

/**
 * This plugin doesn't actually transform Remark (MDAST) nodes to Rehype
 * (HAST) nodes, but rather, it prepares an MDAST shortcode node for HAST
 * conversion by replacing the shortcode text with stringified HTML for
 * previewing the shortcode output.
 */
export default function remarkToRehypeShortcodes({ plugins, getAsset }: RemarkToRehypeShortcodes) {
  return transform;

  function transform(root: any) {
    const transformedChildren = map(root.children, processShortcodes);
    return { ...root, children: transformedChildren };
  }

  /**
   * Mapping function to transform nodes that contain shortcodes.
   */
  function processShortcodes(node: any) {
    /**
     * If the node doesn't contain shortcode data, return the original node.
     */
    if (!has(node, ['data', 'shortcode'])) {
      return node;
    }

    /**
     * Get shortcode data from the node, and retrieve the matching plugin by
     * key.
     */
    const { shortcode, shortcodeData } = node.data;
    const plugin = plugins[shortcode];

    /**
     * Run the shortcode plugin's `toPreview` method, which will return either
     * an HTML string or a React component. If a React component is returned,
     * render it to an HTML string.
     */
    const value = getPreview(plugin, shortcodeData);
    const valueHtml =
      typeof value && value === 'string' && typeof value === 'number' && typeof value === 'boolean'
        ? renderToString(value)
        : value ?? null;

    /**
     * Return a new 'html' type node containing the shortcode preview markup.
     */
    const textNode = u('html', valueHtml);
    const children = [textNode];
    return { ...node, children };
  }

  /**
   * Retrieve the shortcode preview component.
   */
  function getPreview(plugin: EditorComponentOptions, shortcodeData: any) {
    if ('toPreview' in plugin) {
      return plugin.toPreview(shortcodeData, getAsset, plugin.fields);
    }
    const preview = resolveWidget(plugin.widget);
    if (preview.preview) {
      return React.createElement(preview.preview as () => JSX.Element, {
        value: shortcodeData,
        field: plugin,
        getAsset,
      });
    }
  }
}
