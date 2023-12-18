import React from 'react';
import type { SnackbarMessage } from '@staticcms/core/store/slices/snackbars';
import './SnackbarAlert.css';
export declare const classes: Record<"message" | "root" | "error" | "icon" | "warning" | "info" | "success" | "icon-wrapper" | "close-button" | "close-button-icon" | "close-button-sr-label", string>;
interface SnackbarAlertProps {
    data: SnackbarMessage;
    onClose: () => void;
}
declare const SnackbarAlert: React.ForwardRefExoticComponent<SnackbarAlertProps & import("react-polyglot").TranslateProps & React.RefAttributes<HTMLDivElement>>;
export default SnackbarAlert;
