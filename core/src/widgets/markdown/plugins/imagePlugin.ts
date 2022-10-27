import type { CustomHTMLRenderer } from '@toast-ui/editor';
import type { LinkMdNode, MdNode } from '@toast-ui/editor/types/toastmark';
import type { MarkdownPluginFactory, MarkdownPluginFactoryProps } from '../../../interface';

function isLinkNode(node: MdNode): node is LinkMdNode {
  return 'destination' in node;
}

const toHTMLRenderers: (props: MarkdownPluginFactoryProps) => CustomHTMLRenderer = ({
  getAsset,
  field,
}) => ({
  image: (node: MdNode, { entering, skipChildren }) => {
    if (entering && isLinkNode(node)) {
      skipChildren();

      return {
        type: 'openTag',
        tagName: 'img',
        outerNewLine: true,
        attributes: {
          src: node.destination,
          onerror: `this.onerror=null; this.src='${
            node.destination
              ? getAsset(node.destination, field)?.toString() ?? node.destination
              : ''
          }'`,
        },
        selfClose: true,
      };
    }

    return [];
  },
});

const imagePlugin: MarkdownPluginFactory = props => {
  return () => ({
    toHTMLRenderers: toHTMLRenderers(props),
  });
};

export default imagePlugin;
