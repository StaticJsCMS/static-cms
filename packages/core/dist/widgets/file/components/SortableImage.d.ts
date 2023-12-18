import type { Collection, FileOrImageField } from '@staticcms/core/interface';
import type { FC, MouseEventHandler } from 'react';
import './SortableImage.css';
export interface SortableImageProps {
    id: string;
    itemValue: string;
    collection: Collection<FileOrImageField>;
    field: FileOrImageField;
    onRemove?: MouseEventHandler;
    onReplace?: MouseEventHandler;
}
declare const SortableImage: FC<SortableImageProps>;
export default SortableImage;
