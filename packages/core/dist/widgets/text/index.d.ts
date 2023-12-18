import schema from './schema';
import controlComponent from './TextControl';
import previewComponent from './TextPreview';
import type { StringOrTextField, WidgetParam } from '@staticcms/core/interface';
declare const TextWidget: () => WidgetParam<string, StringOrTextField>;
export { controlComponent as TextControl, previewComponent as TextPreview, schema as textSchema };
export default TextWidget;
