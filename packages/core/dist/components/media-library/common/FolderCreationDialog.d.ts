import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './FolderCreationDialog.css';
export declare const classes: Record<"title" | "header" | "root" | "actions" | "cancel-button" | "close-button" | "close-button-icon" | "name-input-wrapper" | "name-input" | "create-button", string>;
interface FolderCreationDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (folderName: string) => void;
}
declare const FolderCreationDialog: FC<TranslatedProps<FolderCreationDialogProps>>;
export default FolderCreationDialog;
