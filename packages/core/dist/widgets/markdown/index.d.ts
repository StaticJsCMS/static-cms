/// <reference types="react" />
import previewComponent from './MarkdownPreview';
import schema from './schema';
import type { MarkdownField, WidgetParam } from '@staticcms/core/interface';
declare const controlComponent: import("react").FC<import("@staticcms/core/interface").WidgetControlProps<string, MarkdownField, import("@staticcms/core/interface").ObjectValue>>;
declare const MarkdownWidget: () => WidgetParam<string, MarkdownField>;
export * from './plate';
export { controlComponent as MarkdownControl, previewComponent as MarkdownPreview, schema as MarkdownSchema, };
export default MarkdownWidget;
