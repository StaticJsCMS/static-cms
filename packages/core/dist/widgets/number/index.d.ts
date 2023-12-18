import controlComponent from './NumberControl';
import previewComponent from './NumberPreview';
import schema from './schema';
import validator from './validator';
import type { NumberField, WidgetParam } from '@staticcms/core/interface';
declare const NumberWidget: () => WidgetParam<string | number, NumberField>;
export { controlComponent as NumberControl, previewComponent as NumberPreview, schema as numberSchema, validator as numberValidator, };
export default NumberWidget;
