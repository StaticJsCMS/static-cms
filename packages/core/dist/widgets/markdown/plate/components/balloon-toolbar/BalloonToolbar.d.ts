import type { Collection, MarkdownField } from '@staticcms/core/interface';
import type { FC } from 'react';
import './BalloonToolbar.css';
export interface BalloonToolbarProps {
    useMdx: boolean;
    containerRef: HTMLElement | null;
    collection: Collection<MarkdownField>;
    field: MarkdownField;
    disabled: boolean;
}
declare const BalloonToolbar: FC<BalloonToolbarProps>;
export default BalloonToolbar;
