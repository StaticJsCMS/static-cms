import type { ViewStyle } from '@staticcms/core/constants/views';
import './ViewStyleControl.css';
export declare const classes: Record<"button" | "root" | "icon" | "active", string>;
interface ViewStyleControlPros {
    viewStyle: ViewStyle;
    onChangeViewStyle: (viewStyle: ViewStyle) => void;
}
declare const ViewStyleControl: ({ viewStyle, onChangeViewStyle }: ViewStyleControlPros) => JSX.Element;
export default ViewStyleControl;
