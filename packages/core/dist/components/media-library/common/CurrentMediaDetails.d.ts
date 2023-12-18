import type { Collection, MediaField, MediaLibrarInsertOptions } from '@staticcms/core/interface';
import type { FC } from 'react';
interface CurrentMediaDetailsProps {
    collection?: Collection;
    field?: MediaField;
    canInsert: boolean;
    url?: string | string[];
    alt?: string;
    insertOptions?: MediaLibrarInsertOptions;
    forImage: boolean;
    replaceIndex?: number;
    onUrlChange: (url: string) => void;
    onAltChange: (alt: string) => void;
}
declare const CurrentMediaDetails: FC<CurrentMediaDetailsProps>;
export default CurrentMediaDetails;
