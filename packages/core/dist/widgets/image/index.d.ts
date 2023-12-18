import previewComponent from './ImagePreview';
import schema from './schema';
import type { FileOrImageField, WidgetParam } from '@staticcms/core/interface';
declare function ImageWidget(): WidgetParam<string | string[], FileOrImageField>;
export { previewComponent as ImagePreview, schema as ImageSchema };
export default ImageWidget;
