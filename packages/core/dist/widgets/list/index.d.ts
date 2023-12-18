import controlComponent from './ListControl';
import previewComponent from './ListPreview';
import schema from './schema';
import type { ListField, ValueOrNestedValue, WidgetParam } from '@staticcms/core/interface';
declare const ListWidget: () => WidgetParam<ValueOrNestedValue[], ListField>;
export { default as ListItem } from './components/ListItem';
export * from './typedListHelpers';
export { controlComponent as ListControl, previewComponent as ListPreview, schema as ListSchema };
export default ListWidget;
