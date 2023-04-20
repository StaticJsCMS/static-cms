/* eslint-disable import/prefer-default-export */
import ValidationErrorTypes from '@staticcms/core/constants/validationErrorTypes';

export function validateMinMax(
  t: (key: string, options: unknown) => string,
  fieldLabel: string,
  value?: string | number | (string | number)[] | undefined | null,
  min?: number,
  max?: number,
) {
  if (typeof value === 'string' || typeof value === 'number') {
    return false;
  }

  const length = value?.length ?? 0;

  function minMaxError(messageKey: string) {
    return {
      type: ValidationErrorTypes.RANGE,
      message: t(`editor.editorControlPane.widget.${messageKey}`, {
        fieldLabel,
        minCount: min,
        maxCount: max,
        count: length,
      }),
    };
  }

  if ([min, max].every(n => n && !isNaN(n)) && (length < min! || length > max!)) {
    return minMaxError(min === max ? 'rangeCountExact' : 'rangeCount');
  } else if (min && !isNaN(min) && min > 0 && length < min) {
    return minMaxError('rangeMin');
  } else if (max && !isNaN(max) && length > max) {
    return minMaxError('rangeMax');
  }

  return false;
}
