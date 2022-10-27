import isNumber from 'lodash/isNumber';

export function validateMinMax(
  t: (key: string, options: unknown) => string,
  fieldLabel: string,
  value?: string | number | (string | number)[] | undefined | null,
  min?: number,
  max?: number,
) {
  function minMaxError(messageKey: string) {
    return {
      type: 'RANGE',
      message: t(`editor.editorControlPane.widget.${messageKey}`, {
        fieldLabel,
        minCount: min,
        maxCount: max,
        count: min,
      }),
    };
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return false;
  }

  const length = value?.length ?? 0;

  if ([min, max, length].every(isNumber) && (length < min! || length > max!)) {
    return minMaxError(min === max ? 'rangeCountExact' : 'rangeCount');
  } else if (isNumber(min) && min > 0 && length < min) {
    return minMaxError('rangeMin');
  } else if (isNumber(max) && length > max) {
    return minMaxError('rangeMax');
  }
}
