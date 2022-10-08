import without from 'lodash/without';
import flatten from 'lodash/flatten';
import u from 'unist-builder';
import { definitions } from 'mdast-util-definitions';

import type { Transformer } from 'unified';
import type { Root, Content } from 'mdast';
import type { Definition } from 'mdast-util-definitions';

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
const remarkSquashReferences: () => Transformer<Root> = () => {
  function transform(getDefinition: (identifier: string) => Definition | null, node: Root): Root {
    /**
     * Bind the `getDefinition` function to `transform` and recursively map all
     * nodes.
     */
    const boundTransform = transform.bind(null, getDefinition);
    const children = node.children ? node.children.map(boundTransform) : node.children;

    /**
     * Combine reference and definition nodes into standard image and link
     * nodes.
     */
    if (['imageReference', 'linkReference'].includes(node.type)) {
      const type = node.type === 'imageReference' ? 'image' : 'link';
      const definition = getDefinition(node.identifier);

      if (definition) {
        const { title, url } = definition;
        return u(type, { title, url, alt: node.alt }, children);
      }

      const pre = u('text', node.type === 'imageReference' ? '![' : '[');
      const post = u('text', ']');
      const nodes = children || [u('text', node.alt)];
      return [pre, ...nodes, post];
    }

    /**
     * Remove definition nodes and filter the resulting null values from the
     * filtered children array.
     */
    if (node.type === 'definition') {
      return null;
    }

    const filteredChildren = without(children, null) as Content[];

    return { ...node, children: flatten(filteredChildren) };
  }

  function getTransform(node: Root) {
    const getDefinition = definitions(node);
    return transform.call(null, getDefinition, node);
  }

  return getTransform;
};

export default remarkSquashReferences;
