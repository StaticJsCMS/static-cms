import { ListValueType } from '../ListControl';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { ListField, ValueOrNestedValue, WidgetControlProps } from '@staticcms/core/interface';
import type { FC, MouseEvent } from 'react';
interface ListItemProps extends Pick<WidgetControlProps<ValueOrNestedValue, ListField>, 'entry' | 'field' | 'fieldsErrors' | 'submitted' | 'disabled' | 'duplicate' | 'locale' | 'path' | 'value' | 'i18n'> {
    valueType: ListValueType.MIXED | ListValueType.MULTIPLE;
    index: number;
    id: string;
    listeners: SyntheticListenerMap | undefined;
    handleRemove: (index: number, event: MouseEvent) => void;
}
declare const ListItem: FC<ListItemProps>;
export default ListItem;
