import { validateMinMax } from '@staticcms/core/lib/widgets/validations';

import type { FieldValidationMethod, RelationField } from '@staticcms/core/interface';

const validator: FieldValidationMethod<string | string[], RelationField> = ({
  field,
  value,
  t,
}) => {
  const min = field.min;
  const max = field.max;

  if (!field.multiple || typeof value === 'string') {
    return false;
  }

  const error = validateMinMax(t, field.label ?? field.name, value, min, max);

  return error ? error : false;
};

export default validator;
