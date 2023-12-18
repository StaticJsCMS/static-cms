import type { t } from 'react-polyglot';
import type { Field, FieldError, FieldValidationMethodProps, ValueOrNestedValue, Widget } from '@staticcms/core/interface';
export declare function isEmpty(value: ValueOrNestedValue): boolean;
export declare function validatePresence({ field, value, t, }: FieldValidationMethodProps<ValueOrNestedValue>): false | FieldError;
export declare function validatePattern({ field, value, t, }: FieldValidationMethodProps<ValueOrNestedValue>): false | FieldError;
export declare function validate(field: Field, value: ValueOrNestedValue, widget: Widget<any, any>, t: t): Promise<FieldError[]>;
