import type { FC, MouseEvent } from 'react';
import './SettingsButton.css';
export interface SettingsButtonProps {
    showClose?: boolean;
    disabled: boolean;
    onClick: (event: MouseEvent) => void;
}
declare const SettingsButton: FC<SettingsButtonProps>;
export default SettingsButton;
