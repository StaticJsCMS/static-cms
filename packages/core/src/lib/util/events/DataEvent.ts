import type { ValueOrNestedValue } from '@staticcms/core';

export interface DataUpdateEventProps {
  field: string;
  fieldPath: string;
  value: ValueOrNestedValue;
}

export default class DataUpdateEvent extends CustomEvent<DataUpdateEventProps> {
  constructor(detail: DataUpdateEventProps) {
    super('data:update', { detail });
  }
}
