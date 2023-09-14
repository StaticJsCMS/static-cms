export const GLOBAL_CLASS_NAME_PREFIX = 'CMS';

export function generateClassNames<T extends string>(
  base: string,
  classNames: T[],
): Record<T, string> {
  return classNames.reduce((acc, className) => {
    acc[className] = `${GLOBAL_CLASS_NAME_PREFIX}_${base}_${className}`;
    return acc;
  }, {} as Record<T, string>);
}
