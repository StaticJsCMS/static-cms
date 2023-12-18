import controlComponent from './DateTimeControl';
import previewComponent from './DateTimePreview';
import getDefaultValue from './getDefaultValue';
import schema from './schema';
import type { DateTimeField, WidgetParam } from '@staticcms/core/interface';
declare const DateTimeWidget: () => WidgetParam<string | Date, DateTimeField>;
export * from './utc.util';
export { controlComponent as DateTimeControl, previewComponent as DateTimePreview, schema as dateTimeSchema, getDefaultValue as dateTimeGetDefaultValue, };
export default DateTimeWidget;
