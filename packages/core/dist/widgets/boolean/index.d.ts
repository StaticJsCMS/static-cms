import controlComponent from './BooleanControl';
import schema from './schema';
import type { BooleanField, WidgetParam } from '@staticcms/core/interface';
declare const BooleanWidget: () => WidgetParam<boolean, BooleanField>;
export { controlComponent as BooleanControl, schema as BooleanSchema };
export default BooleanWidget;
