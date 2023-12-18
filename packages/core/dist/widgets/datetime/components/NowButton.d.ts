import type { TranslatedProps } from '@staticcms/core/interface';
import type { FC } from 'react';
import './NowButton.css';
export interface NowButtonProps {
    handleChange: (value: Date) => void;
    disabled: boolean;
}
declare const NowButton: FC<TranslatedProps<NowButtonProps>>;
export default NowButton;
