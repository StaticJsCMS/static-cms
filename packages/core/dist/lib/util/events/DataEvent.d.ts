import type { ValueOrNestedValue } from '@staticcms/core/interface';
export interface DataUpdateEventProps {
    field: string;
    fieldPath: string;
    value: ValueOrNestedValue;
}
export default class DataUpdateEvent extends CustomEvent<DataUpdateEventProps> {
    constructor(detail: DataUpdateEventProps);
}
