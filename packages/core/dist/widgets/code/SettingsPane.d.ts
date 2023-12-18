import type { FC } from 'react';
import './SettingsPane.css';
export declare const classes: Record<"root", string>;
export interface SettingsPaneProps {
    hideSettings: () => void;
    uniqueId: string;
    languages: {
        value: string;
        label: string;
    }[];
    language: {
        value: string;
        label: string;
    };
    allowLanguageSelection: boolean;
    onChangeLanguage: (lang: string) => void;
}
declare const SettingsPane: FC<SettingsPaneProps>;
export default SettingsPane;
