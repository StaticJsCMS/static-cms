/// <reference types="react" />
import type { WidgetPreviewComponent, WidgetPreviewProps } from '@staticcms/core/interface';
interface PreviewHOCProps extends Omit<WidgetPreviewProps, 'widgetFor'> {
    previewComponent: WidgetPreviewComponent;
}
declare const PreviewHOC: ({ previewComponent, ...props }: PreviewHOCProps) => import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | null;
export default PreviewHOC;
