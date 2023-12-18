import previewComponent from './FilePreview';
import schema from './schema';
import withFileControl, { getValidFileValue } from './withFileControl';
import type { WithFileControlProps } from './withFileControl';
import type { FileOrImageField, WidgetParam } from '@staticcms/core/interface';
declare const FileWidget: () => WidgetParam<string | string[], FileOrImageField>;
export type { WithFileControlProps };
export { withFileControl as withFileControl, previewComponent as FilePreview, schema as FileSchema, getValidFileValue, };
export default FileWidget;
