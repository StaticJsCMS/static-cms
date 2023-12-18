import './Confirm.css';
export declare const classes: Record<"title" | "content" | "root" | "actions" | "confirm-button" | "cancel-button", string>;
interface ConfirmProps {
    title: string | {
        key: string;
        options?: Record<string, unknown>;
    };
    body: string | {
        key: string;
        options?: Record<string, unknown>;
    };
    cancel?: string | {
        key: string;
        options?: Record<string, unknown>;
    };
    confirm?: string | {
        key: string;
        options?: Record<string, unknown>;
    };
    color?: 'success' | 'error' | 'warning' | 'primary';
}
export interface ConfirmDialogProps extends ConfirmProps {
    resolve: (value: boolean | PromiseLike<boolean>) => void;
}
export declare const Confirm: any;
declare const confirm: (props: ConfirmProps) => Promise<boolean>;
export default confirm;
