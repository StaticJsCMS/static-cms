import withMarkdownControl from '../markdown/withMarkdownControl';
import previewComponent from '../markdown/MarkdownPreview';
import schema from '../markdown/schema';

import type { MarkdownField, WidgetParam } from '@staticcms/core/interface';

const controlComponent = withMarkdownControl({ useMdx: true });

const MdxWidget = (): WidgetParam<string, MarkdownField> => {
  return {
    name: 'mdx',
    controlComponent,
    previewComponent,
    options: {
      schema,
    },
  };
};

export {
  controlComponent as MdxControl,
  previewComponent as MdxPreview,
  schema as MdxSchema,
};

export default MdxWidget;
