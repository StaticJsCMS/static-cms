import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const widgetFileImageClasses = generateClassNames('WidgetFileImage', [
  'root',
  'error',
  'required',
  'disabled',
  'for-single-list',
  'drag-over-active',
  'for-image',
  'multiple',
  'wrapper',
  'drop-area',
  'for-image',
  'image-grid',
  'empty-content',
  'content',
  'actions',
]);

export default widgetFileImageClasses;
