import schema from './schema';
import controlComponent from './UUIDControl';
import previewComponent from './UUIDPreview';
import type { UUIDField, WidgetParam } from '@staticcms/core/interface';
declare const UUIDWidget: () => WidgetParam<string, UUIDField>;
export { controlComponent as UUIDControl, previewComponent as UUIDPreview, schema as uuidSchema };
export default UUIDWidget;
