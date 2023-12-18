import type { FC } from 'react';
export interface CodeToolbarButtonProps {
    disabled: boolean;
    variant: 'button' | 'menu';
}
declare const CodeToolbarButton: FC<CodeToolbarButtonProps>;
export default CodeToolbarButton;
