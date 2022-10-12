import flatten from 'lodash/flatten';
import without from 'lodash/without';
import { definitions } from 'mdast-util-definitions';
import { u } from 'unist-builder';

import type { Root } from 'mdast';

/**
 * Raw markdown may contain image references or link references. Because there
 * is no way to maintain these references within the Slate AST, we convert image
 * and link references to standard images and links by putting their url's
 * inline. The definitions are then removed from the document.
 *
 * For example, the following markdown:
 *
 * ```
 * ![alpha][bravo]
 *
 * [bravo]: http://example.com/example.jpg
 * ```
 *
 * Yields:
 *
 * ```
 * ![alpha](http://example.com/example.jpg)
 * ```
 *
 */
interface Node {
  type: string;
  identifier?: string;
  alt?: string;
  children?: Node[];
}

const remarkSquashReferences = () => {
  function transform(
    getDefinition: (identifier: string) => any | null,
    node: Node,
  ): Node | Node[] | null {
    /**
     * Bind the `getDefinition` function to `transform` and recursively map all
     * nodes.
     */
    const boundTransform = transform.bind(null, getDefinition);
    const children = node.children ? node.children.map(boundTransform) : node.children;
    const filteredChildren = children ? (without(children, null) as Node[]) : undefined;

    /**
     * Combine reference and definition nodes into standard image and link
     * nodes.
     */
    if (['imageReference', 'linkReference'].includes(node.type)) {
      const type = node.type === 'imageReference' ? 'image' : 'link';
      const definition = node.identifier ? getDefinition(node.identifier) : null;

      if (definition) {
        const { title, url } = definition;
        return u(
          type,
          { title, url, alt: node.alt, identifier: node.identifier },
          filteredChildren ?? [],
        );
      }

      const pre = u('text', node.type === 'imageReference' ? '![' : '[') as Node;
      const post = u('text', ']') as Node;
      const nodes = (filteredChildren ?? []) || [u('text', node.alt ?? '')];
      return [pre, ...nodes, post];
    }

    /**
     * Remove definition nodes and filter the resulting null values from the
     * filtered children array.
     */
    if (node.type === 'definition') {
      return null;
    }

    return { ...node, children: flatten(filteredChildren) };
  }

  function getTransform(node: Root) {
    const getDefinition = definitions(node as Root);
    return transform.call(null, getDefinition, node as Node) as Root;
  }

  return getTransform;
};

export default remarkSquashReferences;
