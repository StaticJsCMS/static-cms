import type { FC, MouseEventHandler } from 'react';
import './SortableLink.css';
export interface SortableLinkProps {
    id: string;
    itemValue: string;
    onRemove?: MouseEventHandler;
    onReplace?: MouseEventHandler;
}
declare const SortableLink: FC<SortableLinkProps>;
export default SortableLink;
