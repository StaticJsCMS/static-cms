import type { CustomHTMLRenderer } from '@toast-ui/editor';
import type { LinkMdNode, MdNode } from '@toast-ui/editor/types/toastmark';
import type { MarkdownPluginFactory, MarkdownPluginFactoryProps } from '../../../interface';

function isLinkNode(node: MdNode): node is LinkMdNode {
  return 'destination' in node;
}

const toHTMLRenderer: (props: MarkdownPluginFactoryProps) => CustomHTMLRenderer = ({ media }) => ({
  image: (node: MdNode, { entering, skipChildren }) => {
    if (entering && isLinkNode(node)) {
      skipChildren();

      let imageUrl = node.destination ?? '';
      if (node.destination) {
        imageUrl = media.getMedia(node.destination)?.toString() ?? node.destination;
      }

      return {
        type: 'openTag',
        tagName: 'img',
        outerNewLine: true,
        attributes: {
          src: node.destination,
          onerror: `this.onerror=null; this.src='${imageUrl}'`,
        },
        selfClose: true,
      };
    }

    return [];
  },
});

const imagePlugin: MarkdownPluginFactory = props => {
  return () => ({
    toHTMLRenderers: toHTMLRenderer(props),
  });
};

export default imagePlugin;
